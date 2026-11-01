-- FOXTROT-134: Add test players
-- Wait until two test parent accounts exist before running.

-- TODO: Set these to two valid users.id values.
-- SET @parent_one_id = ...;
-- SET @parent_two_id = ...;
/*
INSERT INTO players (
    first_name,
    last_name,
    date_of_birth,
    division_id,
    parent_id,
    team_id,
    uniform_size
)
VALUES
    ('Alex', 'Sample', '2018-05-12', 2, @parent_one_id, NULL, 'YM'),
    ('Emma', 'Sample', '2019-03-20', 2, @parent_one_id, NULL, 'YS'),
    ('Noah', 'Sample', '2016-07-15', 3, @parent_two_id, NULL, 'YL'),
    ('Olivia', 'Sample', '2017-09-08', 3, @parent_two_id, NULL, 'YM'),
    ('Liam', 'Sample', '2018-11-22', 2, @parent_one_id, NULL, 'YM');

*/