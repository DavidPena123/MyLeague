USE tracy_babe_ruth;

INSERT INTO games (home_team_id, away_team_id, game_date, game_time, field_id, division_id, status)
SELECT home_t.id, away_t.id, s.game_date, s.game_time, f.id, d.id, s.status
FROM (
    SELECT 'Majors' AS division, 'Athletics' AS home, 'Cubs' AS away,
           '2026-10-10' AS game_date, '10:00:00' AS game_time,
           'Field 1' AS field, 'Scheduled' AS status
    UNION ALL SELECT 'Majors', 'Giants', 'White Sox', '2026-10-24', '12:00:00', 'Field 2', 'Canceled'
    UNION ALL SELECT 'Rookie', 'Nationals', 'Giants', '2026-11-07', '09:00:00', 'Field 3', 'Scheduled'
    UNION ALL SELECT 'Majors', 'Cubs', 'Giants', '2026-11-21', '10:00:00', 'Field 1', 'Scheduled'
    UNION ALL SELECT 'Minors', 'Dodgers', 'Padres', '2026-12-05', '12:00:00', 'Field 2', 'Scheduled'
    UNION ALL SELECT 'Rookie', 'Mariners', 'Nationals', '2026-12-12', '09:00:00', 'Field 3', 'Scheduled'
) AS s
JOIN divisions AS d ON d.name = s.division
JOIN teams AS home_t ON home_t.name = s.home AND home_t.division_id = d.id
JOIN teams AS away_t ON away_t.name = s.away AND away_t.division_id = d.id
JOIN fields AS f ON f.name = s.field
WHERE NOT EXISTS (
    SELECT 1 FROM games AS g
    WHERE g.home_team_id = home_t.id
      AND g.away_team_id = away_t.id
      AND g.game_date = s.game_date
      AND g.game_time = s.game_time
);