package com.c209.did.domain.didtransfer.data.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record DidTransferV2Request(
        @NotNull Long performanceId,
        @NotNull Long ownerId,
        @NotNull String ownerWallet,
        @NotNull String ownerFingerprintKey,
        @NotNull List<Family> families
) {
    public record Family(
            @NotNull Long id,
            @NotNull String wallet
    ) {
    }
}
