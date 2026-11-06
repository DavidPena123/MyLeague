USE tracy_babe_ruth;


-- FOXTROT-148: Create the teams table
-- FOXTROT-149: Link teams to divisions, managers and coaches

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    division_id INT NOT NULL,                -- which division the team plays in
    manager_id BIGINT UNSIGNED NOT NULL,     -- every team has a manager 
    coach_id BIGINT UNSIGNED NULL,           -- the coach/manager
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Two divisions will not both have the same team name.
    CONSTRAINT uq_teams_name_division UNIQUE (name, division_id),

    CONSTRAINT fk_teams_division FOREIGN KEY (division_id) REFERENCES divisions(id),
    CONSTRAINT fk_teams_manager FOREIGN KEY (manager_id) REFERENCES `user`(id),

    CONSTRAINT fk_teams_coach FOREIGN KEY (coach_id) REFERENCES `user`(id) ON DELETE SET NULL
);
