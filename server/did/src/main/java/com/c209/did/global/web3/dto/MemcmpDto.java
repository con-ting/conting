package com.c209.did.global.web3.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record MemcmpDto(
        @NotNull Long offset,
        @NotNull String bytes,
        String encoding
) {
}
