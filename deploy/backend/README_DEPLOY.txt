Intus Marketplace - alwaysdata deployment

Structure:
www/       site root content
backend/   PHP source, configuration, and .env

Upload:
- Upload the contents of www/ into the alwaysdata site root (usually ~/www).
- Upload the backend/ folder next to www, so the final server layout is:

  ~/www/index.html
  ~/www/assets/
  ~/www/images/
  ~/www/api/index.php
  ~/backend/.env
  ~/backend/config/config.php
  ~/backend/src/

Keep the alwaysdata site type as PHP.

Database:
DB_HOST=mysql-homework-task.alwaysdata.net
DB_PORT=3306
DB_NAME=homework-task_intus_marketplace
DB_USER=homework-task

The database password is already in backend/.env. If it changes, edit:

backend/.env -> DB_PASS=

Site URL:
https://homework-task.alwaysdata.net/

Important:
- Do not move backend/ into www/.
- Ensure hidden files such as www/.htaccess, www/api/.htaccess, backend/.htaccess, and backend/.env are preserved during upload.
- The SQL files are in the main project database folder and are not part of this deployment folder.
