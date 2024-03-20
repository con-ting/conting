ALTER TABLE grade
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO grade (performance_id, grade, price)
    VALUES (1, 'R', 150000),
           (1, 'S', 120000),
           (1, 'A', 100000),
           (2, 'R', 50000),
           (2, 'S', 30000),
           (2, 'A', 20000);