package com.c209.batchservice.batch.nft.dto;

import lombok.Builder;

@Builder
public record SeatIdAndMintDto(
        Long seatId,
        Long performanceId,
        String collectionMint,
        String mint
) {
}
