package com.c209.user.global.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties(prefix = "jwt")
public record JwtProps(
        String accessKey,
        Duration accessExpiration,
        String refreshKey,
        Duration refreshExpiration
) {
}