<?php

declare(strict_types=1);

require_once __DIR__ . '/../app/src/Bootstrap.php';

header_remove('X-Powered-By');
header_remove('Server');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = array_filter([
    $config['app']['frontend_origin'],
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]);

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");

if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

RateLimiter::check('api:' . client_ip(), 600, 60);
verify_csrf();

$pdo = Database::connection($config['db']);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

$scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
$basePath = rtrim(str_replace('\\', '/', dirname(dirname($scriptName))), '/');
if ($basePath !== '' && $basePath !== '.' && strpos($path, $basePath) === 0) {
    $path = substr($path, strlen($basePath));
}
if ($path === '') {
    $path = '/';
}
$path = rtrim($path, '/');
if ($path === '') {
    $path = '/';
}
$route = strpos($path, '/api') === 0 ? substr($path, 4) : $path;
if ($route === '') {
    $route = '/';
}

try {
    if ($route === '/health' && $method === 'GET') {
        Response::json(['ok' => true]);
    }

    if ($route === '/auth/csrf' && $method === 'GET') {
        Response::json(['csrf_token' => $_SESSION['csrf_token'] ?? '']);
    }

    if ($route === '/auth/me' && $method === 'GET') {
        Response::json([
            'user' => Auth::user($pdo),
            'csrf_token' => $_SESSION['csrf_token'] ?? '',
        ]);
    }

    if ($route === '/auth/register' && $method === 'POST') {
        RateLimiter::check('auth:' . client_ip(), 10, 300);
        Response::json(['user' => Auth::register($pdo, request_body())], 201);
    }

    if ($route === '/auth/login' && $method === 'POST') {
        RateLimiter::check('auth:' . client_ip(), 10, 300);
        Response::json(['user' => Auth::login($pdo, request_body())]);
    }

    if ($route === '/auth/logout' && $method === 'POST') {
        Auth::logout();
        Response::json(['ok' => true]);
    }

    if ($route === '/home' && $method === 'GET') {
        Response::json(Catalog::getHome($pdo, query_value('lang', 'en')));
    }

    if ($route === '/filters' && $method === 'GET') {
        Response::json(Catalog::getFilters($pdo));
    }

    if ($route === '/products' && $method === 'GET') {
        Response::json(Catalog::getProducts($pdo, [
            'platform' => query_value('platform'),
            'region' => query_value('region'),
            'category' => query_value('category'),
            'q' => query_value('q'),
            'min_price' => query_value('min_price'),
            'max_price' => query_value('max_price'),
            'sort' => query_value('sort', 'popular'),
            'page' => query_value('page', '1'),
            'per_page' => query_value('per_page', '20'),
        ]));
    }

    if (preg_match('#^/products/([^/]+)$#', $route, $matches) && $method === 'GET') {
        $user = Auth::user($pdo);
        $product = Catalog::getProduct($pdo, rawurldecode($matches[1]), $user['id'] ?? null);
        if ($product === null) {
            Response::error('Product not found', 404);
        }
        Response::json($product);
    }

    if ($route === '/search' && $method === 'GET') {
        RateLimiter::check('search:' . client_ip(), 60, 60);
        $query = query_value('q');
        if (strlen($query) > 100) {
            Response::error('Search query is too long', 422);
        }
        $limit = max(1, min(60, (int) query_value('limit', '24')));
        $products = Search::search($pdo, $query, $limit);
        Response::json([
            'products' => $products,
            'total' => count($products),
            'query' => $query,
        ]);
    }

    if ($route === '/wishlist' && $method === 'GET') {
        $user = Auth::requireUser($pdo);
        Response::json(['products' => Catalog::getWishlist($pdo, $user['id'])]);
    }

    if ($route === '/wishlist' && $method === 'POST') {
        $user = Auth::requireUser($pdo);
        $body = request_body();
        $rawProductId = $body['product_id'] ?? 0;
        if (!is_int($rawProductId) && !(is_string($rawProductId) && ctype_digit($rawProductId))) {
            Response::error('Invalid product id', 422);
        }
        $productId = (int) $rawProductId;
        $check = $pdo->prepare('SELECT id FROM products WHERE id = ? AND is_active = 1 LIMIT 1');
        $check->execute([$productId]);
        if (!$check->fetch()) {
            Response::error('Product not found', 404);
        }
        $statement = $pdo->prepare(
            'INSERT IGNORE INTO wishlist (user_id, product_id, created_at) VALUES (?, ?, NOW())'
        );
        $statement->execute([$user['id'], $productId]);
        Response::json(['added' => true]);
    }

    if (preg_match('#^/wishlist/(\d+)$#', $route, $matches) && $method === 'DELETE') {
        $user = Auth::requireUser($pdo);
        $statement = $pdo->prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?');
        $statement->execute([$user['id'], (int) $matches[1]]);
        Response::json(['removed' => true]);
    }

    if ($route === '/checkout' && $method === 'POST') {
        $user = Auth::requireUser($pdo);
        RateLimiter::check('checkout:' . client_ip() . ':' . $user['id'], 10, 600);
        $body = request_body();
        $items = $body['items'] ?? [];
        if (!is_array($items)) {
            Response::error('Invalid cart items', 422);
        }
        $order = Checkout::placeOrder($pdo, $user['id'], $items);
        Response::json(['order' => $order], 201);
    }

    if ($route === '/orders' && $method === 'GET') {
        $user = Auth::requireUser($pdo);
        Response::json(['orders' => Catalog::getOrders($pdo, $user['id'])]);
    }

    if (preg_match('#^/orders/(\d+)$#', $route, $matches) && $method === 'GET') {
        $user = Auth::requireUser($pdo);
        $order = Catalog::getOrder($pdo, $user['id'], (int) $matches[1]);
        if ($order === null) {
            Response::error('Order not found', 404);
        }
        Response::json(['order' => $order]);
    }

    Response::error('Endpoint not found', 404);
} catch (PDOException $exception) {
    Response::error($config['app']['env'] === 'development' ? $exception->getMessage() : 'Database error', 500);
} catch (Throwable $exception) {
    Response::error($config['app']['env'] === 'development' ? $exception->getMessage() : 'Server error', 500);
}
