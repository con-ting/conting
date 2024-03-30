package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.PerformanceAndSeatsDto;
import com.c209.batchservice.batch.nft.dto.PerformanceIdAndMediaDto;
import com.c209.batchservice.batch.nft.dto.SeatAndScheduleAndMediaDto;
import com.c209.batchservice.batch.nft.dto.SeatAndScheduleDto;
import com.c209.batchservice.global.process.ProcessService;
import com.c209.batchservice.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

@Configuration
@RequiredArgsConstructor
public class NftMediaStepConfig {
    private static final String NFT_MEDIA_DIR = NftBatchConfig.NFT_DIR + "/media";
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final ProcessService processService;
    private final S3Service s3Service;

    @Bean
    public Step downloadMediaStep() {
        return new StepBuilder("downloadMediaStep", jobRepository)
                .<PerformanceAndSeatsDto, Void>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(PerformanceAndSeatsDto.class))
                .processor(downloadMediaProcessor())
                .writer(Void -> {
                })
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<PerformanceAndSeatsDto, Void> downloadMediaProcessor() {
        return performanceAndSeatsDto -> {
            processService.downloadWebmVideoOnly(
                    performanceAndSeatsDto.performance().videoUrl(),
                    NFT_MEDIA_DIR + "/" + performanceAndSeatsDto.performance().id() + ".webm"
            );
            return null;
        };
    }

    @Bean
    public Step performanceAndMediaStep() {
        return new StepBuilder("performanceAndMediaStep", jobRepository)
                .<PerformanceAndSeatsDto, PerformanceIdAndMediaDto>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(PerformanceAndSeatsDto.class))
                .processor(performanceAndMediaProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(PerformanceIdAndMediaDto.class))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<PerformanceAndSeatsDto, PerformanceIdAndMediaDto> performanceAndMediaProcessor() {
        return dto -> {
            String videoPath = NFT_MEDIA_DIR + "/" + dto.performance().id() + ".webm";
            int duration = processService.getVideoDuration(videoPath);
            return PerformanceIdAndMediaDto.builder()
                    .performanceId(dto.performance().id())
                    .seatCount(dto.seats().size())
                    .mediaDuration(duration)
                    .build();
        };
    }

    @Bean
    public Step createMediaStep() {
        return new StepBuilder("createMediaStep", jobRepository)
                .<PerformanceIdAndMediaDto, Void>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(PerformanceIdAndMediaDto.class))
                .processor(createMediaProcessor())
                .writer(Void -> {
                })
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<PerformanceIdAndMediaDto, Void> createMediaProcessor() {
        return dto -> {
            String inputPath = NFT_MEDIA_DIR + "/" + dto.performanceId() + ".webm";
            String outputDir = NFT_MEDIA_DIR + "/" + dto.performanceId();
            Files.createDirectories(Path.of(outputDir));
            processService.splitToWebmThumb(inputPath, outputDir, dto.seatCount(), dto.mediaDuration(), 3);
            return null;
        };
    }

    @Bean
    public Step uploadMediaStep() {
        return new StepBuilder("uploadMediaStep", jobRepository)
                .<SeatAndScheduleDto, SeatAndScheduleAndMediaDto>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(SeatAndScheduleDto.class))
                .processor(uploadMediaProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(SeatAndScheduleAndMediaDto.class))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<SeatAndScheduleDto, SeatAndScheduleAndMediaDto> uploadMediaProcessor() {
        return dto -> {
            List<String> keys = Stream.of("webm", "jpg").map(extension -> {
                Long performanceId = dto.schedule().performance().id();
                Long seatId = dto.seat().id();
                Path path = Path.of(NFT_MEDIA_DIR, performanceId.toString(), seatId + "." + extension);
                String hash = s3Service.calculateSha256(path);
                String key = performanceId + "/" + seatId + "/" + hash + "." + extension;
                return s3Service.putMediaIfNotExists(key, path);
            }).toList();
            return SeatAndScheduleAndMediaDto.builder()
                    .seat(dto.seat())
                    .schedule(dto.schedule())
                    .mediaUrl(keys.get(0))
                    .thumbUrl(keys.get(1))
                    .build();
        };
    }
}
