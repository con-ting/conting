CREATE TABLE ticket (
    ticket_id BIGINT PRIMARY KEY,
    is_used BOOLEAN,
    owner_id BIGINT,
    buyer_id BIGINT,
    schedule_id BIGINT,
    fingerprint_key BIGINT,
    order_id BIGINT,
    row VARCHAR(255),
    col VARCHAR(255),
    nft_url VARCHAR(255),
    INDEX idx_owner_id (owner_id),
    INDEX idx_buyer_id (buyer_id)
);
