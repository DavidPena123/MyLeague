-- FOXTROT-151: Connect players to teams and test
USE tracy_babe_ruth;

-- Make players.team_id point to a team.

SET @fk_exists = (
    SELECT COUNT(*)
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'players'
      AND COLUMN_NAME = 'team_id'
      AND REFERENCED_TABLE_NAME = 'teams'
);

SET @add_fk = IF(@fk_exists = 0,
    'ALTER TABLE players ADD CONSTRAINT fk_players_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL',
    'SELECT ''players.team_id already linked to teams'' AS note'
);
PREPARE stmt FROM @add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
-- ON DELETE SET NULL: if a team is deleted, its players stay in the database without a team (a player can exist without a team).
