package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record MediaDto(
        Long performanceId,
        Integer seatCount,
        Integer duration
) {
}
