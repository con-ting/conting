package com.c209.batchservice.batch.nft;

import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import com.c209.batchservice.domain.catalog.dto.ScheduleDto;
import com.c209.batchservice.domain.catalog.entity.Performance;
import com.c209.batchservice.domain.catalog.entity.Schedule;
import com.c209.batchservice.domain.seat.dto.SeatDto;
import com.c209.batchservice.domain.seat.entity.Seat;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.json.JacksonJsonObjectMarshaller;
import org.springframework.batch.item.json.JsonFileItemWriter;
import org.springframework.batch.item.json.builder.JsonFileItemWriterBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
//@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
@RequiredArgsConstructor
@Slf4j
public class NftBatchConfig {
    @Qualifier("catalogEntityManagerFactory")
    private final EntityManagerFactory catalogEntityManagerFactory;
    @Qualifier("seatEntityManagerFactory")
    private final EntityManagerFactory seatEntityManagerFactory;

    @Bean
    public Job nftJob(
            final JobRepository jobRepository,
            final @Qualifier("performanceStep") Step performanceStep,
            final @Qualifier("scheduleStep") Step scheduleStep,
            final @Qualifier("seatStep") Step seatStep
    ) {
        return new JobBuilder("nftJob", jobRepository)
                .start(performanceStep)
                .next(scheduleStep)
                .next(seatStep)
                .build();
    }

    @Bean
    public Step performanceStep(
            JobRepository jobRepository,
            PlatformTransactionManager batchTransactionManager
    ) {
        return new StepBuilder("performanceStep", jobRepository)
                .<Performance, PerformanceDto>chunk(100, batchTransactionManager)
                .reader(performanceReader())
                .processor(PerformanceDto::of)
                .writer(performanceWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Performance> performanceReader() {
        return new JpaPagingItemReaderBuilder<Performance>()
                .name("performanceReader")
                .entityManagerFactory(catalogEntityManagerFactory)
                .queryString("select p from Performance p")
                .build();
    }

    @Bean
    public JsonFileItemWriter<PerformanceDto> performanceWriter() {
        return new JsonFileItemWriterBuilder<PerformanceDto>()
                .name("performanceWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource("data/performances.json"))
                .build();
    }

    @Bean
    public Step scheduleStep(
            JobRepository jobRepository,
            PlatformTransactionManager batchTransactionManager
    ) {
        return new StepBuilder("scheduleStep", jobRepository)
                .<Schedule, ScheduleDto>chunk(100, batchTransactionManager)
                .reader(scheduleReader())
                .processor(ScheduleDto::of)
                .writer(scheduleWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Schedule> scheduleReader() {
        return new JpaPagingItemReaderBuilder<Schedule>()
                .name("scheduleReader")
                .entityManagerFactory(catalogEntityManagerFactory)
                .queryString("select s from Schedule s")
                .build();
    }

    @Bean
    public JsonFileItemWriter<ScheduleDto> scheduleWriter() {
        return new JsonFileItemWriterBuilder<ScheduleDto>()
                .name("scheduleWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource("data/schedules.json"))
                .build();
    }

    @Bean
    public Step seatStep(
            JobRepository jobRepository,
            PlatformTransactionManager batchTransactionManager
    ) {
        return new StepBuilder("seatStep", jobRepository)
                .<Seat, SeatDto>chunk(100, batchTransactionManager)
                .reader(seatReader())
                .processor(SeatDto::of)
                .writer(seatWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Seat> seatReader() {
        return new JpaPagingItemReaderBuilder<Seat>()
                .name("seatReader")
                .entityManagerFactory(seatEntityManagerFactory)
                .queryString("select s from Seat s")
                .build();
    }

    @Bean
    public JsonFileItemWriter<SeatDto> seatWriter() {
        return new JsonFileItemWriterBuilder<SeatDto>()
                .name("seatWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource("data/seats.json"))
                .build();
    }

}
