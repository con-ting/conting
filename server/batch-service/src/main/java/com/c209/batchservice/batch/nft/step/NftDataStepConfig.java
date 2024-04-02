package com.c209.batchservice.batch.nft.step;

import com.c209.batchservice.batch.common.JsonConfig;
import com.c209.batchservice.batch.nft.dto.PerformanceAndSeatsDto;
import com.c209.batchservice.batch.nft.dto.SeatAndScheduleDto;
import com.c209.batchservice.domain.catalog.dto.PerformanceDto;
import com.c209.batchservice.domain.catalog.dto.ScheduleDto;
import com.c209.batchservice.domain.catalog.entity.Performance;
import com.c209.batchservice.domain.catalog.entity.Schedule;
import com.c209.batchservice.domain.seat.dto.SeatDto;
import com.c209.batchservice.domain.seat.entity.Seat;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Function;
import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
public class NftDataStepConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final @Qualifier("catalogEntityManagerFactory") EntityManagerFactory catalogEntityManagerFactory;
    private final @Qualifier("seatEntityManagerFactory") EntityManagerFactory seatEntityManagerFactory;
    private final @Qualifier("nftJsonConfig") JsonConfig jsonConfig;

    @Bean
    public Step loadPerformanceStep() {
        return new StepBuilder("loadPerformanceStep", jobRepository)
                .<Performance, PerformanceDto>chunk(100, batchTransactionManager)
                .reader(loadPerformanceReader())
                .processor(PerformanceDto::of)
                .writer(jsonConfig.createJsonFileItemWriter(PerformanceDto.class))
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Performance> loadPerformanceReader() {
        return new JpaPagingItemReaderBuilder<Performance>()
                .name("loadPerformanceReader")
                .entityManagerFactory(catalogEntityManagerFactory)
                .queryString("SELECT p FROM Performance p " +
                        "WHERE p.isMinted IS NULL OR p.isMinted = false")
                .build();
    }

    @Bean
    public Step loadScheduleStep() {
        return new StepBuilder("loadScheduleStep", jobRepository)
                .<Schedule, ScheduleDto>chunk(100, batchTransactionManager)
                .reader(loadScheduleReader())
                .processor(ScheduleDto::of)
                .writer(jsonConfig.createJsonFileItemWriter(ScheduleDto.class))
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Schedule> loadScheduleReader() {
        return new JpaPagingItemReaderBuilder<Schedule>()
                .name("loadScheduleReader")
                .entityManagerFactory(catalogEntityManagerFactory)
                .queryString("SELECT s FROM Schedule s " +
                        "LEFT JOIN FETCH s.performance p " +
                        "WHERE p.isMinted IS NULL OR p.isMinted = false")
                .build();
    }

    @Bean
    public Step loadSeatStep(
            JobRepository jobRepository,
            PlatformTransactionManager batchTransactionManager
    ) {
        return new StepBuilder("loadSeatStep", jobRepository)
                .<Seat, SeatDto>chunk(100, batchTransactionManager)
                .reader(loadSeatReader())
                .processor(SeatDto::of)
                .writer(jsonConfig.createJsonFileItemWriter(SeatDto.class))
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Seat> loadSeatReader() {
        return new JpaPagingItemReaderBuilder<Seat>()
                .name("loadSeatReader")
                .entityManagerFactory(seatEntityManagerFactory)
                .queryString("SELECT s FROM Seat s " +
                        "WHERE s.nftUrl IS NULL OR s.nftUrl = ''")
                .build();
    }

    @Bean
    public Step mergeSeatAndScheduleStep() {
        return new StepBuilder("mergeSeatAndScheduleStep", jobRepository)
                .<SeatDto, SeatAndScheduleDto>chunk(100, batchTransactionManager)
                .reader(jsonConfig.createJsonItemReader(SeatDto.class))
                .processor(mergeSeatAndScheduleProcessor())
                .writer(jsonConfig.createJsonFileItemWriter(SeatAndScheduleDto.class))
                .build();
    }

    @Bean
    public ItemProcessor<SeatDto, SeatAndScheduleDto> mergeSeatAndScheduleProcessor() {
        final AtomicReference<Map<Long, ScheduleDto>> scheduleMapRef = new AtomicReference<>();
        return seat -> {
            final Map<Long, ScheduleDto> scheduleMap = scheduleMapRef.updateAndGet(map -> {
                if (map == null) {
                    try {
                        return new ObjectMapper().readValue(
                                        new FileSystemResource(jsonConfig.getJsonPath(ScheduleDto.class)).getInputStream(),
                                        new TypeReference<List<ScheduleDto>>() {
                                        }).stream()
                                .collect(Collectors.toMap(ScheduleDto::id, Function.identity()));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
                return map;
            });
            return SeatAndScheduleDto.builder()
                    .seat(seat)
                    .schedule(scheduleMap.get(seat.scheduleId()))
                    .build();
        };
    }

    @Bean
    public Step mergePerformanceAndSeatsStep() {
        return new StepBuilder("mergePerformanceAndSeatsStep", jobRepository)
                .tasklet(mergePerformanceAndSeatsTasklet(), batchTransactionManager)
                .build();
    }

    @Bean
    @StepScope
    public Tasklet mergePerformanceAndSeatsTasklet() {
        return (contribution, chunkContext) -> {
            ObjectMapper mapper = new ObjectMapper();
            List<SeatAndScheduleDto> seatExtends = Arrays.asList(mapper.readValue(
                    new FileSystemResource(jsonConfig.getJsonPath(SeatAndScheduleDto.class)).getFile(),
                    SeatAndScheduleDto[].class));
            Map<Long, PerformanceDto> performanceMap = seatExtends.stream()
                    .collect(Collectors.toMap(
                            seatExtend -> seatExtend.schedule().performance().id(),
                            seatExtend -> seatExtend.schedule().performance(),
                            (existingValue, newValue) -> existingValue));
            Map<Long, List<SeatDto>> seatsMap = seatExtends.stream()
                    .collect(Collectors.groupingBy(
                            seatExtend -> seatExtend.schedule().performance().id(),
                            Collectors.mapping(SeatAndScheduleDto::seat, Collectors.toList())));
            List<PerformanceAndSeatsDto> performanceAndSeatsList = performanceMap.values().stream()
                    .map(performance -> PerformanceAndSeatsDto.builder()
                            .performance(performance)
                            .seats(seatsMap.get(performance.id()))
                            .build())
                    .toList();
            mapper.writeValue(new FileSystemResource(jsonConfig.getJsonPath(PerformanceAndSeatsDto.class)).getFile(),
                    performanceAndSeatsList);
            return RepeatStatus.FINISHED;
        };
    }
}
