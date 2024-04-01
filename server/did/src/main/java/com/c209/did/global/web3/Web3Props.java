package com.c209.did.global.web3;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "web3")
public record Web3Props(
        String rpcEndpoint,
        String didProgramId
) {
}
