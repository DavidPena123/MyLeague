-- FOXTROT-134: Add test players

-- Creates two disabled test parent accounts if missing
-- Inserts five fictional players across two divisions
-- Local development/testing only

INSERT INTO `user` (
    email, password_hash, first_name,
    last_name, role, is_active
)
SELECT
    'parent1@example.invalid', 'TEST_ONLY_NO_LOGIN',
    'Jordan', 'Sample', 'PARENT', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM `user`
    WHERE email = 'parent1@example.invalid'
);

INSERT INTO `user` (
    email, password_hash, first_name,
    last_name, role, is_active
)
SELECT
    'parent2@example.invalid', 'TEST_ONLY_NO_LOGIN',
    'Taylor', 'Sample', 'PARENT', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM `user`
    WHERE email = 'parent2@example.invalid'
);


SET @parent_one_id = (
    SELECT id FROM `user`
    WHERE email = 'parent1@example.invalid'
);

SET @parent_two_id = (
    SELECT id FROM `user`
    WHERE email = 'parent2@example.invalid'
);


-- Insert five fictional players without duplicates

INSERT INTO players (
    first_name,
    last_name,
    date_of_birth,
    division_id,
    parent_id,
    team_id,
    uniform_size
)
SELECT
    s.first_name,
    s.last_name,
    s.date_of_birth,
    d.id,
    u.id,
    NULL,
    s.uniform_size
FROM (
    SELECT 'Alex' AS first_name, 'Sample' AS last_name,
           '2018-05-12' AS date_of_birth, 'Rookie' AS division_name,
           @parent_one_id AS parent_id, 'YM' AS uniform_size
    UNION ALL
    SELECT 'Emma', 'Sample', '2019-03-20', 'Rookie', @parent_one_id, 'YS'
    UNION ALL
    SELECT 'Noah', 'Sample', '2016-07-15', 'Minors', @parent_two_id, 'YL'
    UNION ALL
    SELECT 'Olivia', 'Sample', '2017-09-08', 'Minors', @parent_two_id, 'YM'
    UNION ALL
    SELECT 'Liam', 'Sample', '2018-11-22', 'Rookie', @parent_one_id, 'YM'
) AS s
JOIN divisions AS d ON d.name = s.division_name
JOIN `user` AS u ON u.id = s.parent_id AND u.role = 'PARENT'
WHERE NOT EXISTS (
    SELECT 1
    FROM players AS p
    WHERE p.first_name = s.first_name
      AND p.last_name = s.last_name
      AND p.date_of_birth = s.date_of_birth
      AND p.parent_id = u.id
);
