SET @registration_names_required = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'user'
      AND COLUMN_NAME IN ('first_name', 'last_name')
      AND IS_NULLABLE = 'NO'
);

SET @registration_sql = IF(@registration_names_required > 0,
    'ALTER TABLE `user` MODIFY COLUMN first_name VARCHAR(64) NULL, MODIFY COLUMN last_name VARCHAR(64) NULL',
    'SELECT ''Registration names are already optional'' AS note'
);
PREPARE registration_stmt FROM @registration_sql;
EXECUTE registration_stmt;
DEALLOCATE PREPARE registration_stmt;

SET @registration_verification_exists = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'user'
      AND COLUMN_NAME = 'email_verified'
);

SET @registration_sql = IF(@registration_verification_exists = 0,
    'ALTER TABLE `user` ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT FALSE',
    'SELECT ''Email verification status already exists'' AS note'
);
PREPARE registration_stmt FROM @registration_sql;
EXECUTE registration_stmt;
DEALLOCATE PREPARE registration_stmt;
