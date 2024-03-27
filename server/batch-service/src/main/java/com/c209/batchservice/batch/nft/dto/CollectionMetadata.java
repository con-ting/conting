package com.c209.batchservice.batch.nft.dto;

public record CollectionMetadata(
        String name,
        String uri,
        int sellerFeeBasisPoints,
        String agency,
        String singer
) {
}
