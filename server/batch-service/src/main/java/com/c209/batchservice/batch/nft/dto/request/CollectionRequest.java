package com.c209.batchservice.batch.nft.dto.request;

public record CollectionRequest(
        String name,
        String uri,
        int sellerFeeBasisPoints,
        String agency,
        String singer
) {
}
