package com.c209.payment.domain.order.entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

import static com.c209.payment.domain.order.entity.PGStatus.CAPTURE_RETRY;

@Table("order_history")
@AllArgsConstructor
@Getter
@Setter
public class OrderAsync {

    @Id
    private Long orderId;
    private Long buyerId;
    private Long seatId;
    private Long scheduleId;
    private LocalDateTime payDueDate;
    private String pgOrderId;
    private PGStatus pgStatus;
    private String pgKey;
    private Integer pgRetryCount;
    private Integer amount;

    public void increaseRetryCount() {

        if (pgStatus == CAPTURE_RETRY) {
            this.pgRetryCount++;
        }


    }
}
