# Hosting Checklist

## alwaysdata upload folder

Use `hosting/` or `homework-task_intus_marketplace_hosting.zip`.

Upload the contents of `hosting/` to the alwaysdata site root (usually `~/www`) and keep the site type as **PHP**.

The combined folder layout is:

```text
hosting/
  index.html              frontend production build
  assets/                 frontend JS/CSS
  images/                 product and cart images
  logo.svg
  .htaccess               API routing, SPA fallback, security headers, private-path blocking
  api/
    index.php             API entry point
    .htaccess
  app/
    .env                  database and session configuration
    .env.example
    config/config.php
    src/*.php             PHP API source
    .htaccess             denies HTTP access to app source
  README_DEPLOY.txt
```

The alwaysdata values already set in `hosting/app/.env` are:

```text
DB_HOST=mysql-homework-task.alwaysdata.net
DB_PORT=3306
DB_NAME=homework-task_intus_marketplace
DB_USER=homework-task
DB_PASS=CHANGE_ME
APP_ENV=production
SESSION_NAME=intus_session
FRONTEND_ORIGIN=https://homework-task.alwaysdata.net
SESSION_SECURE=true
SESSION_SAMESITE=Lax
```

Change only this line in `hosting/app/.env` with the actual database password:

```text
DB_PASS=CHANGE_ME
```

`FRONTEND_ORIGIN` is the website URL. The database connection host is `mysql-homework-task.alwaysdata.net`, not the website URL.

## Database name

All SQL files and backend configuration use:

```text
homework-task_intus_marketplace
```

The canonical import order is:

1. `database/schema.sql`
2. `database/seed.sql`
3. `database/seed_extra.sql`

If your hosting panel already created the database and the database user cannot run `CREATE DATABASE`, use the matching pre-created-database copies instead:

1. `database/changed_name_initiation.sql`
2. `database/changed_name_seed.sql`
3. `database/changed_name_seed_extra.sql`

## Frontend

Build output is generated in:

```text
frontend/dist
frontend/build
```

`dist` is the canonical Vite output. `build` is an identical compatibility copy created by the build script.

After setting any production environment values:

```powershell
cd frontend
npm install
npm run build
```

If the frontend and API are on different origins, set `VITE_API_BASE` to the deployed API URL before building, for example:

```text
VITE_API_BASE=https://api.example.com/api
```

Also update the CSP `connect-src` value in `frontend/public/.htaccess` and `frontend/public/_headers` to include that API origin, then rebuild.

Upload only the contents of `frontend/dist` (or `frontend/build`) to the static host. Do not upload `node_modules`, source maps, or development files.

## Backend

Upload `backend/` and set the web document root to:

```text
backend/public
```

Use `backend/.env.production.example` as the template for the hosting environment. Required values:

```text
DB_HOST=...
DB_PORT=3306
DB_NAME=homework-task_intus_marketplace
DB_USER=...
DB_PASS=...
APP_ENV=production
SESSION_NAME=intus_session
FRONTEND_ORIGIN=https://your-frontend.example
SESSION_SECURE=true
SESSION_SAMESITE=None
```

For a same-origin deployment, `SESSION_SAMESITE=Lax` is acceptable. For separate frontend/API domains, use `SESSION_SAMESITE=None` with HTTPS and `SESSION_SECURE=true`.

Apache uses `backend/public/.htaccess` for the API rewrite and security headers. Nginx deployments need the equivalent rewrite:

```nginx
root /path/to/backend/public;
index index.php;

location / {
    try_files $uri /index.php?$query_string;
}

location ~ \.php$ {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass unix:/run/php/php8.2-fpm.sock;
}

location ~ /\. {
    deny all;
}
```

Do not deploy the `XAMPP/`, `examples/`, `docs/`, `database/` source folder, `CONVERSATION_LOG.md`, `backend/.env`, or `frontend/src/` directly to the public web root.

## Database import

Create the database if the hosting panel does not create it automatically, then import the three SQL files in order:

```sql
CREATE DATABASE IF NOT EXISTS `homework-task_intus_marketplace`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

`database/schema.sql` already includes the `CREATE DATABASE` statement.

## Post-deploy smoke test

- `GET https://your-api.example/api/health` returns `{"ok":true}`.
- The homepage loads and shows products.
- Search returns results.
- Login works with the seeded demo account or a newly registered account.
- Checkout completes with simulated payment fields.
- Order history shows the generated keys.
