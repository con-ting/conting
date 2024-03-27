package com.c209.batchservice.batch.nft.dto;

import java.util.List;

public record JsonMetadata(
        String name,
        String description,
        String image,
        List<Property> properties
) {
    public record Property(
            List<File> files,
            String category
    ) {
        public record File(
                String uri,
                String type
        ) {
        }
    }
}
