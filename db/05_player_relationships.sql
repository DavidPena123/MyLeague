-- FOXTROT-133: Player relationships
-- Requires the players and divisions tables

ALTER TABLE players
    ADD CONSTRAINT fk_players_division
    FOREIGN KEY (division_id)
    REFERENCES divisions(id);

-- Match parent_id to the user table's ID type
ALTER TABLE players
    MODIFY COLUMN parent_id BIGINT UNSIGNED NULL;

-- Connect players to their parent accounts
ALTER TABLE players
    ADD CONSTRAINT fk_players_parent
    FOREIGN KEY (parent_id)
    REFERENCES `user`(id);
