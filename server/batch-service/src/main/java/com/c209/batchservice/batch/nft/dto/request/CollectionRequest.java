package com.c209.batchservice.batch.nft.dto.request;

import lombok.Builder;

@Builder
public record CollectionRequest(
        String name,
        String symbol,
        String uri,
        int sellerFeeBasisPoints,
        String agency,
        String singer
) {
}
