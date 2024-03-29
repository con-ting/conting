package com.c209.payment.domain.order.entity;

import com.c209.payment.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.c209.payment.domain.order.entity.PGStatus.CAPTURE_RETRY;
import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Table(name="order_history",
        indexes = {@Index(name = "pg_key_index", columnList = "pg_key"),
        @Index(name = "pg_order_id_index", columnList = "pg_order_id")
})
@Builder
@Getter
@Entity
@Setter
public class Order extends BaseEntity {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "order_id")
    @Id
    private Long id;

    @Column(name="buyer_id", nullable = false)
    private Long buyerId;

    @Column(name="amount")
    private Integer amount;

    @Column(name="schedule_id")
    private Long scheduleId;

    @Column(name="pay_due_date")
    private LocalDateTime payDueDate;


    //imp_uid
    @Column(name="pg_order_id")
    private String pgOrderId;

    //merchant_id
    @Column(name="merchant_uid")
    private String merchantUid;

    @Column(name="pg_status")
    PGStatus pgStatus;


    @Column(name="pg_retry_count")
    private Integer pgRetryCount;

    public void increaseRetryCount() {

        if (pgStatus == CAPTURE_RETRY) {
            this.pgRetryCount++;
        }


    }

}
