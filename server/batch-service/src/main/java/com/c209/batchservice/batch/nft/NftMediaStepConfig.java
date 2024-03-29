package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.PerformanceSeatCountDto;
import com.c209.batchservice.batch.nft.service.ProcessService;
import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NftMediaStepConfig {
    private static final String MEDIA_DIR = NftBatchConfig.BASE_DIR + "/media";
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final ProcessService processService;

    @Bean
    public Step downloadMediaStep() {
        return new StepBuilder("downloadMediaStep", jobRepository)
                .<PerformanceDto, Void>chunk(100, batchTransactionManager)
                .reader(downloadMediaReader())
                .processor(downloadMediaProcessor())
                .writer(Void -> {
                })
                .build();
    }

    @Bean
    public JsonItemReader<PerformanceDto> downloadMediaReader() {
        return new JsonItemReaderBuilder<PerformanceDto>()
                .name("downloadMediaReader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(PerformanceDto.class))
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/performances.json"))
                .build();
    }

    @Bean
    public ItemProcessor<PerformanceDto, Void> downloadMediaProcessor() {
        return performanceDto -> {
            processService.downloadWebmVideoOnly(
                    performanceDto.videoUrl(),
                    MEDIA_DIR + "/" + performanceDto.performanceId() + ".webm"
            );
            return null;
        };
    }

    @Bean
    public Step createMediaStep() {
        return new StepBuilder("createMediaStep", jobRepository)
                .<PerformanceSeatCountDto, Void>chunk(100, batchTransactionManager)
                .reader(createMediaReader())
                .processor(createMediaProcessor())
                .writer(Void -> {
                })
                .build();
    }

    @Bean
    public JsonItemReader<PerformanceSeatCountDto> createMediaReader() {
        return new JsonItemReaderBuilder<PerformanceSeatCountDto>()
                .name("createMediaReader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(PerformanceSeatCountDto.class))
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/performance-seat-counts.json"))
                .build();
    }

    @Bean
    public ItemProcessor<PerformanceSeatCountDto, Void> createMediaProcessor() {
        return performance -> {
            processService.splitWebm(
                    MEDIA_DIR + "/" + performance.performanceId() + ".webm",
                    MEDIA_DIR + "/split/" + performance.performanceId(),
                    3,
                    performance.seatCount().intValue()
            );
            return null;
        };
    }
}
