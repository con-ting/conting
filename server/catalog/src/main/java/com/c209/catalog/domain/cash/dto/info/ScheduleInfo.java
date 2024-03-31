package com.c209.catalog.domain.cash.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ScheduleInfo {
    private Long schedule_id;
    private Long performance_id;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
}
