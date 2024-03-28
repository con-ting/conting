package com.c209.batchservice.batch.nft.dto;

import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import com.c209.batchservice.domain.catalog.dto.ScheduleDto;
import com.c209.batchservice.domain.seat.dto.SeatDto;

public record PerformanceScheduleSeatDto(
        PerformanceDto performance,
        ScheduleDto schedule,
        SeatDto seat
) {
}
