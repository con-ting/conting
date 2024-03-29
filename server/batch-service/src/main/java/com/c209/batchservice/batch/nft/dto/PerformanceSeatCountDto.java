package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record PerformanceSeatCountDto(
        Long performanceId,
        Long seatCount
) {
}
