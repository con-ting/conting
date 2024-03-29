package com.c209.batchservice.global.web3;

import com.c209.batchservice.batch.nft.dto.request.AssetRequest;
import com.c209.batchservice.batch.nft.dto.request.CollectionRequest;
import com.c209.batchservice.batch.nft.dto.response.AssetResponse;
import com.c209.batchservice.batch.nft.dto.response.CollectionResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class Web3Service {
    private final RestClient restClient;

    public Web3Service(Web3Props web3Props) {
        this.restClient = RestClient.create(web3Props.wrapperBaseUrl());
    }

    public CollectionResponse createCollection(CollectionRequest collectionRequest) {
        return restClient.post()
                .uri("/collections")
                .contentType(MediaType.APPLICATION_JSON)
                .body(collectionRequest)
                .retrieve()
                .body(CollectionResponse.class);
    }

    public AssetResponse createAsset(AssetRequest assetRequest) {
        return restClient.post()
                .uri("/nfts")
                .contentType(MediaType.APPLICATION_JSON)
                .body(assetRequest)
                .retrieve()
                .body(AssetResponse.class);
    }

    public boolean verifyAsset(String collectionMint, String mint) {
        return restClient.post()
                .uri("/collections/{collectionMint}/verify/{mint}", collectionMint, mint)
                .retrieve()
                .toBodilessEntity()
                .getStatusCode()
                .is2xxSuccessful();
    }

    public boolean transferAsset(String mint, String newOwner) {
        return restClient.post()
                .uri("/nfts/{mint}/transfer/{newOwner}", mint, newOwner)
                .retrieve()
                .toBodilessEntity()
                .getStatusCode()
                .is2xxSuccessful();
    }
}
