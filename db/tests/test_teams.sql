-- FOXTROT-147 / FOXTROT-151: A test to check for the teams table.
USE tracy_babe_ruth;

-- sample teams are retrieved with their division, manager and coach names.
SELECT t.id, t.name AS team, d.name AS division,
       CONCAT(m.first_name, ' ', m.last_name) AS manager,
       CONCAT(c.first_name, ' ', c.last_name) AS coach
FROM teams AS t
JOIN divisions AS d ON d.id = t.division_id
JOIN `user` AS m ON m.id = t.manager_id
LEFT JOIN `user` AS c ON c.id = t.coach_id
ORDER BY d.name, t.name;

-- Test 2: players.team_id points to a team.
SELECT CONCAT(p.first_name, ' ', p.last_name) AS player,
       d.name AS player_division,
       t.name AS team, td.name AS team_division
FROM players AS p
LEFT JOIN divisions AS d ON d.id = p.division_id
LEFT JOIN teams AS t ON t.id = p.team_id
LEFT JOIN divisions AS td ON td.id = t.division_id
ORDER BY player;

-- Test 3: make sure no player is on a team from a different division.
SELECT COUNT(*) AS players_on_wrong_division_team
FROM players AS p
JOIN teams AS t ON t.id = p.team_id
WHERE t.division_id <> p.division_id;

-- Test 4: every manager on a team has the right role.

SELECT COUNT(*) AS staff_with_wrong_role
FROM teams AS t
JOIN `user` AS m ON m.id = t.manager_id
LEFT JOIN `user` AS c ON c.id = t.coach_id
WHERE m.role <> 'MANAGER'
   OR (c.id IS NOT NULL AND c.role <> 'COACH');


