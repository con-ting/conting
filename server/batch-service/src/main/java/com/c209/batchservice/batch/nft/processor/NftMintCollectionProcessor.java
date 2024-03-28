package com.c209.batchservice.batch.nft.processor;

import com.c209.batchservice.batch.nft.dto.request.AssetRequest;
import org.springframework.batch.item.ItemProcessor;

public class NftMintCollectionProcessor implements ItemProcessor<AssetRequest, String> {

    @Override
    public String process(final AssetRequest assetRequest) {
        return null;
    }
}
