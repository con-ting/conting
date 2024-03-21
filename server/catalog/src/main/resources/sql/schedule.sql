ALTER TABLE schedule
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO schedule (performance_id, start_time, end_time)
    VALUES (1,	'2024.03.09.18:00',	'2024.03.09.20:30'),
           (1,	'2024.03.10.17:00',	'2024.03.10.19:30'),
           (2,	'2024.05.01.11:00',	'2024.05.01.12:00'),
           (2,	'2024.05.01.14:00',	'2024.05.01.15:00'),
           (2,	'2024.05.02.11:00',	'2024.05.02.12:00'),
           (2,	'2024.05.02.15:00',	'2024.05.02.16:00'),
           (2,	'2024.05.03.11:00',	'2024.05.03.12:00'),
           (2,	'2024.05.03.15:00',	'2024.05.03.16:00');