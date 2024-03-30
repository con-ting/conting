package com.c209.batchservice.domain.seat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Builder
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
public class Seat {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "seat_id")
    @Id
    private Long id;
    private Long scheduleId;
    private String row;
    private String col;
    private String grade;
    private Integer gradePrice;
    private String nftUrl;
    private String sector;
}
