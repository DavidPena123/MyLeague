-- FOXTROT-133: Player relationships
-- Requires the players and divisions tables

ALTER TABLE players
    ADD CONSTRAINT fk_players_division
    FOREIGN KEY (division_id)
    REFERENCES divisions(id);
