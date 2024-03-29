package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.MediaDto;
import com.c209.batchservice.batch.nft.dto.PerformanceAndSeatsDto;
import com.c209.batchservice.batch.nft.dto.SeatAndScheduleDto;
import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import com.c209.batchservice.domain.catalog.dto.ScheduleDto;
import com.c209.batchservice.domain.seat.dto.SeatDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.json.JacksonJsonObjectMarshaller;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonFileItemWriter;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonFileItemWriterBuilder;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

import java.util.Map;

@Configuration
//@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
@Slf4j
public class NftBatchConfig {
    public static final String BASE_DIR = "data/nft";
    private static final Map<Class<?>, String> DTO_TO_FILENAME = Map.of(
            PerformanceDto.class, "performance.json",
            ScheduleDto.class, "schedule.json",
            SeatDto.class, "seat.json",
            SeatAndScheduleDto.class, "seat-schedule.json",
            PerformanceAndSeatsDto.class, "performance-seats.json",
            MediaDto.class, "media.json"
    );

    public static String getPath(final Class<?> clazz) {
        return NftBatchConfig.BASE_DIR + "/" + DTO_TO_FILENAME.get(clazz);
    }

    static public <T> JsonItemReader<T> createJsonItemReader(Class<? extends T> itemType) {
        return new JsonItemReaderBuilder<T>()
                .name(itemType.getSimpleName() + "Reader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(itemType))
                .resource(new FileSystemResource(NftBatchConfig.getPath(itemType)))
                .build();
    }

    static public <T> JsonFileItemWriter<T> createJsonFileItemWriter(Class<? extends T> itemType) {
        return new JsonFileItemWriterBuilder<T>()
                .name(itemType.getSimpleName() + "Writer")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(NftBatchConfig.getPath(itemType)))
                .build();
    }

    @Bean
    public Job nftJob(
            final JobRepository jobRepository,
            final @Qualifier("performanceStep") Step performanceStep,
            final @Qualifier("scheduleStep") Step scheduleStep,
            final @Qualifier("seatStep") Step seatStep,
            final @Qualifier("seatAndScheduleStep") Step seatAndScheduleStep,
            final @Qualifier("PerformanceAndSeatsStep") Step PerformanceAndSeatsStep,
            final @Qualifier("downloadMediaStep") Step downloadMediaStep,
            final @Qualifier("mediaDtoStep") Step mediaInfoStep,
            final @Qualifier("createMediaStep") Step createMediaStep,
            final @Qualifier("uploadMediaStep") Step uploadMediaStep
    ) {
        return new JobBuilder("nftJob", jobRepository)
                .start(performanceStep)
                .next(scheduleStep)
                .next(seatStep)
                .next(seatAndScheduleStep)
                .next(PerformanceAndSeatsStep)
                .next(mediaInfoStep)
                .next(downloadMediaStep)
                .next(createMediaStep)
                .next(uploadMediaStep)
                .build();
    }
}
