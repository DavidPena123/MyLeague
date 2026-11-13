USE tracy_babe_ruth;

CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    game_date DATE NOT NULL,
    game_time TIME NOT NULL,
    field_id INT NOT NULL,
    division_id INT NOT NULL,
    status ENUM('scheduled', 'canceled') NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_games_home_team FOREIGN KEY (home_team_id) REFERENCES teams(id),
    CONSTRAINT fk_games_away_team FOREIGN KEY (away_team_id) REFERENCES teams(id),
    CONSTRAINT fk_games_field FOREIGN KEY (field_id) REFERENCES fields(id),
    CONSTRAINT fk_games_division FOREIGN KEY (division_id) REFERENCES divisions(id),

    -- make sure team cant play itself
    CONSTRAINT chk_games_different_teams CHECK (home_team_id <> away_team_id)
);
    