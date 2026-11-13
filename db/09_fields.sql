USE tracy_babe_ruth;

CREATE TABLE IF NOT EXISTS fields (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO fields (name)
SELECT s.name
FROM (
    SELECT 'Field 1' AS name
    UNION ALL SELECT 'Field 2'
    UNION ALL SELECT 'Field 3'
    UNION ALL SELECT 'Field 4'
    UNION ALL SELECT 'Field 5'
) AS s
WHERE NOT EXISTS (
    SELECT 1 FROM fields AS f WHERE f.name = s.name
);
