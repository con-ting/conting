DROP table ticket;
CREATE TABLE ticket
(
    ticket_id       BIGINT PRIMARY KEY AUTO_INCREMENT,
    price           BIGINT,
    is_used         BOOLEAN,
    owner_id        BIGINT,
    buyer_id        BIGINT,
    schedule_id     BIGINT,
    fingerprint_key TEXT,
    seat_id         Long,
    imp_uid         TEXT,
    row             VARCHAR(255),
    col             VARCHAR(255),
    nft_url         VARCHAR(255),
    status          ENUM ('예매완료', '환불대기', '결제대기', '기한경과', '환불됨'),
    pay_due_date    TIMESTAMP,
    INDEX idx_owner_id (owner_id),
    INDEX idx_buyer_id (buyer_id),
    INDEX idx_owner_id_status (owner_id, status)
);