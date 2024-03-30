package com.c209.batchservice.batch.nft.dto;

import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import lombok.Builder;

@Builder
public record PerformanceAndMetadataDto(
        PerformanceDto performance,
        String jsonUrl,
        JsonMetadataDto jsonMetadata
) {
}
