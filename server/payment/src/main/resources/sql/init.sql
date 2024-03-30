
CREATE TABLE `order_history` (
                         `order_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
                         `buyer_id` BIGINT NOT NULL,
                         `seat_id` BIGINT,
                         `schedule_id` BIGINT,
                         `pay_due_date` DATETIME,
                         `pg_order_id` VARCHAR(255),
                         `pg_status` VARCHAR(255),
                         `pg_key` VARCHAR(255),
                         `pg_retry_count` VARCHAR(255)
);

CREATE INDEX `pg_key_index` ON `order_history` (`pg_key`);
CREATE INDEX `pg_order_id_index` ON `order_history` (`pg_order_id`);
