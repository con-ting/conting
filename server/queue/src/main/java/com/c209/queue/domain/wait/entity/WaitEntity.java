package com.c209.queue.domain.wait.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(indexes = {
        @Index(name="user_id_index", columnList = "user_id"),
        @Index(name="schedule_id_index", columnList = "schedule_id"),
        @Index(name="schedule_id_user_id_multi_index", columnList = "schedule_id, user_id")
})
@Getter
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
@ToString
public class WaitEntity {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="wait_id")
    private Long id;


    @Column(name="user_id", nullable = false)
    private Long userId;


    @Column(name="schedule_id", nullable = false)
    private Long scheduleId;

    @Column(name="payment_due_date")
    private LocalDateTime paymentDueDate;


    @Enumerated(EnumType.STRING)
    private StatusType status;

}
