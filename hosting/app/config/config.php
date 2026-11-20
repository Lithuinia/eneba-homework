<?php

declare(strict_types=1);

$envFile = __DIR__ . '/../.env';
if (is_file($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (getenv($key) === false) {
            putenv($key . '=' . $value);
        }
    }
}

return [
    'db' => [
        'host' => getenv('DB_HOST') ?: '127.0.0.1',
        'port' => getenv('DB_PORT') ?: '3306',
        'name' => getenv('DB_NAME') ?: 'homework-task_intus_marketplace',
        'user' => getenv('DB_USER') ?: 'root',
        'pass' => getenv('DB_PASS') ?: '',
    ],
    'app' => [
        'env' => getenv('APP_ENV') ?: 'development',
        'session_name' => getenv('SESSION_NAME') ?: 'intus_session',
        'frontend_origin' => getenv('FRONTEND_ORIGIN') ?: 'http://localhost:5173',
        'session_secure' => getenv('SESSION_SECURE') === 'true',
        'session_samesite' => getenv('SESSION_SAMESITE') ?: 'Lax',
    ],
];
