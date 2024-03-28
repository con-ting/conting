/**
 * This code was COPIED from "com.c209.seat" package.
 */
package com.c209.batchservice.domain.seat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import static jakarta.persistence.GenerationType.IDENTITY;

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
