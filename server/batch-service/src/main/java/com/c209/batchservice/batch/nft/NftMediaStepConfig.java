package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.MediaDto;
import com.c209.batchservice.batch.nft.dto.PerformanceAndSeatsDto;
import com.c209.batchservice.batch.nft.dto.SeatAndScheduleDto;
import com.c209.batchservice.global.process.ProcessService;
import com.c209.batchservice.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NftMediaStepConfig {
    private static final String MEDIA_DIR = NftBatchConfig.BASE_DIR + "/media";
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
    public Step mediaDtoStep() {
        return new StepBuilder("mediaDtoStep", jobRepository)
                .<PerformanceAndSeatsDto, MediaDto>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(PerformanceAndSeatsDto.class))
                .processor(mediaDtoProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(MediaDto.class))
                .build();
    }

    @Bean
    public ItemProcessor<PerformanceAndSeatsDto, MediaDto> mediaDtoProcessor() {
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
    public Step createMediaStep() {
        return new StepBuilder("createMediaStep", jobRepository)
                .<MediaDto, Void>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(MediaDto.class))
                .processor(createMediaProcessor())
                .writer(Void -> {
                })
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

    @Bean
    public Step uploadMediaStep() {
        return new StepBuilder("uploadMediaStep", jobRepository)
                .<SeatAndScheduleDto, List<Path>>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(SeatAndScheduleDto.class))
                .processor(uploadMediaProcessor())
                .writer(uploadMediaWriter())
                .build();
    }

    @Bean
    public ItemProcessor<SeatAndScheduleDto, List<Path>> uploadMediaProcessor() {
        return seatAndSchedule -> List.of(
                Path.of(MEDIA_DIR,
                        seatAndSchedule.schedule().performance().id().toString(),
                        seatAndSchedule.seat().id() + ".webm"),
                Path.of(MEDIA_DIR,
                        seatAndSchedule.schedule().performance().id().toString(),
                        seatAndSchedule.seat().id() + ".jpg"));
    }

    @Bean
    public ItemWriter<List<Path>> uploadMediaWriter() {
        return pairs -> pairs.forEach(pair -> pair.forEach(path -> {
            String fileName = path.getFileName().toString();
            int lastDotIndex = fileName.lastIndexOf('.');
            String baseName = fileName.substring(0, lastDotIndex);
            String extension = fileName.substring(lastDotIndex + 1);
            String parentName = path.getParent().getFileName().toString();
            String hash = calculateSha256(path);
            String key = parentName + "/" + baseName + "/" + hash + "." + extension;
            s3Service.pubMediaIfNotExists(key, path);
        }));
    }

    @SneakyThrows
    private String calculateSha256(Path path) {
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
