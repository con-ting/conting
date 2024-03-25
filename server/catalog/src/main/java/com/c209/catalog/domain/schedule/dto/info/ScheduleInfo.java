package com.c209.catalog.domain.schedule.dto.info;

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
    private Long showId;
    private Long scheduleId;
    private LocalDateTime startTime;
}
