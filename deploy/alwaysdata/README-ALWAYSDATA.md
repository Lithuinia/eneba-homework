# Alwaysdata deployment package

This folder is ready to upload to the alwaysdata account `homework-task`.

## Upload layout

Upload the contents of this folder to the account home so the final layout is:

```text
/home/homework-task/
  www/
    index.html
    assets/
    images/
    logo.svg
    .htaccess
    api/
      index.php
      .htaccess
  backend/
    .env
    .env.example
    .env.production.example
    config/
    public/
    src/
  database/
    schema.sql
    seed.sql
    seed_extra.sql
```

`www` is the public web root. `backend` and `database` must stay outside `www`.

## Database

Database values are already set in `backend/.env`:

```text
DB_HOST=mysql-homework-task.alwaysdata.net
DB_PORT=3306
DB_NAME=homework-task_intus_marketplace
DB_USER=homework-task
DB_PASS=CHANGE_ME
```

Change `DB_PASS=CHANGE_ME` in `backend/.env` to the MySQL password for the `homework-task` database user.

Import the SQL files in this order using alwaysdata's phpMyAdmin or MySQL client:

1. `database/schema.sql`
2. `database/seed.sql`
3. `database/seed_extra.sql`

The database name is already set to `homework-task_intus_marketplace`, and the SQL files use backticked identifiers because the name contains hyphens.

## Website

- Frontend URL: `https://homework-task.alwaysdata.net/`
- API base: `https://homework-task.alwaysdata.net/api`
- API health check: `https://homework-task.alwaysdata.net/api/health`

The `.htaccess` files do three things:

1. Route `/api` and `/api/*` to `www/api/index.php`.
2. Route frontend paths that are not real files back to `index.html`.
3. Add security headers and disable directory indexes.

## PHP

Use PHP 8.1 or newer in the alwaysdata panel. The project was developed and tested on PHP 8.2.

## Files not to expose

Do not move `backend`, `database`, or `README-ALWAYSDATA.md` inside `www`. They are intentionally outside the public web root.
