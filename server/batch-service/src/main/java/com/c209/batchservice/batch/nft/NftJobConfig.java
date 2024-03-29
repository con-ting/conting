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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
//@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
@Slf4j
public class NftJobConfig {
    public static final String BASE_DIR = "data/nft";
    private static final Map<Class<? extends Record>, String> DTO_TO_FILENAME = Map.of(
            PerformanceDto.class, "performance.json",
            ScheduleDto.class, "schedule.json",
            SeatDto.class, "seat.json",
            SeatAndScheduleDto.class, "seat-schedule.json",
            PerformanceAndSeatsDto.class, "performance-seats.json",
            MediaDto.class, "media.json"
    );

    public static String getPath(final Class<? extends Record> clazz) {
        return NftJobConfig.BASE_DIR + "/" + DTO_TO_FILENAME.get(clazz);
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
            final @Qualifier("mediaInfoStep") Step mediaInfoStep,
            final @Qualifier("createMediaStep") Step createMediaStep
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
                .build();
    }
}
