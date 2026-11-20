# Task List

## Phase 1 - Analysis and setup

- [x] Save the conversation log in Markdown.
- [x] Extract and analyze the assignment PDF.
- [x] Analyze the saved Intus HTML examples.
- [x] Extract the visible style system and feature inventory.
- [x] Confirm frontend architecture (React + TypeScript).
- [x] Confirm PHP/MySQL environment and phpMyAdmin credentials (XAMPP defaults).
- [x] Confirm UI language (English + Lithuanian switch).
- [x] Confirm scope beyond required pages (required + wishlist).
- [x] Confirm seed catalog and image strategy (example catalog + local reference artwork).

## Phase 2 - Project foundation

- [x] Create repository structure for frontend, PHP API, database, and docs.
- [x] Create the shared header/navigation/theme component.
- [x] Create a PHP bootstrap and shared response/error helpers.
- [x] Create the MySQL schema and seed data.
- [x] Create database connection configuration with local example values.
- [x] Create frontend API client and TypeScript types.
- [x] Add typecheck and build scripts.

## Phase 3 - Required features

- [x] Authentication: register, login, logout, session handling, protected routes.
- [x] Store catalog: product list, platform filter, region filter, price filter.
- [x] Store catalog: sorting (price, name, popularity/newest).
- [x] Search: global search bar with partial-name and typo tolerance.
- [x] Search normalization: diacritic folding so `s` and `š` are equivalent.
- [x] Search: Levenshtein distance threshold of 2 for longer tokens.
- [x] Homepage: banner/hero block from backend.
- [x] Homepage: best sellers block from backend.
- [x] Homepage: deals block from backend.
- [x] Homepage: categories, gift cards, upcoming, recommended blocks.
- [x] Product page: product details, image, platform, region, activation info.
- [x] Product page: multiple seller offers with price and seller name.
- [x] Product page: add to cart and wishlist.
- [x] Product page: ratings/reviews and related products.
- [x] Cart: add, update quantity, remove, totals.
- [x] Checkout: auth-protected, simulated payment with no bank fields.
- [x] Checkout: create order and generate/reveal digital keys.
- [x] Order history: auth-protected, show orders and keys.
- [x] Responsive layout matching Intus desktop/mobile behavior.
- [x] Footer and informational links.
- [x] Wishlist page.

## Phase 4 - Quality and delivery

- [x] Install Node.js runtime (used the Node runtime bundled with Visual Studio).
- [x] Run `npm install` and `npm run typecheck`.
- [x] Run `npm run build`.
- [x] Run PHP syntax checks on backend files using PHP lint.
- [x] Install/start XAMPP and verify PHP/MySQL.
- [x] Import `database/schema.sql`, `database/seed.sql`, and `database/seed_extra.sql` in phpMyAdmin.
- [x] Run end-to-end API smoke test.
- [x] README with setup, schema import, and run instructions.
- [x] Full conversation log updated for the current turn.
- [ ] GitHub repository link.
- [ ] Public deployment on a free-tier service.

## Phase 5 - Follow-up changes

- [x] Rebrand the application, database, session keys, localStorage keys, and generated app docs to Intus.
- [x] Replace the reference logo with an Intus wordmark.
- [x] Remove the top app promotion banner.
- [x] Remove the login/register marketing illustration blocks.
- [x] Replace the cart block glyph with the supplied cart image.
- [x] Sync logout across browser tabs.
- [x] Repair Lithuanian text encoding in the seed data and force `utf8mb4`.
- [x] Filter tiny platform-icon artwork and add a runtime product-artwork fallback.
- [x] Remove the duplicate category strip from the bottom of the homepage.
- [x] Limit homepage section products to one row with a "Show all" button below.
- [x] Add `database/seed_extra.sql` with 83 additional products layered on top of the base seed.
- [x] Import schema, seed, and extra seed into XAMPP MariaDB.
- [x] Smoke-test API health, homepage, products, typo search, product detail, auth, wishlist, checkout, order history, and logout.
- [x] Re-run frontend typecheck and production build.

## Phase 6 - Security audit and hardening

- [x] Remove ordered wishlist products after checkout.
- [x] Add CSRF tokens and frontend header handling.
- [x] Add session rotation, idle expiry, strict mode, and cookie deletion on logout.
- [x] Add security headers, CSP, clickjacking protection, no-store API caching, and HSTS.
- [x] Harden the PHP router against path traversal.
- [x] Add API, auth, search, and checkout rate limits.
- [x] Add request body, query length, and pagination limits.
- [x] Reject invalid quantities and parameter-pollution payloads.
- [x] Hide verbose errors and server version headers.
- [x] Sanitize post-login redirect targets.
- [x] Upgrade vulnerable Vite, React Router, and plugin dependencies.
- [x] Run `npm audit` with 0 vulnerabilities.
- [x] Run 42 black-box security checks plus input/rate-limit checks.
- [x] Record findings and residual risks in `docs/SECURITY_AUDIT.md`.

## Phase 7 - Cart limits and search repair

- [x] Add offer stock to product API responses and cart items.
- [x] Enforce a maximum of 10 units per cart item.
- [x] Clamp cart quantities to the current offer stock before checkout.
- [x] Add stock-aware plus/minus controls with a numeric quantity display.
- [x] Revalidate cart stock on the cart and checkout pages.
- [x] Fix the search 500 caused by a float return from Search::scoreProduct.
- [x] Tighten two-typo matching to tokens of 5+ characters to reduce irrelevant results.
- [x] Add `backend/tests/search_smoke.php` regression coverage.
- [x] Verify search and cart limits in a headless browser.

## Phase 8 - Pagination and checkout payment UI

- [x] Replace the pagination summary span with interactive page-number buttons.
- [x] Always include the first and last page, with a limited window around the current page and ellipses.
- [x] Add selectable checkout payment methods: card, PayPal, Apple Pay, Google Pay, bank link, and crypto.
- [x] Add demo-only payment detail fields for each method without validation, processing, or storage.
- [x] Show the selected payment method in the order summary.
- [x] Verify pagination navigation and blank-field checkout in a headless browser.

## Phase 9 - alwaysdata hosting bundle

- [x] Rename the database target to `homework-task_intus_marketplace`.
- [x] Create a combined `hosting/` folder with the built frontend and PHP API.
- [x] Move API source into `hosting/app` and expose only `hosting/api/index.php`.
- [x] Add root, API, and app `.htaccess` files for routing, SPA fallback, and private-path blocking.
- [x] Add `hosting/app/.env` with alwaysdata database, session, and site URL values.
- [x] Add `hosting/README_DEPLOY.txt` with the database password location.
- [x] Create `homework-task_intus_marketplace_hosting.zip` with POSIX archive paths.
- [x] Test API routing and protected paths under local Apache.
- [x] Lint all hosting PHP files.
- [x] Restrict price filter inputs to digits and a single decimal separator.
- [x] Rebuild `dist`, `build`, the `hosting/` bundle, and the hosting zip with the fix.
- [x] Verify the built deployment bundle rejects letters in both price inputs.

## Phase 10 - Checkout line-splitting fix

- [x] Aggregate quantities by offer ID before stock checks.
- [x] Aggregate quantities by product ID before enforcing the 10-unit-per-product limit.
- [x] Test `10 + 1` on the same offer: rejected.
- [x] Test `6 + 5` across two offers for the same product: rejected.
- [x] Test `4 + 3` against an offer with stock 6: rejected.
- [x] Test valid `5 + 5` on the same offer: accepted with exactly 10 order items.
- [x] Copy the fixed checkout handler into the hosting bundle and rebuild the zip.
