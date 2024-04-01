package com.c209.did.global.web3.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record RpcRequest(
        @NotNull String jsonrpc,
        @NotNull Long id,
        @NotNull String method,
        List<Object> params
) {
}
