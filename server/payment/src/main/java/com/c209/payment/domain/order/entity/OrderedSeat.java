package com.c209.payment.domain.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Table(name="ordered_seat")
@Builder
@Getter
@Entity
public class OrderedSeat {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ordered_seat_id")
    @Id
    private Long id;

    @Column(name="seat_id")
    private Long seatId;

    @ManyToOne(fetch= LAZY, optional=false)
    @JoinColumn(name="order_history_id", nullable = false)
    private Order order;

}
