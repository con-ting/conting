package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record PerformanceIdAndCollectionMintDto(
        Long performanceId,
        String collectionMint
) {
}
