USE tracy_babe_ruth;

-- Adding announcements

--   will run after previous announcements
INSERT INTO `user` (email, password_hash, first_name, last_name, role, is_active)
SELECT 'official1@example.invalid', 'TEST_ONLY_NO_LOGIN', 'Pat', 'Official', 'OFFICIAL', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM `user` WHERE email = 'official1@example.invalid'
);


--placeholder just for demonstration when completed
INSERT INTO announcements (title, message, created_at, author_id)
SELECT s.title, s.message, s.created_at, u.id
FROM (
    SELECT 'Spring Registration Is Open' AS title,
           'Registration for the spring season is now open. Sign up through the parent dashboard before the deadline.' AS message,
           NOW() - INTERVAL 2 DAY AS created_at
    UNION ALL
    SELECT 'Volunteers Needed for Opening Day',
           'We need help with setup, the snack bar and parking on Opening Day. Sign up to volunteer from your dashboard.',
           NOW() - INTERVAL 7 DAY
    UNION ALL
    SELECT 'Field Maintenance This Weekend',
           'Legacy Fields will be closed Saturday morning for maintenance. Call the Fields Hotline for updates.',
           NOW() - INTERVAL 14 DAY
) AS s
JOIN `user` AS u ON u.email = 'official1@example.invalid'
WHERE NOT EXISTS (
    SELECT 1 FROM announcements AS a WHERE a.title = s.title
);
