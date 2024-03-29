package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record PerformanceAndMediaDto(
        Long performanceId,
        Integer seatCount,
        Integer mediaDuration
) {
}
