<?php

declare(strict_types=1);

final class RateLimiter
{
    public static function check(string $key, int $limit, int $windowSeconds): void
    {
        $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'intus_ratelimit';
        if (!is_dir($directory) && !@mkdir($directory, 0777, true) && !is_dir($directory)) {
            return;
        }

        $file = $directory . DIRECTORY_SEPARATOR . hash('sha256', $key) . '.json';
        $handle = @fopen($file, 'c+');
        if ($handle === false) {
            return;
        }

        if (!flock($handle, LOCK_EX)) {
            fclose($handle);
            return;
        }

        $contents = stream_get_contents($handle);
        $data = json_decode($contents ?: '', true);
        if (!is_array($data) || !isset($data['start'], $data['count'])) {
            $data = ['start' => time(), 'count' => 0];
        }

        $now = time();
        if (($now - (int) $data['start']) >= $windowSeconds) {
            $data = ['start' => $now, 'count' => 0];
        }

        $data['count'] = (int) $data['count'] + 1;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($data));
        fflush($handle);
        flock($handle, LOCK_UN);
        fclose($handle);

        if ($data['count'] > $limit) {
            $retryAfter = max(1, $windowSeconds - ($now - (int) $data['start']));
            header('Retry-After: ' . $retryAfter);
            Response::error('Too many requests', 429);
        }
    }
}
