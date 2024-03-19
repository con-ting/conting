package com.c209.catalog.domain.schedule.entity;

import com.c209.catalog.domain.show.entity.Show;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

public class Schedule extends BaseEntity {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="schedule_id")
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "show_id")
    private Show show;

    @Column
    private LocalDateTime start_time;

    @Column
    private LocalDateTime end_time;
}
