USE tracy_babe_ruth;

-- 179: Test for the announcements



-- announcementscome back newest first
SELECT a.id, a.title, a.created_at,
       CONCAT(u.first_name, ' ', u.last_name) AS author
FROM announcements AS a
LEFT JOIN `user` AS u ON u.id = a.author_id
ORDER BY a.created_at DESC;

-- the date is filled in automatically.
START TRANSACTION;

INSERT INTO announcements (title, message, author_id)
SELECT 'Test: automatic date', 'This row is removed at the end of the test.', id
FROM `user` WHERE email = 'official1@example.invalid';

SELECT title, created_at, created_at IS NOT NULL AS date_was_filled
FROM announcements
WHERE title = 'Test: automatic date';

ROLLBACK;


--  every announcement has an author who is a real user.
SELECT COUNT(*) AS announcements_without_valid_author
FROM announcements AS a
LEFT JOIN `user` AS u ON u.id = a.author_id
WHERE u.id IS NULL;
