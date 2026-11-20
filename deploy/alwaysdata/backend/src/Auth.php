<?php

declare(strict_types=1);

final class Auth
{
    private const IDLE_TIMEOUT = 7200;
    private const ROTATE_INTERVAL = 1800;
    private const DUMMY_HASH = '$2y$10$lpRj2gH0s6gttWLhot93UuhTbiFACzPu5YMV85W6zQIb9v0oesG76';

    public static function user(PDO $pdo): ?array
    {
        if (empty($_SESSION['user_id'])) {
            return null;
        }

        $now = time();
        if (isset($_SESSION['last_activity']) && $now - (int) $_SESSION['last_activity'] > self::IDLE_TIMEOUT) {
            self::logout();
            return null;
        }

        $_SESSION['last_activity'] = $now;
        if (empty($_SESSION['session_started'])) {
            $_SESSION['session_started'] = $now;
        } elseif ($now - (int) $_SESSION['session_started'] > self::ROTATE_INTERVAL) {
            session_regenerate_id(true);
            $_SESSION['session_started'] = $now;
        }

        $statement = $pdo->prepare('SELECT id, email, name FROM users WHERE id = ? LIMIT 1');
        $statement->execute([(int) $_SESSION['user_id']]);
        $user = $statement->fetch();

        if (!$user) {
            unset($_SESSION['user_id']);
            return null;
        }

        return [
            'id' => (int) $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
        ];
    }

    public static function requireUser(PDO $pdo): array
    {
        $user = self::user($pdo);
        if ($user === null) {
            Response::error('Authentication required', 401);
        }
        return $user;
    }

    public static function register(PDO $pdo, array $input): array
    {
        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        if (!is_string($name) || !is_string($email) || !is_string($password)) {
            Response::error('Invalid registration data', 422);
        }

        $name = trim($name);
        $email = strtolower(trim($email));

        if ($name === '' || strlen($name) > 80) {
            Response::error('Please enter a valid display name', 422);
        }
        if (strlen($email) > 190 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::error('Please enter a valid email address', 422);
        }
        if (strlen($password) < 6 || strlen($password) > 200) {
            Response::error('Password must be between 6 and 200 characters', 422);
        }

        $statement = $pdo->prepare(
            'INSERT INTO users (email, password_hash, name, created_at) VALUES (?, ?, ?, NOW())'
        );
        try {
            $statement->execute([$email, password_hash($password, PASSWORD_DEFAULT), $name]);
        } catch (PDOException $exception) {
            if ((string) $exception->getCode() === '23000') {
                Response::error('An account with this email already exists', 409);
            }
            throw $exception;
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $pdo->lastInsertId();
        $_SESSION['last_activity'] = time();
        $_SESSION['session_started'] = time();

        return [
            'id' => (int) $_SESSION['user_id'],
            'email' => $email,
            'name' => $name,
        ];
    }

    public static function login(PDO $pdo, array $input): array
    {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        if (!is_string($email) || !is_string($password)) {
            Response::error('Invalid email or password', 401);
        }

        $email = strtolower(trim($email));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '' || strlen($password) > 200) {
            Response::error('Invalid email or password', 401);
        }

        $statement = $pdo->prepare(
            'SELECT id, email, name, password_hash FROM users WHERE email = ? LIMIT 1'
        );
        $statement->execute([$email]);
        $user = $statement->fetch();

        if (!$user) {
            password_verify($password, self::DUMMY_HASH);
            Response::error('Invalid email or password', 401);
        }
        if (!password_verify($password, $user['password_hash'])) {
            Response::error('Invalid email or password', 401);
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $user['id'];
        $_SESSION['last_activity'] = time();
        $_SESSION['session_started'] = time();

        return [
            'id' => (int) $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
        ];
    }

    public static function logout(): void
    {
        $_SESSION = [];
        if (session_status() === PHP_SESSION_ACTIVE) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', [
                'expires' => time() - 42000,
                'path' => $params['path'] ?? '/',
                'domain' => $params['domain'] ?? '',
                'secure' => (bool) ($params['secure'] ?? false),
                'httponly' => (bool) ($params['httponly'] ?? true),
                'samesite' => $params['samesite'] ?? 'Lax',
            ]);
            session_destroy();
        }
    }
}
