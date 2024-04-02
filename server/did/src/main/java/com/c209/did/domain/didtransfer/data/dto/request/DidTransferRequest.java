package com.c209.did.domain.didtransfer.data.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record DidTransferRequest(
        @NotNull Long performanceId,
        @NotNull Long ownerId,
        @NotNull Long buyerId,
        @NotNull String ownerWallet,
        @NotNull String buyerWallet,
        @NotNull String ownerFingerprintKey
) {
}
