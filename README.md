# Intus Marketplace

An Intus-style marketplace built for the Intus internship assignment.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: PHP REST API
- Database: MySQL / MariaDB (phpMyAdmin)
- Styling: shared Intus-inspired theme in `frontend/src/styles/theme.css`, used by every page through the shared `Header` and `Layout` components

## Project structure

```text
frontend/                  React + TypeScript app
  public/images/products/  Product artwork copied from the example pages
  src/components/          Shared header, footer, product card, search bar
  src/context/             Auth, cart, and language providers
  src/pages/               Home, store, search, product, auth, cart, checkout, orders, wishlist
  src/styles/theme.css     Universal Intus-style theme
backend/                   PHP REST API
  config/                  Environment-driven configuration
  public/                  Entry point and router
  src/                     Database, auth, catalog, search, checkout
database/
  schema.sql               MySQL schema
  seed.sql                 Example catalog, sellers, offers, keys, reviews, homepage blocks
  seed_extra.sql           Additional catalog records layered on top of seed.sql
docs/                      Assignment analysis, style guide, feature inventory, task list
CONVERSATION_LOG.md        Full agent conversation log
```

## Prerequisites

- XAMPP with PHP 8.1+ and MySQL/MariaDB
- Node.js 18+ and npm
- phpMyAdmin

## Setup

1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin and import `database/schema.sql`.
3. Import `database/seed.sql`.
4. Import `database/seed_extra.sql`. This adds the expanded catalog on top of the base seed.
5. Copy `backend/.env.example` to `backend/.env` if you need custom database credentials. The default values target XAMPP: host `127.0.0.1`, user `root`, empty password, database `intus_marketplace`.
6. Install frontend dependencies:

```powershell
cd frontend
npm install
```

7. Start the PHP API from the project root:

```powershell
php -S 127.0.0.1:8000 -t backend/public backend/public/router.php
```

If PHP is installed inside XAMPP but not on `PATH`, use the full path to `php.exe`, for example:

```powershell
C:\xampp\php\php.exe -S 127.0.0.1:8000 -t backend/public backend/public/router.php
```

8. Start the frontend:

```powershell
cd frontend
npm run dev
```

9. Open `http://localhost:5173`.

For Apache/XAMPP, point a virtual host or copy `backend/public` into `htdocs`, enable `mod_rewrite`, and keep the `.htaccess` file. The API base URL can be changed with `VITE_API_BASE` in `frontend/.env`.

When deploying the frontend and backend on different domains, set `SESSION_SECURE=true` and `SESSION_SAMESITE=None` in `backend/.env`, use HTTPS, and add the deployed frontend URL to `FRONTEND_ORIGIN`.

## Demo account

- Email: `demo@intus.test`
- Password: `password`

You can also create a new account from the registration page.

## Implemented features

- Shared Intus-style header, navigation, search, cart, language switch, user menu, footer, and theme.
- Intus branding, custom Intus logo, and cart icon from `frontend/public/images/cart-removebg-preview.png`.
- Homepage blocks loaded from MySQL through `/api/home` (hero, best sellers, deals, recommended, gift cards, pre-order, add-ons, new arrivals, more deals).
- Homepage sections show a single product row with a "Show all" action below.
- 128 demo products and 416 seller offers after importing both seed files.
- Product image fallback for tiny platform icons, so images fit their slots correctly.
- Store catalog with platform, region, category, numeric-only price filters, sorting, pagination with interactive first/last/current page numbers, and name search.
- Typo-tolerant global search with partial-name matching.
- Diacritic folding: `s` and `š` are treated as the same letter, along with other Lithuanian and common Latin accents.
- Levenshtein typo threshold of 2 for tokens of 5+ characters; shorter tokens use a threshold of 1 to avoid noisy matches.
- Product page with seller offer comparison, price selection, wishlist, reviews, description, activation guide, and related products.
- Registration, login, logout, session-based auth, protected checkout/order history/wishlist.
- Cross-tab logout synchronization through a shared browser storage event.
- Cart with quantity controls and localStorage persistence.
- Cart enforces a maximum of 10 units per item and clamps quantities to the current offer stock before checkout.
- Simulated checkout with selectable payment methods (card, PayPal, Apple Pay, Google Pay, bank link, crypto) and demo-only detail fields that are not validated, processed, or stored.
- Checkout creates an order, assigns digital keys, decrements stock, and shows the keys.
- Order history with purchased keys.
- English/Lithuanian UI switch.
- Responsive desktop and mobile layouts.
- Cross-tab logout synchronization.
- CSRF protection, session rotation, idle session expiry, rate limiting, security headers, and input limits.

## Security

See `docs/SECURITY_AUDIT.md` for the full audit report and test evidence.

- `npm audit` reports 0 vulnerabilities.
- Use HTTPS in production, set `SESSION_SECURE=true`, and set `SESSION_SAMESITE=None` when the frontend and API are on different sites.
- Update the CSP `connect-src` value in `frontend/public/.htaccess` / `frontend/public/_headers` if the deployed API origin is not served through the same origin or localhost.
- `APP_ENV=production` hides internal errors. Set `APP_ENV=development` temporarily if you need verbose local debugging.
- Do not deploy XAMPP or phpMyAdmin. For alwaysdata, use `deploy/` (`www/` and `backend/`) or `homework-task_intus_marketplace_deploy.zip` (configured database password). The password-free template is `hosting/` and `homework-task_intus_marketplace_hosting.zip`.
- Change the demo account password or remove the demo user before production.
- Set a strong MySQL password before exposing the database beyond localhost.

## Tests

```powershell
php backend/tests/search_smoke.php
cd frontend
npm run typecheck
npm run build
npm audit
```

## Search rules

The search endpoint is `/api/search?q=...`.

Normalization:

- lowercases text
- removes diacritics (`š` → `s`, `ą` → `a`, `č` → `c`, and so on)
- removes punctuation
- compares tokens for partial matches and typo distance
- expands a few common aliases such as `GTA 6`, `GTA`, `RDR2`, `COD`, and `MC`

A query token can match a product token when:

- it is an exact match
- one token is a prefix of the other
- Levenshtein distance is at most 2 for tokens of 5+ characters
- Levenshtein distance is at most 1 for shorter tokens

## Checkout rules

Checkout is intentionally simulated:

- no card number, CVV, bank account, or billing fields
- the user must be signed in
- the server aggregates duplicate offer/product lines before enforcing the 10-unit-per-product limit
- the server validates aggregated offer quantities against available stock
- the server creates the order and assigns digital keys

## Useful API routes

```text
GET    /api/health
GET    /api/home?lang=en|lt
GET    /api/filters
GET    /api/products
GET    /api/products/{slug}
GET    /api/search?q=...
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/{productId}
POST   /api/checkout
GET    /api/orders
GET    /api/orders/{id}
```

## Hosting bundle

- Configured alwaysdata upload: `deploy/www/` + `deploy/backend/`
- Configured zip: `homework-task_intus_marketplace_deploy.zip`
- Password-free template: `hosting/`
- Template zip: `homework-task_intus_marketplace_hosting.zip`

The deploy bundle contains the current compiled frontend, PHP API, `.htaccess` routing, security headers, checkout aggregation fix, and numeric-only price inputs.

## Notes

- Frontend dependencies were installed and both `npm run typecheck` and `npm run build` completed successfully.
- `npm audit` reports 0 vulnerabilities.
- The API was smoke-tested against XAMPP MariaDB 10.4: health, home, products, typo search, product detail, login, checkout, order history, and logout.
- The black-box security audit passed 42/42 checks; see `docs/SECURITY_AUDIT.md`.
- The saved example pages are reference material only. Product artwork was copied from those local reference assets for the demo catalog.
