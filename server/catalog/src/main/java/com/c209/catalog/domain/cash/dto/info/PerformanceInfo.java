package com.c209.catalog.domain.cash.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PerformanceInfo {
    private Long performance_id;
    private String title;
    private String poster_image;
    private String description_image;
    private Long hall_id;
    private LocalDateTime reservation_start_datetime;
    private LocalDateTime reservation_end_datetime;
    private Date start_date;
    private Date end_date;
}
