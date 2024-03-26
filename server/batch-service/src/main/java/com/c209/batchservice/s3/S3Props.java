package com.c209.batchservice.s3;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "s3")
public record S3Props(
        String accessKeyId,
        String secretAccessKey,
        String region,
        String bucket,
        String endpoint,
        String publicBaseUrl
) {
}
