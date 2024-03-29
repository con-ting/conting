package com.c209.batchservice.global.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final S3Props s3Props;
    private final S3Client s3Client;

    public String putMediaIfNotExists(String key, Path path) {
        try {
            s3Client.headObject(builder -> builder
                    .bucket(s3Props.bucket())
                    .key(key)
                    .build());
            return "https://" + s3Props.publicBaseUrl() + "/" + key;
        } catch (NoSuchKeyException e) {
            return putMedia(key, path);
        }
    }

    public String putMedia(String key, Path path) {
        s3Client.putObject(builder -> builder
                        .bucket(s3Props.bucket())
                        .key(key)
                        .build(),
                path);
        return "https://" + s3Props.publicBaseUrl() + "/" + key;
    }
}
