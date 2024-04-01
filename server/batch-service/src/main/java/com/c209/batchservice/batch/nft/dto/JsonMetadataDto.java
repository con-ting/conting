package com.c209.batchservice.batch.nft.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record JsonMetadataDto(
        String name,
        String symbol,
        String description,
        Integer sellerFeeBasisPoints,
        String image,
        String animationUrl,
        String externalUrl,
        List<Attribute> attributes,
        List<Property> properties
) {
    @Builder
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record Attribute(
            String traitType,
            String value
    ) {
    }

    @Builder
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record Property(
            List<File> files,
            String category
    ) {
        @Builder
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public record File(
                String uri,
                String type
        ) {
        }
    }
}
