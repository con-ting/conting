package com.c209.batchservice.batch.nft.processor;

import com.c209.batchservice.batch.nft.dto.AssetMetadata;
import org.springframework.batch.item.ItemProcessor;

public class NftUploadMediaProcessor implements ItemProcessor<AssetMetadata, String> {

    @Override
    public String process(final AssetMetadata assetMetadata) {
        return null;
    }
}
