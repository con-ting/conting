package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.SeatAndScheduleAndMediaDto;
import com.c209.batchservice.batch.nft.dto.request.JsonMetadataRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NftMetadataConfig {
    private static final String METADATA_DIR = NftBatchConfig.BASE_DIR + "/metadata";
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;

    /**
     * TODO: DO NOT USE THIS STEP
     */
    @Bean
    public Step collectionMetadataStep() {
        return null;
    }

    @Bean
    public Step assetMetadataStep() {
        return new StepBuilder("assetMetadataStep", jobRepository)
                .<SeatAndScheduleAndMediaDto, JsonMetadataRequest>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(SeatAndScheduleAndMediaDto.class))
                .processor(assetMetadataProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(JsonMetadataRequest.class))
                .build();
    }

    /**
     * TODO: Location
     */
    @Bean
    public ItemProcessor<SeatAndScheduleAndMediaDto, JsonMetadataRequest> assetMetadataProcessor() {
        AtomicInteger counter = new AtomicInteger(1);
        return dto -> JsonMetadataRequest.builder()
                .name(dto.schedule().performance().title() + " #" + counter.getAndIncrement())
                .symbol("CONTING")
                .description(dto.schedule().performance().description())
                .sellerFeeBasisPoints(750)
                .image(dto.mediaUrl())
                .externalUrl(dto.schedule().performance().videoUrl())
                .attributes(List.of(
                        JsonMetadataRequest.Attribute.builder()
                                .traitType("Date")
                                .value(dto.schedule().startTime())
                                .build(),
                        JsonMetadataRequest.Attribute.builder()
                                .traitType("Sector")
                                .value(dto.seat().sector())
                                .build(),
                        JsonMetadataRequest.Attribute.builder()
                                .traitType("Row")
                                .value(dto.seat().row())
                                .build(),
                        JsonMetadataRequest.Attribute.builder()
                                .traitType("Col")
                                .value(dto.seat().col())
                                .build(),
                        JsonMetadataRequest.Attribute.builder()
                                .traitType("Grade")
                                .value(dto.seat().grade())
                                .build()
                ))
                .properties(List.of(
                        JsonMetadataRequest.Property.builder()
                                .files(List.of(
                                        JsonMetadataRequest.Property.File.builder()
                                                .uri(dto.mediaUrl())
                                                .type("video/webm")
                                                .build(),
                                        JsonMetadataRequest.Property.File.builder()
                                                .uri(dto.thumbUrl())
                                                .type("image/png")
                                                .build(),
                                        JsonMetadataRequest.Property.File.builder()
                                                .uri(dto.schedule().performance().posterImage())
                                                .type("image/jpeg")
                                                .build()
                                ))
                                .category("image")
                                .build()
                ))
                .build();
    }
}
