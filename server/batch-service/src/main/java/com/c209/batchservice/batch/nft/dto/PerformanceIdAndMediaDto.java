package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record PerformanceIdAndMediaDto(
        Long performanceId,
        Integer seatCount,
        Integer mediaDuration
) {
}
