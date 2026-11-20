<?php

declare(strict_types=1);

final class Catalog
{
    private const BASE_SELECT = "SELECT p.id, p.slug, p.name, p.description, p.platform, p.region, p.category,
        p.image_url, p.rating, p.rating_count, p.popularity, p.release_date,
        COALESCE((SELECT MIN(o.price) FROM offers o WHERE o.product_id = p.id AND o.stock > 0), 0) AS price,
        COALESCE((SELECT MAX(o.price) FROM offers o WHERE o.product_id = p.id), 0) AS original_price,
        (SELECT o.id FROM offers o WHERE o.product_id = p.id AND o.stock > 0 ORDER BY o.price ASC LIMIT 1) AS best_offer_id,
        (SELECT o.stock FROM offers o WHERE o.product_id = p.id AND o.stock > 0 ORDER BY o.price ASC LIMIT 1) AS best_offer_stock,
        (SELECT s.name FROM offers o JOIN sellers s ON s.id = o.seller_id WHERE o.product_id = p.id AND o.stock > 0 ORDER BY o.price ASC LIMIT 1) AS best_offer_seller
        FROM products p";

    public static function mapProduct(array $row): array
    {
        $price = (float) $row['price'];
        $original = (float) $row['original_price'];
        $discount = 0;
        if ($original > $price && $original > 0) {
            $discount = (int) round((($original - $price) / $original) * 100);
        }

        return [
            'id' => (int) $row['id'],
            'slug' => $row['slug'],
            'name' => $row['name'],
            'description' => $row['description'] ?? '',
            'platform' => $row['platform'],
            'region' => $row['region'],
            'category' => $row['category'],
            'image_url' => $row['image_url'] ?: null,
            'price' => round($price, 2),
            'original_price' => $original > 0 ? round($original, 2) : null,
            'discount_percent' => $discount,
            'rating' => (float) $row['rating'],
            'rating_count' => (int) $row['rating_count'],
            'best_offer_id' => $row['best_offer_id'] !== null ? (int) $row['best_offer_id'] : null,
            'best_offer_stock' => (int) ($row['best_offer_stock'] ?? 0),
            'best_offer_seller' => $row['best_offer_seller'] ?: null,
            'popularity' => (int) $row['popularity'],
            'release_date' => $row['release_date'] ?: null,
        ];
    }

    public static function getProducts(PDO $pdo, array $filters): array
    {
        $where = ['p.is_active = 1'];
        $params = [];

        foreach (['platform' => 'p.platform', 'region' => 'p.region', 'category' => 'p.category'] as $key => $column) {
            $value = trim((string) ($filters[$key] ?? ''));
            if ($value !== '') {
                $where[] = $column . ' = :' . $key;
                $params[':' . $key] = $value;
            }
        }

        $query = substr(trim((string) ($filters['q'] ?? '')), 0, 100);
        if ($query !== '') {
            $where[] = 'p.name LIKE :q';
            $params[':q'] = '%' . $query . '%';
        }

        $having = [];
        $minPrice = trim((string) ($filters['min_price'] ?? ''));
        $maxPrice = trim((string) ($filters['max_price'] ?? ''));
        if ($minPrice !== '' && is_numeric($minPrice)) {
            $having[] = 'price >= :min_price';
            $params[':min_price'] = (float) $minPrice;
        }
        if ($maxPrice !== '' && is_numeric($maxPrice)) {
            $having[] = 'price <= :max_price';
            $params[':max_price'] = (float) $maxPrice;
        }

        $whereSql = implode(' AND ', $where);
        $havingSql = $having ? ' HAVING ' . implode(' AND ', $having) : '';
        $page = max(1, min(100000, (int) ($filters['page'] ?? 1)));
        $perPage = max(1, min(60, (int) ($filters['per_page'] ?? 20)));
        $offset = ($page - 1) * $perPage;

        $sort = (string) ($filters['sort'] ?? 'popular');
        $orderBy = match ($sort) {
            'price_asc' => 'price ASC, p.popularity DESC',
            'price_desc' => 'price DESC, p.popularity DESC',
            'name_asc' => 'p.name ASC',
            'name_desc' => 'p.name DESC',
            'newest' => 'p.release_date DESC, p.id DESC',
            default => 'p.popularity DESC, p.id DESC',
        };

        $sql = self::BASE_SELECT . ' WHERE ' . $whereSql . $havingSql . ' ORDER BY ' . $orderBy
            . ' LIMIT :limit OFFSET :offset';
        $statement = $pdo->prepare($sql);
        foreach ($params as $key => $value) {
            $statement->bindValue($key, $value);
        }
        $statement->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, PDO::PARAM_INT);
        $statement->execute();

        $products = array_map([self::class, 'mapProduct'], $statement->fetchAll());

        $countSql = 'SELECT COUNT(*) FROM (' . self::BASE_SELECT . ' WHERE ' . $whereSql . ') AS filtered';
        if ($having) {
            $countSql .= ' WHERE ' . implode(' AND ', $having);
        }
        $countStatement = $pdo->prepare($countSql);
        foreach ($params as $key => $value) {
            $countStatement->bindValue($key, $value);
        }
        $countStatement->execute();
        $total = (int) $countStatement->fetchColumn();

        return [
            'products' => $products,
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'pages' => max(1, (int) ceil($total / $perPage)),
        ];
    }

    public static function getAllForSearch(PDO $pdo): array
    {
        $statement = $pdo->query(self::BASE_SELECT . ' WHERE p.is_active = 1');
        return array_map([self::class, 'mapProduct'], $statement->fetchAll());
    }

    public static function getProduct(PDO $pdo, string $slug, ?int $userId): ?array
    {
        $statement = $pdo->prepare(self::BASE_SELECT . ' WHERE p.slug = ? AND p.is_active = 1 LIMIT 1');
        $statement->execute([$slug]);
        $row = $statement->fetch();

        if (!$row) {
            return null;
        }

        $product = self::mapProduct($row);
        $productId = (int) $row['id'];

        $offers = $pdo->prepare(
            'SELECT o.id, o.seller_id, s.name AS seller_name, s.rating AS seller_rating, o.price,
                o.currency, o.stock, o.delivery
             FROM offers o
             JOIN sellers s ON s.id = o.seller_id
             WHERE o.product_id = ? AND o.stock > 0
             ORDER BY o.price ASC'
        );
        $offers->execute([$productId]);
        $product['offers'] = array_map(static function (array $offer): array {
            return [
                'id' => (int) $offer['id'],
                'seller_id' => (int) $offer['seller_id'],
                'seller_name' => $offer['seller_name'],
                'seller_rating' => (float) $offer['seller_rating'],
                'price' => (float) $offer['price'],
                'currency' => $offer['currency'],
                'stock' => (int) $offer['stock'],
                'delivery' => $offer['delivery'],
            ];
        }, $offers->fetchAll());

        $reviews = $pdo->prepare(
            'SELECT id, author_name, rating, comment, created_at
             FROM reviews WHERE product_id = ? ORDER BY created_at DESC LIMIT 12'
        );
        $reviews->execute([$productId]);
        $product['reviews'] = array_map(static function (array $review): array {
            return [
                'id' => (int) $review['id'],
                'author_name' => $review['author_name'],
                'rating' => (int) $review['rating'],
                'comment' => $review['comment'],
                'created_at' => $review['created_at'],
            ];
        }, $reviews->fetchAll());

        $related = $pdo->prepare(
            self::BASE_SELECT . ' WHERE p.is_active = 1 AND p.id <> ? AND (p.category = ? OR p.platform = ?)
             ORDER BY p.popularity DESC LIMIT 5'
        );
        $related->execute([$productId, $row['category'], $row['platform']]);
        $product['related'] = array_map([self::class, 'mapProduct'], $related->fetchAll());

        $product['is_wishlisted'] = false;
        if ($userId !== null) {
            $wishlist = $pdo->prepare('SELECT 1 FROM wishlist WHERE user_id = ? AND product_id = ? LIMIT 1');
            $wishlist->execute([$userId, $productId]);
            $product['is_wishlisted'] = (bool) $wishlist->fetchColumn();
        }

        return $product;
    }

    public static function getFilters(PDO $pdo): array
    {
        $platforms = $pdo->query('SELECT DISTINCT platform FROM products WHERE is_active = 1 ORDER BY platform')
            ->fetchAll(PDO::FETCH_COLUMN);
        $regions = $pdo->query('SELECT DISTINCT region FROM products WHERE is_active = 1 ORDER BY region')
            ->fetchAll(PDO::FETCH_COLUMN);
        $categories = $pdo->query('SELECT DISTINCT category FROM products WHERE is_active = 1 ORDER BY category')
            ->fetchAll(PDO::FETCH_COLUMN);
        $range = $pdo->query('SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM offers')
            ->fetch();

        return [
            'platforms' => $platforms,
            'regions' => $regions,
            'categories' => $categories,
            'price_min' => (float) ($range['min_price'] ?? 0),
            'price_max' => (float) ($range['max_price'] ?? 0),
        ];
    }

    public static function getHome(PDO $pdo, string $lang): array
    {
        $heroStatement = $pdo->query(
            "SELECT * FROM home_sections WHERE type = 'hero' AND is_active = 1 ORDER BY position ASC LIMIT 1"
        );
        $heroRow = $heroStatement->fetch();
        $hero = $heroRow ? self::localizedSection($heroRow, $lang) : null;

        $sectionStatement = $pdo->query(
            "SELECT * FROM home_sections WHERE type <> 'hero' AND is_active = 1 ORDER BY position ASC"
        );
        $sections = [];

        foreach ($sectionStatement->fetchAll() as $row) {
            $section = self::localizedSection($row, $lang);
            $idStatement = $pdo->prepare(
                'SELECT product_id FROM home_section_products WHERE section_id = ? ORDER BY position ASC'
            );
            $idStatement->execute([(int) $row['id']]);
            $ids = array_map('intval', $idStatement->fetchAll(PDO::FETCH_COLUMN));
            $section['products'] = self::getProductsByIds($pdo, $ids);
            $sections[] = $section;
        }

        return ['hero' => $hero, 'sections' => $sections];
    }

    private static function localizedSection(array $row, string $lang): array
    {
        $suffix = $lang === 'lt' ? '_lt' : '';
        $titleKey = 'title' . $suffix;
        $subtitleKey = 'subtitle' . $suffix;
        $ctaKey = 'cta_label' . $suffix;

        return [
            'id' => (int) $row['id'],
            'type' => $row['type'],
            'title' => $row[$titleKey] ?: $row['title'],
            'subtitle' => $row[$subtitleKey] ?: $row['subtitle'],
            'cta_label' => $row[$ctaKey] ?: $row['cta_label'],
            'cta_url' => $row['cta_url'],
            'image_url' => $row['image_url'] ?: null,
            'products' => [],
        ];
    }

    public static function getProductsByIds(PDO $pdo, array $ids): array
    {
        if ($ids === []) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $statement = $pdo->prepare(
            self::BASE_SELECT . ' WHERE p.is_active = 1 AND p.id IN (' . $placeholders . ')'
        );
        $statement->execute($ids);
        $mapped = [];
        foreach ($statement->fetchAll() as $row) {
            $product = self::mapProduct($row);
            $mapped[$product['id']] = $product;
        }

        $ordered = [];
        foreach ($ids as $id) {
            if (isset($mapped[$id])) {
                $ordered[] = $mapped[$id];
            }
        }
        return $ordered;
    }

    public static function getWishlist(PDO $pdo, int $userId): array
    {
        $statement = $pdo->prepare(
            'SELECT product_id FROM wishlist WHERE user_id = ? ORDER BY created_at DESC'
        );
        $statement->execute([$userId]);
        $ids = array_map('intval', $statement->fetchAll(PDO::FETCH_COLUMN));
        $products = self::getProductsByIds($pdo, $ids);
        foreach ($products as &$product) {
            $product['is_wishlisted'] = true;
        }
        unset($product);
        return $products;
    }

    public static function getOrders(PDO $pdo, int $userId): array
    {
        $statement = $pdo->prepare(
            'SELECT id, total, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC'
        );
        $statement->execute([$userId]);
        $orders = [];
        foreach ($statement->fetchAll() as $row) {
            $orders[] = self::orderFromRow($pdo, $row);
        }
        return $orders;
    }

    public static function getOrder(PDO $pdo, int $userId, int $orderId): ?array
    {
        $statement = $pdo->prepare(
            'SELECT id, total, status, created_at FROM orders WHERE id = ? AND user_id = ? LIMIT 1'
        );
        $statement->execute([$orderId, $userId]);
        $row = $statement->fetch();
        return $row ? self::orderFromRow($pdo, $row) : null;
    }

    private static function orderFromRow(PDO $pdo, array $row): array
    {
        $items = $pdo->prepare(
            'SELECT id, product_id, product_name, seller_name, unit_price, quantity, key_code
             FROM order_items WHERE order_id = ? ORDER BY id ASC'
        );
        $items->execute([(int) $row['id']]);

        return [
            'id' => (int) $row['id'],
            'total' => (float) $row['total'],
            'status' => $row['status'],
            'created_at' => $row['created_at'],
            'items' => array_map(static function (array $item): array {
                return [
                    'id' => (int) $item['id'],
                    'product_id' => (int) $item['product_id'],
                    'product_name' => $item['product_name'],
                    'seller_name' => $item['seller_name'],
                    'unit_price' => (float) $item['unit_price'],
                    'quantity' => (int) $item['quantity'],
                    'key_code' => $item['key_code'],
                ];
            }, $items->fetchAll()),
        ];
    }
}
