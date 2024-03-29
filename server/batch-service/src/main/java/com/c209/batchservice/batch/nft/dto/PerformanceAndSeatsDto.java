package com.c209.batchservice.batch.nft.dto;

import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import com.c209.batchservice.domain.seat.dto.SeatDto;
import lombok.Builder;

import java.util.List;

@Builder
public record PerformanceAndSeatsDto(
        PerformanceDto performance,
        List<SeatDto> seats
) {
}
