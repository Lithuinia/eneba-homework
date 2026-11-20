USE `homework-task_intus_marketplace`;

SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS home_section_products;
DROP TABLE IF EXISTS home_sections;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_keys;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(80) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sellers (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(190) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  platform VARCHAR(40) NOT NULL,
  region VARCHAR(40) NOT NULL,
  category VARCHAR(40) NOT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  release_date DATE DEFAULT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  rating_count INT UNSIGNED NOT NULL DEFAULT 0,
  popularity INT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY products_slug_unique (slug),
  KEY products_platform_index (platform),
  KEY products_region_index (region),
  KEY products_category_index (category),
  KEY products_name_index (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE offers (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  seller_id INT UNSIGNED NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  delivery VARCHAR(80) NOT NULL DEFAULT 'Instant',
  is_best TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY offers_product_index (product_id),
  KEY offers_price_index (price),
  UNIQUE KEY offers_product_seller_price_unique (product_id, seller_id, price),
  CONSTRAINT offers_product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  CONSTRAINT offers_seller_fk FOREIGN KEY (seller_id) REFERENCES sellers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_keys (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  key_code VARCHAR(40) NOT NULL,
  is_used TINYINT(1) NOT NULL DEFAULT 0,
  order_item_id INT UNSIGNED DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY product_keys_code_unique (key_code),
  KEY product_keys_product_index (product_id),
  CONSTRAINT product_keys_product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'paid',
  payment_method VARCHAR(30) NOT NULL DEFAULT 'simulated',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY orders_user_index (user_id),
  CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_items (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  offer_id INT UNSIGNED NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  seller_name VARCHAR(120) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  key_code VARCHAR(40) NOT NULL,
  PRIMARY KEY (id),
  KEY order_items_order_index (order_id),
  CONSTRAINT order_items_order_fk FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE wishlist (
  user_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, product_id),
  CONSTRAINT wishlist_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT wishlist_product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reviews (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED DEFAULT NULL,
  author_name VARCHAR(80) NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  comment TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY reviews_product_index (product_id),
  CONSTRAINT reviews_product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  CONSTRAINT reviews_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE home_sections (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  type VARCHAR(40) NOT NULL,
  title VARCHAR(190) NOT NULL,
  title_lt VARCHAR(190) DEFAULT NULL,
  subtitle VARCHAR(255) DEFAULT NULL,
  subtitle_lt VARCHAR(255) DEFAULT NULL,
  cta_label VARCHAR(80) DEFAULT NULL,
  cta_label_lt VARCHAR(80) DEFAULT NULL,
  cta_url VARCHAR(255) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE home_section_products (
  section_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (section_id, product_id),
  CONSTRAINT home_section_products_section_fk FOREIGN KEY (section_id) REFERENCES home_sections (id) ON DELETE CASCADE,
  CONSTRAINT home_section_products_product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
