package com.c209.batchservice.batch.nft.dto.request;

public record AssetRequest(
        String name,
        String symbol,
        String uri,
        int sellerFeeBasisPoints,
        String agency,
        String singer,
        String collectionMint
) {
}
