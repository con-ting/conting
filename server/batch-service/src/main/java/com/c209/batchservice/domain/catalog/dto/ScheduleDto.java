package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Schedule;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ScheduleDto(
        Long id,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
    public static ScheduleDto of(Schedule schedule) {
        return ScheduleDto.builder()
                .id(schedule.getId())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .build();
    }
}
