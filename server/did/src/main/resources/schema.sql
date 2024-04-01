DROP TABLE IF EXISTS did_transfer;

CREATE TABLE did_transfer
(
    did_id                BIGINT PRIMARY KEY,
    schedule_id           BIGINT       NOT NULL,
    owner_id              BIGINT       NOT NULL,
    owner_wallet          VARCHAR(44)  NOT NULL,
    owner_fingerprint_key VARCHAR(255) NOT NULL,
    buyer_id              BIGINT       NOT NULL,
    buyer_wallet          VARCHAR(44)  NOT NULL,
    did_created           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    did_updated           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (owner_id),
    INDEX (buyer_id)
);