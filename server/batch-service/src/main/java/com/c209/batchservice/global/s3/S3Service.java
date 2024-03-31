package com.c209.batchservice.global.s3;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.util.HexFormat;

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
            return s3Props.publicBaseUrl() + "/" + key;
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
        return s3Props.publicBaseUrl() + "/" + key;
    }

    @SneakyThrows
    public String calculateSha256(Path path) {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        try (InputStream is = Files.newInputStream(path)) {
            byte[] buffer = new byte[8192];
            int read;
            while ((read = is.read(buffer)) != -1) {
                digest.update(buffer, 0, read);
            }
        }
        return HexFormat.of().formatHex(digest.digest());
    }
}
