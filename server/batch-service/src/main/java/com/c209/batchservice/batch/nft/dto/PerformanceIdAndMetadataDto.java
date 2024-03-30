package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record PerformanceIdAndMetadataDto(
        Long performanceId,
        String jsonUrl,
        JsonMetadataDto jsonMetadata
) {
}
