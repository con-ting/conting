package com.c209.payment.domain.order.entity;

import com.c209.payment.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "pg_key_index", columnList = "pg_key_index"))
@Builder
@Getter
@Entity
public class Order extends BaseEntity {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "payment_id")
    @Id
    private Long id;

    @Column(name="buyer_id", nullable = false)
    private Long buyerId;

    @Column(name="seat_id")
    private Long seatId;

    @Column(name="schedule_id")
    private Long scheduleId;

    @Column(name="pay_due_date")
    private LocalDateTime payDueDate;

    @Column(name="pg_order_id")
    private String pgOrderId;

    @Column(name="pg_status")
    PGStatus pgStatus;

    @Column(name="pg_key")
    private String pgKey;

    @Column(name="pg_retry_count")
    private String pgRetryCount;

}
