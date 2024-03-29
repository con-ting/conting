package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Schedule;
import lombok.Builder;

@Builder
public record ScheduleDto(
        Long id,
        String startTime,
        String endTime,
        PerformanceDto performance
) {
    public static ScheduleDto of(Schedule schedule) {
        return ScheduleDto.builder()
                .id(schedule.getId())
                .startTime(schedule.getStartTime().toString())
                .endTime(schedule.getEndTime().toString())
                .performance(PerformanceDto.of(schedule.getPerformance()))
                .build();
    }
}
