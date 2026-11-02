CREATE TABLE IF NOT EXISTS divisions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Sample divisions for Tracy Babe Ruth
-- Names are pending client confirmation

INSERT INTO divisions (name)
SELECT sample.name
FROM (
    SELECT 'Instructional' AS name
    UNION ALL SELECT 'Rookie'
    UNION ALL SELECT 'Minors'
    UNION ALL SELECT 'Majors'
    UNION ALL SELECT 'Intermediate 50/70'
    UNION ALL SELECT 'Juniors'
) AS sample
WHERE NOT EXISTS (
    SELECT 1
    FROM divisions AS d
    WHERE d.name = sample.name
);
