package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.MediaDto;
import com.c209.batchservice.batch.nft.dto.PerformanceAndSeatsDto;
import com.c209.batchservice.batch.nft.service.ProcessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.json.JacksonJsonObjectMarshaller;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonFileItemWriter;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonFileItemWriterBuilder;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NftMediaStepConfig {
    private static final String MEDIA_DIR = NftJobConfig.BASE_DIR + "/media";
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final ProcessService processService;

    @Bean
    public Step downloadMediaStep() {
        return new StepBuilder("downloadMediaStep", jobRepository)
                .<PerformanceAndSeatsDto, Void>chunk(100, batchTransactionManager)
                .reader(downloadMediaReader())
                .processor(downloadMediaProcessor())
                .writer(Void -> {
                })
                .build();
    }

    @Bean
    public JsonItemReader<PerformanceAndSeatsDto> downloadMediaReader() {
        return new JsonItemReaderBuilder<PerformanceAndSeatsDto>()
                .name("downloadMediaReader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(PerformanceAndSeatsDto.class))
                .resource(new FileSystemResource(NftJobConfig.getPath(PerformanceAndSeatsDto.class)))
                .build();
    }

    @Bean
    public ItemProcessor<PerformanceAndSeatsDto, Void> downloadMediaProcessor() {
        return performanceAndSeatsDto -> {
            processService.downloadWebmVideoOnly(
                    performanceAndSeatsDto.performance().videoUrl(),
                    MEDIA_DIR + "/" + performanceAndSeatsDto.performance().id() + ".webm"
            );
            return null;
        };
    }

    @Bean
    public Step mediaInfoStep() {
        return new StepBuilder("mediaInfoStep", jobRepository)
                .<PerformanceAndSeatsDto, MediaDto>chunk(100, batchTransactionManager)
                .reader(mediaInfoReader())
                .processor(mediaInfoProcessor())
                .writer(mediaInfoWriter())
                .build();
    }

    @Bean
    public JsonItemReader<PerformanceAndSeatsDto> mediaInfoReader() {
        return new JsonItemReaderBuilder<PerformanceAndSeatsDto>()
                .name("mediaInfoReader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(PerformanceAndSeatsDto.class))
                .resource(new FileSystemResource(NftJobConfig.getPath(PerformanceAndSeatsDto.class)))
                .build();
    }

    @Bean
    public ItemProcessor<PerformanceAndSeatsDto, MediaDto> mediaInfoProcessor() {
        return performanceAndSeatsDto -> {
            String videoPath = MEDIA_DIR + "/" + performanceAndSeatsDto.performance().id() + ".webm";
            int duration = processService.getVideoDuration(videoPath);
            return MediaDto.builder()
                    .performanceId(performanceAndSeatsDto.performance().id())
                    .seatCount(performanceAndSeatsDto.seats().size())
                    .duration(duration)
                    .build();
        };
    }

    @Bean
    public JsonFileItemWriter<MediaDto> mediaInfoWriter() {
        return new JsonFileItemWriterBuilder<MediaDto>()
                .name("mediaInfoWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(NftJobConfig.getPath(MediaDto.class)))
                .build();
    }

    @Bean
    public Step createMediaStep() {
        return new StepBuilder("createMediaStep", jobRepository)
                .<MediaDto, Void>chunk(100, batchTransactionManager)
                .reader(createMediaReader())
                .processor(createMediaProcessor())
                .writer(Void -> {
                })
                .build();
    }

    @Bean
    public JsonItemReader<MediaDto> createMediaReader() {
        return new JsonItemReaderBuilder<MediaDto>()
                .name("createMediaReader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(MediaDto.class))
                .resource(new FileSystemResource(NftJobConfig.getPath(MediaDto.class)))
                .build();
    }

    @Bean
    public ItemProcessor<MediaDto, Void> createMediaProcessor() {
        return media -> {
            String inputPath = MEDIA_DIR + "/" + media.performanceId() + ".webm";
            String outputDir = MEDIA_DIR + "/" + media.performanceId();
            Files.createDirectories(Path.of(outputDir));
            processService.splitWebm(inputPath, outputDir, media.seatCount(), media.duration(), 3);
            return null;
        };
    }
}
