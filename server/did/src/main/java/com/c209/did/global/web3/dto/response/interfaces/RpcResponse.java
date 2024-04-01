package com.c209.did.global.web3.dto.response.interfaces;

public interface RpcResponse {
    String jsonrpc();

    Object result();

    Long id();
}
