package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.*;
import com.c209.batchservice.global.s3.S3Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NftMetadataConfig {
    private static final String NFT_METADATA_DIR = NftBatchConfig.NFT_DIR + "/jsonMetadata";
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final S3Service s3Service;
    private final ObjectMapper objectMapper;

    @Bean
    public Step collectionMetadataStep() {
        return new StepBuilder("collectionMetadataStep", jobRepository)
                .<PerformanceAndSeatsDto, PerformanceIdAndMetadataDto>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(PerformanceAndSeatsDto.class))
                .processor(collectionMetadataProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(PerformanceIdAndMetadataDto.class))
                .build();
    }

    @Bean
    public ItemProcessor<PerformanceAndSeatsDto, PerformanceIdAndMetadataDto> collectionMetadataProcessor() {
        return dto -> {
            JsonMetadataDto jsonMetadata = JsonMetadataDto.builder()
                    .name(dto.performance().title())
                    .symbol("CONTING")
                    .description(dto.performance().description())
                    .sellerFeeBasisPoints(750)
                    .image(dto.performance().posterImage())
                    .externalUrl(dto.performance().videoUrl())
                    .attributes(List.of(
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Location")
                                    .value(dto.performance().hall().name())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("StartDate")
                                    .value(dto.performance().startDate())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("EndDate")
                                    .value(dto.performance().endDate())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Total")
                                    .value(String.valueOf(dto.seats().size()))
                                    .build()
                    ))
                    .properties(List.of(
                            JsonMetadataDto.Property.builder()
                                    .files(List.of(
                                            JsonMetadataDto.Property.File.builder()
                                                    .uri(dto.performance().posterImage())
                                                    .type("image/jpeg")
                                                    .build()
                                    ))
                                    .category("image")
                                    .build()
                    ))
                    .build();
            String jsonUrl = uploadMetadata(jsonMetadata, dto.performance().id(), 0L);
            return PerformanceIdAndMetadataDto.builder()
                    .performanceId(dto.performance().id())
                    .jsonUrl(jsonUrl)
                    .jsonMetadata(jsonMetadata)
                    .build();
        };
    }

    @Bean
    public Step assetMetadataStep() {
        return new StepBuilder("assetMetadataStep", jobRepository)
                .<SeatAndScheduleAndMediaDto, SeatAndScheduleAndMetadataDto>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(SeatAndScheduleAndMediaDto.class))
                .processor(assetMetadataProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(SeatAndScheduleAndMetadataDto.class))
                .build();
    }

    @Bean
    public ItemProcessor<SeatAndScheduleAndMediaDto, SeatAndScheduleAndMetadataDto> assetMetadataProcessor() {
        AtomicInteger counter = new AtomicInteger(1);
        return dto -> {
            int count = counter.getAndIncrement();
            JsonMetadataDto jsonMetadata = JsonMetadataDto.builder()
                    .name(dto.schedule().performance().title() + " #" + count)
                    .symbol("CONTING")
                    .description(dto.schedule().performance().description())
                    .sellerFeeBasisPoints(750)
                    .image(dto.mediaUrl())
                    .externalUrl(dto.schedule().performance().videoUrl())
                    .attributes(List.of(
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Location")
                                    .value(dto.schedule().performance().hall().name())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("StartDate")
                                    .value(dto.schedule().performance().startDate())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("EndDate")
                                    .value(dto.schedule().performance().endDate())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("StartTime")
                                    .value(dto.schedule().startTime())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("EndTime")
                                    .value(dto.schedule().endTime())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Sector")
                                    .value(dto.seat().sector())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Row")
                                    .value(dto.seat().row())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Col")
                                    .value(dto.seat().col())
                                    .build(),
                            JsonMetadataDto.Attribute.builder()
                                    .traitType("Grade")
                                    .value(dto.seat().grade())
                                    .build()
                    ))
                    .properties(List.of(
                            JsonMetadataDto.Property.builder()
                                    .files(List.of(
                                            JsonMetadataDto.Property.File.builder()
                                                    .uri(dto.mediaUrl())
                                                    .type("video/webm")
                                                    .build(),
                                            JsonMetadataDto.Property.File.builder()
                                                    .uri(dto.thumbUrl())
                                                    .type("image/jpeg")
                                                    .build(),
                                            JsonMetadataDto.Property.File.builder()
                                                    .uri(dto.schedule().performance().posterImage())
                                                    .type("image/jpeg")
                                                    .build()
                                    ))
                                    .category("image")
                                    .build()
                    ))
                    .build();
            String jsonUrl = uploadMetadata(jsonMetadata, dto.schedule().performance().id(), dto.seat().id());
            return SeatAndScheduleAndMetadataDto.builder()
                    .seat(dto.seat())
                    .schedule(dto.schedule())
                    .jsonUrl(jsonUrl)
                    .jsonMetadata(jsonMetadata)
                    .build();
        };
    }

    private String uploadMetadata(JsonMetadataDto jsonMetadata, Long performanceId, Long seatId) throws IOException {
        Path path = Path.of(NFT_METADATA_DIR, performanceId.toString(), seatId + ".json");
        Files.createDirectories(path.getParent());
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(path.toFile(), jsonMetadata);
        String hash = s3Service.calculateSha256(path);
        String key = performanceId + "/" + seatId + "/" + hash + ".json";
        return s3Service.putMediaIfNotExists(key, path);
    }
}
