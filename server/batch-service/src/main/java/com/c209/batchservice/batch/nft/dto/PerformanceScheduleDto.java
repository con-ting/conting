package com.c209.batchservice.batch.nft.dto;

import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import com.c209.batchservice.domain.catalog.dto.ScheduleDto;

public record PerformanceScheduleDto(
        PerformanceDto performance,
        ScheduleDto schedule
) {
}
