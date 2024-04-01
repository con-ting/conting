package com.c209.did.domain.didtransfer.data.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record DidTransferRequest(
        @NotNull Long scheduleId,
        @NotNull Long ownerId,
        @NotNull String ownerWallet,
        @NotNull String ownerFingerprintKey,
        @NotNull Long buyerId,
        @NotNull String buyerWallet
) {
}
