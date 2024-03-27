package com.c209.catalog.domain.hall.entity;

import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class HallSeat extends BaseEntity {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name = "hall_seat_id")
    @Id
    private Long id;

    @JoinColumn(name = "grade_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private HallGrade hallGrade;

    @JoinColumn(name = "hall_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Hall hall;

    @Column
    private Integer column;

    @Column
    private Integer row;
}
