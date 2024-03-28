package com.c209.batchservice.global.web3;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "web3")
public record Web3Props(
        String WrapperBaseUrl
) {
}
