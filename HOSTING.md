# Hosting Checklist

## alwaysdata deployment bundle

Use `deploy/` or `homework-task_intus_marketplace_deploy.zip`.

The deploy folder contains exactly two folders:

```text
deploy/
  www/       frontend and public API entry
  backend/   PHP source, configuration, and .env
```

Upload:

- the contents of `deploy/www/` into the alwaysdata site root, usually `~/www`
- the `deploy/backend/` folder next to it, so it ends up at `~/backend`

Keep the alwaysdata site type as **PHP**.

## Database

```text
Host: mysql-homework-task.alwaysdata.net
Port: 3306
Name: homework-task_intus_marketplace
User: homework-task
```

The configured deploy bundle already contains the database password in:

```text
deploy/backend/.env
```

If the password changes, edit:

```text
DB_PASS=
```

in that file.

## Public files

The site root (`www/`) contains:

```text
index.html
assets/
images/
logo.svg
.htaccess
api/
  index.php
  .htaccess
```

The backend (`backend/`) contains:

```text
.env
.env.example
.htaccess
README_DEPLOY.txt
config/config.php
src/*.php
```

`www/api/index.php` loads the API from `../backend/src/Bootstrap.php` via the relative server layout.

## Routing

- `/api/*` → `www/api/index.php`
- `/` and SPA routes → `www/index.html`
- `backend/` is outside the site root and is denied by `backend/.htaccess`

## Important

- Ensure hidden files such as `www/.htaccess`, `www/api/.htaccess`, `backend/.htaccess`, and `backend/.env` are preserved during upload.
- Do not move `backend/` into `www/`.
- The API works at the domain root and in a subdirectory.
- Save `backend/.env` as UTF-8 **without BOM**. The current `config.php` strips a leading BOM, but a BOM can make the first `DB_HOST` line unreadable in older deployments.
- If the database is empty, import `database/schema.sql`, `database/seed.sql`, and `database/seed_extra.sql` into `homework-task_intus_marketplace`.

## Troubleshooting 500 on /api/*

1. Check `backend/.env` for a leading BOM or malformed first line.
2. Check the PHP error log in the alwaysdata admin panel.
3. Re-upload `backend/.env` and `backend/config/config.php` from the current deploy bundle.
4. Confirm the database is reachable with the host `mysql-homework-task.alwaysdata.net`.
