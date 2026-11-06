-- FOXTROT-151: Assign the fictional sample players to teams.
-- Run after the player and team seeds. Local development/testing only.

UPDATE players AS p
JOIN `user` AS parent ON parent.id = p.parent_id
SET p.team_id = (
    SELECT MIN(t.id)
    FROM teams AS t
    WHERE t.division_id = p.division_id
)
WHERE p.team_id IS NULL
  AND parent.email IN ('parent1@example.invalid', 'parent2@example.invalid');
