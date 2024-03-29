package com.c209.batchservice.batch.nft;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
@Slf4j
public class NftBatchConfig {
    public static final String BASE_DIR = "data/nft";

    @Bean
    public Job nftJob(
            final JobRepository jobRepository,
            final @Qualifier("performanceStep") Step performanceStep,
            final @Qualifier("scheduleStep") Step scheduleStep,
            final @Qualifier("seatStep") Step seatStep,
            final @Qualifier("extendSeatStep") Step seatExtendStep,
            final @Qualifier("countSeatPerPerformanceStep") Step countSeatPerPerformanceStep,
            final @Qualifier("downloadMediaStep") Step downloadMediaStep,
            final @Qualifier("createMediaStep") Step createMediaStep
    ) {
        return new JobBuilder("nftJob", jobRepository)
                .start(performanceStep)
                .next(scheduleStep)
                .next(seatStep)
                .next(seatExtendStep)
                .next(countSeatPerPerformanceStep)
                .next(downloadMediaStep)
                .next(createMediaStep)
                .build();
    }
}
