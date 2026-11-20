<?php

declare(strict_types=1);

final class CheckoutException extends RuntimeException
{
}

final class Checkout
{
    public static function placeOrder(PDO $pdo, int $userId, array $items): array
    {
        if ($items === []) {
            Response::error('Cart is empty', 422);
        }
        if (count($items) > 20) {
            Response::error('Too many cart items', 422);
        }

        $pdo->beginTransaction();

        try {
            $offerStatement = $pdo->prepare(
                'SELECT o.id, o.product_id, o.seller_id, o.price, o.currency, o.stock,
                    p.name AS product_name, s.name AS seller_name
                 FROM offers o
                 JOIN products p ON p.id = o.product_id
                 JOIN sellers s ON s.id = o.seller_id
                 WHERE o.id = ? AND p.is_active = 1 FOR UPDATE'
            );

            $total = 0.0;
            $prepared = [];

            foreach ($items as $item) {
                if (!is_array($item)) {
                    throw new CheckoutException('Invalid cart item');
                }
                $rawOfferId = $item['offer_id'] ?? 0;
                $rawQuantity = $item['quantity'] ?? 1;
                if (!is_int($rawOfferId) && !(is_string($rawOfferId) && ctype_digit($rawOfferId))) {
                    throw new CheckoutException('Invalid offer');
                }
                if (!is_int($rawQuantity) && !(is_string($rawQuantity) && ctype_digit($rawQuantity))) {
                    throw new CheckoutException('Invalid quantity');
                }
                $offerId = (int) $rawOfferId;
                $quantity = (int) $rawQuantity;
                if ($quantity < 1 || $quantity > 10) {
                    throw new CheckoutException('Quantity must be between 1 and 10');
                }

                if ($offerId <= 0) {
                    throw new CheckoutException('Invalid offer');
                }

                $offerStatement->execute([$offerId]);
                $offer = $offerStatement->fetch();

                if (!$offer) {
                    throw new CheckoutException('One of the selected offers is no longer available');
                }
                if ((int) $offer['stock'] < $quantity) {
                    throw new CheckoutException('Not enough stock for ' . $offer['product_name']);
                }

                $keyStatement = $pdo->prepare(
                    'SELECT id, key_code FROM product_keys
                     WHERE product_id = ? AND is_used = 0
                     ORDER BY id ASC LIMIT ' . $quantity . ' FOR UPDATE'
                );
                $keyStatement->execute([(int) $offer['product_id']]);
                $keyRows = $keyStatement->fetchAll();

                $prepared[] = [
                    'offer' => $offer,
                    'quantity' => $quantity,
                    'keys' => $keyRows,
                    'price' => (float) $offer['price'],
                ];
                $total += (float) $offer['price'] * $quantity;
            }

            $orderStatement = $pdo->prepare(
                'INSERT INTO orders (user_id, total, status, payment_method, created_at)
                 VALUES (?, ?, ?, ?, NOW())'
            );
            $orderStatement->execute([$userId, round($total, 2), 'paid', 'simulated']);
            $orderId = (int) $pdo->lastInsertId();

            $itemStatement = $pdo->prepare(
                'INSERT INTO order_items
                    (order_id, product_id, offer_id, product_name, seller_name, unit_price, quantity, key_code)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
            );
            $keyUpdate = $pdo->prepare(
                'UPDATE product_keys SET is_used = 1, order_item_id = ? WHERE id = ?'
            );
            $stockUpdate = $pdo->prepare(
                'UPDATE offers SET stock = GREATEST(0, stock - ?) WHERE id = ?'
            );
            $wishlistDelete = $pdo->prepare(
                'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?'
            );

            foreach ($prepared as $entry) {
                $offer = $entry['offer'];
                for ($index = 0; $index < $entry['quantity']; $index++) {
                    $keyRow = $entry['keys'][$index] ?? null;
                    $keyCode = $keyRow['key_code'] ?? self::generateKey();

                    $itemStatement->execute([
                        $orderId,
                        (int) $offer['product_id'],
                        (int) $offer['id'],
                        $offer['product_name'],
                        $offer['seller_name'],
                        $entry['price'],
                        1,
                        $keyCode,
                    ]);
                    $orderItemId = (int) $pdo->lastInsertId();

                    if ($keyRow !== null) {
                        $keyUpdate->execute([$orderItemId, (int) $keyRow['id']]);
                    }
                }

                $stockUpdate->execute([$entry['quantity'], (int) $offer['id']]);
                $wishlistDelete->execute([$userId, (int) $offer['product_id']]);
            }

            $pdo->commit();

            $order = Catalog::getOrder($pdo, $userId, $orderId);
            if ($order === null) {
                Response::error('Order could not be loaded', 500);
            }

            return $order;
        } catch (CheckoutException $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            Response::error($exception->getMessage(), 422);
        } catch (Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            error_log($exception->getMessage());
            Response::error('Checkout could not be completed', 500);
        }
    }

    private static function generateKey(): string
    {
        $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $parts = [];
        for ($part = 0; $part < 3; $part++) {
            $value = '';
            for ($index = 0; $index < 4; $index++) {
                $value .= $alphabet[random_int(0, strlen($alphabet) - 1)];
            }
            $parts[] = $value;
        }
        return implode('-', $parts);
    }
}
