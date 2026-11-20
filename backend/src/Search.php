<?php

declare(strict_types=1);

final class Search
{
    private const DIACRITICS = [
        'ą' => 'a', 'č' => 'c', 'ę' => 'e', 'ė' => 'e', 'į' => 'i', 'š' => 's',
        'ų' => 'u', 'ū' => 'u', 'ž' => 'z',
        'á' => 'a', 'à' => 'a', 'â' => 'a', 'ä' => 'a', 'ã' => 'a', 'å' => 'a',
        'ç' => 'c', 'ć' => 'c', 'č' => 'c',
        'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e', 'ę' => 'e', 'ě' => 'e',
        'í' => 'i', 'ì' => 'i', 'î' => 'i', 'ï' => 'i', 'į' => 'i',
        'ł' => 'l', 'ń' => 'n', 'ñ' => 'n',
        'ó' => 'o', 'ò' => 'o', 'ô' => 'o', 'ö' => 'o', 'õ' => 'o', 'ø' => 'o',
        'ř' => 'r', 'ś' => 's', 'š' => 's', 'ť' => 't',
        'ú' => 'u', 'ù' => 'u', 'û' => 'u', 'ü' => 'u', 'ů' => 'u', 'ų' => 'u', 'ū' => 'u',
        'ý' => 'y', 'ÿ' => 'y', 'ź' => 'z', 'ż' => 'z', 'ž' => 'z',
        'ß' => 'ss', 'æ' => 'ae', 'œ' => 'oe',
    ];

    public static function normalize(string $value): string
    {
        $value = function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
        $value = strtr($value, self::DIACRITICS);
        $value = preg_replace('/[^\p{L}\p{N}]+/u', ' ', $value) ?? '';
        $value = preg_replace('/\s+/u', ' ', $value) ?? '';
        return trim($value);
    }

    public static function search(PDO $pdo, string $query, int $limit = 24): array
    {
        $query = self::applyAliases($query);
        $normalized = self::normalize($query);
        if (strlen($normalized) < 2) {
            return [];
        }

        $queryTokens = array_values(array_filter(explode(' ', $normalized)));
        $results = [];

        foreach (Catalog::getAllForSearch($pdo) as $product) {
            $score = self::scoreProduct($normalized, $queryTokens, $product);
            if ($score !== null) {
                $results[] = ['score' => $score, 'product' => $product];
            }
        }

        usort($results, static function (array $left, array $right): int {
            if ($left['score'] === $right['score']) {
                return $right['product']['popularity'] <=> $left['product']['popularity'];
            }
            return $right['score'] <=> $left['score'];
        });

        $products = array_map(static fn (array $entry): array => $entry['product'], $results);
        return array_slice($products, 0, max(1, min(60, $limit)));
    }

    private static function applyAliases(string $query): string
    {
        $lower = function_exists('mb_strtolower') ? mb_strtolower(trim($query), 'UTF-8') : strtolower(trim($query));
        $aliases = [
            '/\bgta\s*6\b/u' => 'Grand Theft Auto VI',
            '/\bgta\b/u' => 'Grand Theft Auto',
            '/\brdr\s*2\b/u' => 'Red Dead Redemption 2',
            '/\bcod\b/u' => 'Call of Duty',
            '/\bmc\b/u' => 'Minecraft',
        ];
        foreach ($aliases as $pattern => $replacement) {
            $lower = preg_replace($pattern, $replacement, $lower) ?? $lower;
        }
        return $lower;
    }

    private static function scoreProduct(string $query, array $queryTokens, array $product): ?int
    {
        $name = self::normalize((string) $product['name']);
        if ($name === '') {
            return null;
        }

        $nameTokens = array_values(array_filter(explode(' ', $name)));
        $score = null;

        if ($name === $query) {
            $score = 1200;
        } elseif (strpos($name, $query) === 0) {
            $score = 1050;
        } elseif (strpos($name, $query) !== false) {
            $score = 950;
        }

        $allTokens = true;
        $totalDistance = 0;

        foreach ($queryTokens as $queryToken) {
            $best = PHP_INT_MAX;
            foreach ($nameTokens as $nameToken) {
                if (
                    $nameToken === $queryToken
                    || strpos($nameToken, $queryToken) === 0
                    || strpos($queryToken, $nameToken) === 0
                ) {
                    $best = 0;
                    break;
                }
                $distance = levenshtein($queryToken, $nameToken);
                if ($distance < $best) {
                    $best = $distance;
                }
            }

            $threshold = strlen($queryToken) >= 5 ? 2 : 1;
            if ($best > $threshold) {
                $allTokens = false;
                break;
            }
            $totalDistance += $best;
        }

        if ($allTokens) {
            $tokenScore = 700 - ($totalDistance * 40);
            $score = max($score ?? 0, $tokenScore);
        }

        if ($score === null) {
            $distance = levenshtein($query, $name);
            $threshold = strlen($query) >= 5 ? 2 : 1;
            if ($distance <= $threshold) {
                $score = 600 - ($distance * 40);
            }
        }

        if ($score === null) {
            return null;
        }

        $popularityBoost = min(50, intdiv((int) ($product['popularity'] ?? 0), 100));
        return $score + $popularityBoost;
    }
}
