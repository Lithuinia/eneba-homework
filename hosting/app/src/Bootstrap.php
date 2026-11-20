<?php

declare(strict_types=1);

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/RateLimiter.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/Catalog.php';
require_once __DIR__ . '/Search.php';
require_once __DIR__ . '/Checkout.php';

$config = require __DIR__ . '/../config/config.php';

date_default_timezone_set('UTC');

if ($config['app']['env'] !== 'development') {
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
}

ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
ini_set('session.use_trans_sid', '0');
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', $config['app']['session_samesite']);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name($config['app']['session_name']);
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => (bool) $config['app']['session_secure'],
        'httponly' => true,
        'samesite' => $config['app']['session_samesite'],
    ]);
    session_start();
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function verify_csrf(): void
{
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    if (!in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
        return;
    }

    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['csrf_token'] ?? '';
    if ($expected === '' || !is_string($token) || !hash_equals($expected, $token)) {
        Response::error('Invalid CSRF token', 403);
    }
}

function request_body(): array
{
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > 1048576) {
        Response::error('Request body too large', 413);
    }

    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }
    if (strlen($raw) > 1048576) {
        Response::error('Request body too large', 413);
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        Response::error('Invalid JSON body', 400);
    }

    return $decoded;
}

function query_value(string $key, string $default = ''): string
{
    return isset($_GET[$key]) && is_string($_GET[$key]) ? trim($_GET[$key]) : $default;
}
