package com.c209.did.domain.didtransfer.data.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record DidResponse(
        Long ownerId,
        Long buyerId,
        String ownerWallet,
        String buyerWallet
) {
}
