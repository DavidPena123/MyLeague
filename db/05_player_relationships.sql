-- FOXTROT-133: Player relationships
-- Requires the players and divisions tables.
-- Check existing relationships so this script can be rerun.

SET @division_fk_exists = (
    SELECT COUNT(*)
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'players'
      AND COLUMN_NAME = 'division_id'
      AND REFERENCED_TABLE_SCHEMA = DATABASE()
      AND REFERENCED_TABLE_NAME = 'divisions'
      AND REFERENCED_COLUMN_NAME = 'id'
);

SET @relationship_sql = IF(@division_fk_exists = 0,
    'ALTER TABLE players ADD CONSTRAINT fk_players_division FOREIGN KEY (division_id) REFERENCES divisions(id)',
    'SELECT ''players.division_id already linked to divisions'' AS note'
);
PREPARE relationship_stmt FROM @relationship_sql;
EXECUTE relationship_stmt;
DEALLOCATE PREPARE relationship_stmt;

-- Match parent_id to the user table's ID type only when needed.
-- Avoid changing a column that already has its foreign key in place.
SET @parent_type_ready = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'players'
      AND COLUMN_NAME = 'parent_id'
      AND DATA_TYPE = 'bigint'
      AND COLUMN_TYPE LIKE '%unsigned%'
      AND IS_NULLABLE = 'YES'
);

SET @relationship_sql = IF(@parent_type_ready = 0,
    'ALTER TABLE players MODIFY COLUMN parent_id BIGINT UNSIGNED NULL',
    'SELECT ''players.parent_id already has the correct type'' AS note'
);
PREPARE relationship_stmt FROM @relationship_sql;
EXECUTE relationship_stmt;
DEALLOCATE PREPARE relationship_stmt;

-- Connect players to their parent accounts unless that relationship exists.
SET @parent_fk_exists = (
    SELECT COUNT(*)
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'players'
      AND COLUMN_NAME = 'parent_id'
      AND REFERENCED_TABLE_SCHEMA = DATABASE()
      AND REFERENCED_TABLE_NAME = 'user'
      AND REFERENCED_COLUMN_NAME = 'id'
);

SET @relationship_sql = IF(@parent_fk_exists = 0,
    'ALTER TABLE players ADD CONSTRAINT fk_players_parent FOREIGN KEY (parent_id) REFERENCES `user`(id)',
    'SELECT ''players.parent_id already linked to user'' AS note'
);
PREPARE relationship_stmt FROM @relationship_sql;
EXECUTE relationship_stmt;
DEALLOCATE PREPARE relationship_stmt;
