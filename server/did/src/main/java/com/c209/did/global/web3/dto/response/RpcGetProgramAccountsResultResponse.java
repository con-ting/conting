package com.c209.did.global.web3.dto.response;

import com.c209.did.global.web3.dto.response.interfaces.RpcResponse;

import java.math.BigInteger;
import java.util.List;

public record RpcGetProgramAccountsResultResponse(
        String jsonrpc,
        List<ResultItem> result,
        Long id
) implements RpcResponse {
    public record ResultItem(
            Account account,
            String pubkey
    ) {
        public record Account(
                String data,
                Boolean executable,
                Long lamports,
                String owner,
                BigInteger rentEpoch,
                Long space
        ) {
        }
    }
}
