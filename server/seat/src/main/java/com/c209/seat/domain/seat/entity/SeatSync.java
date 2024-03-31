package com.c209.seat.domain.seat.entity;


import com.c209.seat.domain.seat.entity.enums.Grade;
import com.c209.seat.domain.seat.entity.enums.Sector;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Table(name="seat")
@Builder
@Getter
@Entity
@Setter
public class SeatSync {

    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "seat_id")
    @Id
    private Long id;

    @Column(name="schedule_id")
    private Long scheduleId;

    @Column(name="is_available")
    private Boolean isAvailable;


    @Column
    private String row;

    @Column
    private String col;

    @Column
    private String grade;

    @Column(name="grade_price")
    private Integer gradePrice;

    @Column(name="nft_url")
    private String ntfUrl;

    @Column
    private Sector sector;

}
