package com.c209.did.global.web3;

import com.c209.did.global.web3.dto.MemcmpDto;
import com.c209.did.global.web3.dto.request.RpcRequest;
import com.c209.did.global.web3.dto.response.RpcGetProgramAccountsResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class Web3Service {
    private final Web3Props web3Props;
    private final RestClient restClient;

    @Bean
    static public RestClient restClient(Web3Props web3Props) {
        return RestClient.create(web3Props.rpcEndpoint());
    }

    public RpcGetProgramAccountsResultResponse getProgramAccountsResult(
            MemcmpDto... memcmpDtoList
    ) {
        RpcRequest rpcRequest = RpcRequest.builder()
                .jsonrpc("2.0")
                .id(1L)
                .method("getProgramAccounts")
                .params(List.of(
                        web3Props.didProgramId(),
                        Map.of("filters", Arrays.stream(memcmpDtoList)
                                .map(memcmpDto -> Map.of("memcmp", memcmpDto))
                                .toList())
                ))
                .build();

        return restClient.post()
                .uri("/")
                .contentType(MediaType.APPLICATION_JSON)
                .body(rpcRequest)
                .retrieve()
                .body(RpcGetProgramAccountsResultResponse.class);
    }
}
