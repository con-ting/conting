package com.c209.batchservice.batch.nft.dto;

public record AssetMetadata(
        String name,
        String uri,
        int sellerFeeBasisPoints,
        String agency,
        String singer,
        String collectionMint
) {
}
