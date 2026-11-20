Intus Marketplace - alwaysdata upload

Site URL:
https://homework-task.alwaysdata.net/

Database host:
mysql-homework-task.alwaysdata.net

Database port:
3306

Database name:
homework-task_intus_marketplace

Database user:
homework-task

Database password:
Open app/.env and replace:

DB_PASS=CHANGE_ME

with the password configured in alwaysdata.

Where to change the password:
hosting/app/.env  ->  DB_PASS=

Do not move app/.env into the public root. The root .htaccess blocks /app/*.

Upload:
Upload the contents of this hosting folder to the alwaysdata site root (usually ~/www) and keep the site type as PHP.

The public entry points are:
/          -> index.html
/api/*     -> api/index.php

The API source is in app/src and app/config and is blocked from HTTP access.

Important:
- The frontend build already uses /api, so no separate API URL is needed.
- SESSION_SECURE is true because the site uses HTTPS.
- If the site is served over HTTP, login cookies will not work until HTTPS is enabled.
- The database SQL files are in the main project database folder and are not included in this public upload folder.
