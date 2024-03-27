/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
public class Schedule {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "schedule_id")
    @Id
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
