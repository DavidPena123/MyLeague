
-- FOXTROT-150: Add sample teams

-- Sample teams. Majors and Rookie use team names from the league's
-- Sample managers and coaches
INSERT INTO `user` (email, password_hash, first_name, last_name, role, is_active)
SELECT s.email, 'TEST_ONLY_NO_LOGIN', s.first_name, s.last_name, s.role, FALSE
FROM (
    SELECT 'manager1@example.invalid' AS email, 'Alex' AS first_name, 'Rivera' AS last_name, 'MANAGER' AS role
    UNION ALL SELECT 'manager2@example.invalid', 'Jamie', 'Chen', 'MANAGER'
    UNION ALL SELECT 'manager3@example.invalid', 'Morgan', 'Patel', 'MANAGER'
    UNION ALL SELECT 'manager4@example.invalid', 'Casey', 'Brooks', 'MANAGER'
    UNION ALL SELECT 'coach1@example.invalid', 'Chris', 'Delgado', 'COACH'
    UNION ALL SELECT 'coach2@example.invalid', 'Dana', 'Kim', 'COACH'
    UNION ALL SELECT 'coach3@example.invalid', 'Robin', 'Alvarez', 'COACH'
) AS s
WHERE NOT EXISTS (
    SELECT 1 FROM `user` AS u WHERE u.email = s.email
);


-- NULL coach means the team has no coach yet.
INSERT INTO teams (name, division_id, manager_id, coach_id)
SELECT s.team, d.id, m.id, c.id
FROM (
    SELECT 'Athletics' AS team, 'Majors' AS division, 'manager1@example.invalid' AS manager, 'coach1@example.invalid' AS coach
    UNION ALL SELECT 'Cubs', 'Majors', 'manager2@example.invalid', 'coach2@example.invalid'
    UNION ALL SELECT 'Giants', 'Majors', 'manager3@example.invalid', NULL
    UNION ALL SELECT 'White Sox', 'Majors', 'manager4@example.invalid', 'coach3@example.invalid'
    UNION ALL SELECT 'Nationals', 'Rookie', 'manager1@example.invalid', NULL
    UNION ALL SELECT 'Giants', 'Rookie', 'manager2@example.invalid', 'coach1@example.invalid'
    UNION ALL SELECT 'Mariners', 'Rookie', 'manager3@example.invalid', NULL
    UNION ALL SELECT 'Dodgers', 'Minors', 'manager4@example.invalid', 'coach2@example.invalid'
    UNION ALL SELECT 'Padres', 'Minors', 'manager1@example.invalid', 'coach3@example.invalid'
) AS s
JOIN divisions AS d ON d.name = s.division
JOIN `user` AS m ON m.email = s.manager
LEFT JOIN `user` AS c ON c.email = s.coach
WHERE NOT EXISTS (
    SELECT 1 FROM teams AS t
    WHERE t.name = s.team AND t.division_id = d.id
);
