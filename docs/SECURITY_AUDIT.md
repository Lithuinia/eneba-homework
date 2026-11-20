# Security Audit

Date: 2026-11-19

Scope: the Intus marketplace frontend and PHP API, tested over HTTP as an external client, plus a code review of the application code and SQL seed files.

## Result summary

- 42/42 black-box checks passed.
- Additional input-limit and rate-limit checks passed.
- `npm audit` reported 0 vulnerabilities after dependency upgrades.
- No load/DoS testing was performed, per the instruction to keep that activity limited to an isolated lab with explicit limits.
- Checkout is simulated, so payment-provider replay and webhook-signature failures are not applicable. Repeated checkout creates a new simulated order, which is equivalent to buying the same item again; the frontend also disables the submit button while a request is in flight and checkout is rate-limited.

## Fixes applied

### Business logic

- Wishlist items are now deleted when a completed order contains the same product.
- Checkout rejects missing, non-numeric, zero, negative, or greater-than-10 quantities instead of silently clamping them.
- Checkout aggregates duplicate offer lines and product quantities before enforcing the 10-unit-per-product limit.
- Checkout validates aggregated offer quantities against available stock, preventing line-splitting bypasses.
- Checkout still calculates totals from server-side offer prices, so client-supplied prices are ignored.
- Checkout rejects more than 20 cart line entries.
- Duplicate registration races are handled by the unique email constraint and return a conflict response.

### Session and token handling

- Added CSRF tokens for all mutating API requests.
- Added `X-CSRF-Token` to the CORS allow-list.
- The frontend fetches the CSRF token automatically and retries once if a session rotation invalidates it.
- Session ID rotates on login and registration.
- Session IDs rotate periodically and idle sessions expire after two hours.
- Enabled strict session mode, cookies-only sessions, and disabled transparent session IDs.
- Logout deletes the session cookie.
- Login uses a dummy bcrypt verification for unknown emails to reduce timing-based account enumeration.

### Authorization and access control

- Order lookup is scoped to the signed-in user.
- Wishlist add/remove operations are scoped to the signed-in user.
- Checkout and order history require authentication.
- Unauthenticated and cross-user checks returned 401/404 as expected.

### Injection and input handling

- All SQL values use PDO prepared statements.
- Sort values are selected from a whitelist.
- Query parameters are read as strings and never passed through as arbitrary arrays.
- Product IDs, offer IDs, quantities, emails, names, and passwords are validated by type and length.
- SQL injection probes against product, category, search, and slug parameters did not produce SQL errors or bypasses.
- Search queries longer than 100 characters are rejected.
- Search result limits are clamped.
- Request bodies are limited to 1 MB and invalid JSON is rejected with 400.

### Server and file handling

- The PHP development router now always dispatches to the API entry point instead of checking arbitrary filesystem paths.
- Path traversal and `.env` probes returned 404 with no file contents.
- The backend serves no upload, archive, XML, or template surface, so XXE, ZIP-slip, and file-upload checks are not applicable.

### API and configuration

- Added `X-Content-Type-Options`, `X-Frame-Options`, CSP, Referrer-Policy, Permissions-Policy, and conditional HSTS headers.
- API responses are marked `Cache-Control: no-store`.
- Removed `X-Powered-By` and suppressed the `Server` header at the application layer.
- Added Apache and static-host security headers, directory-listing prevention, and SPA rewrite rules in `frontend/public/.htaccess`, `frontend/public/_headers`, and `backend/public/.htaccess`.
- CORS allows only configured origins and never uses a wildcard with credentials.
- `Vary: Origin` is always sent.
- Set `APP_ENV=production`, disabled displayed errors, and hid unexpected checkout/database messages from clients.
- Added file-based rate limits:
  - 600 API requests/minute per IP
  - 10 auth requests/5 minutes per IP
  - 60 searches/minute per IP
  - 10 checkouts/10 minutes per IP and user
- Sanitized the post-login `returnTo` value to prevent open redirects.

### Dependencies

- Upgraded React Router DOM to `7.18.6`.
- Upgraded Vite to `8.3.8`.
- Upgraded `@vitejs/plugin-react` to `6.3.0`.
- `npm audit` now reports zero vulnerabilities.

## Test evidence

Black-box checks covered:

- security headers and clickjacking protection
- CORS allowed/blocked origins and preflight behavior
- CSRF missing/wrong token rejection
- session ID rotation on login
- minimal auth response fields
- unauthenticated order, wishlist, and checkout access
- missing admin endpoint
- SQL injection probes
- path traversal and `.env` exposure probes
- raw HTTP path traversal with a hostile Host header
- wishlist removal after checkout
- client-side price tampering
- order IDOR
- negative/zero/oversized quantities
- mass-assignment attempts
- long search input, invalid JSON, oversized body, and auth rate limiting

## Residual risks and deployment notes

- `phpMyAdmin` is reachable locally at `http://localhost/phpmyadmin/` in the XAMPP setup. It is not part of the application and must not be deployed or exposed publicly. XAMPP also runs MariaDB with the local root account using an empty password; set a strong password before exposing MySQL to anything beyond localhost.
- XAMPP bundles MariaDB 10.4 and an older Apache/phpMyAdmin stack. Use a maintained production stack for any public deployment.
- The demo account `demo@intus.test` / `password` is intentionally known. Remove it or change its password before production.
- Local development uses `SESSION_SECURE=false`. For HTTPS deployments set `SESSION_SECURE=true`; for cross-site frontend/backend deployments set `SESSION_SAMESITE=None` and configure the deployed frontend origin.
- Rate limiting uses `REMOTE_ADDR`. Behind a reverse proxy, configure proxy-aware client IP handling or all clients may share the proxy address.
- The static-host security headers in `.htaccess` and `_headers` apply to Apache/static-host deployments, not to the Vite development server.
- Apache may still emit its own `Server` banner depending on host configuration; set `ServerTokens Prod` and `ServerSignature Off` in the production `httpd.conf`.
- Browser-based end-to-end and visual regression testing was not performed in this environment; the frontend passed TypeScript checks and a production build.
