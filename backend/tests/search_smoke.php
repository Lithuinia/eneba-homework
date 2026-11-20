<?php

declare(strict_types=1);

require __DIR__ . '/../src/Bootstrap.php';

$pdo = Database::connection($config['db']);
$failures = [];

if (Search::normalize('Šašlykas') !== 'saslykas') {
    $failures[] = 'diacritic normalization';
}

$peak = Search::search($pdo, 'peak');
if ($peak === [] || $peak[0]['name'] !== 'PEAK Steam Key (PC) GLOBAL') {
    $failures[] = 'exact search for peak';
}

$peek = Search::search($pdo, 'peek');
if ($peek === [] || $peek[0]['name'] !== 'PEAK Steam Key (PC) GLOBAL') {
    $failures[] = 'typo search for peek';
}

$assetto = Search::search($pdo, 'asseto corsa');
if ($assetto === [] || !str_contains($assetto[0]['name'], 'Assetto Corsa')) {
    $failures[] = 'partial typo search for asseto corsa';
}

$gta = Search::search($pdo, 'gta 6');
if ($gta === [] || !str_contains($gta[0]['name'], 'Grand Theft Auto VI')) {
    $failures[] = 'alias search for gta 6';
}

if ($failures !== []) {
    fwrite(STDERR, 'FAIL: ' . implode(', ', $failures) . PHP_EOL);
    exit(1);
}

echo 'Search smoke tests passed.' . PHP_EOL;
