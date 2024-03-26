package com.c209.batchservice.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Props s3Props;
    private final S3Client s3Client;

    public String putImage(String prefix, MultipartFile file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String fileHash = HexFormat.of().formatHex(digest.digest(file.getBytes()));
            String key = prefix + fileHash + ".jpg";

            s3Client.putObject(builder -> builder
                            .bucket(s3Props.bucket())
                            .key(key)
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            return "https://" + s3Props.publicBaseUrl() + "/" + key;
        } catch (IOException | NoSuchAlgorithmException e) {
            throw new RuntimeException();
        }
    }

    public void deleteImage(String image) {
        String key = image.replace("https://" + s3Props.publicBaseUrl() + "/", "");
        s3Client.deleteObject(builder -> builder
                .bucket(s3Props.bucket())
                .key(key)
                .build());
    }

}
