package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.PerformanceSeatCountDto;
import com.c209.batchservice.batch.nft.dto.SeatExtendDto;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.json.JacksonJsonObjectMarshaller;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonFileItemWriter;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonFileItemWriterBuilder;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
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
@Slf4j
public class NftDataSourceStepConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;

    @Qualifier("catalogEntityManagerFactory")
    private final EntityManagerFactory catalogEntityManagerFactory;
    @Qualifier("seatEntityManagerFactory")
    private final EntityManagerFactory seatEntityManagerFactory;

    @Bean
    public Step performanceStep() {
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
                .queryString("SELECT p FROM Performance p" +
                        " WHERE p.isMinted IS NULL OR p.isMinted = false")
                .build();
    }

    @Bean
    public JsonFileItemWriter<PerformanceDto> performanceWriter() {
        return new JsonFileItemWriterBuilder<PerformanceDto>()
                .name("performanceWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/performances.json"))
                .build();
    }

    @Bean
    public Step scheduleStep() {
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
                .queryString("SELECT s FROM Schedule s" +
                        " LEFT JOIN FETCH s.performance p" +
                        " WHERE p.isMinted IS NULL OR p.isMinted = false")
                .build();
    }

    @Bean
    public JsonFileItemWriter<ScheduleDto> scheduleWriter() {
        return new JsonFileItemWriterBuilder<ScheduleDto>()
                .name("scheduleWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/schedules.json"))
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
                .queryString("SELECT s FROM Seat s" +
                        " WHERE s.nftUrl IS NULL OR s.nftUrl = ''")
                .build();
    }

    @Bean
    public JsonFileItemWriter<SeatDto> seatWriter() {
        return new JsonFileItemWriterBuilder<SeatDto>()
                .name("seatWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/seats.json"))
                .build();
    }

    @Bean
    public Step extendSeatStep() {
        return new StepBuilder("extendSeatStep", jobRepository)
                .<SeatDto, SeatExtendDto>chunk(100, batchTransactionManager)
                .reader(extendSeatReader())
                .processor(extendSeatProcessor())
                .writer(extendSeatWriter())
                .build();
    }

    @Bean
    public JsonItemReader<SeatDto> extendSeatReader() {
        return new JsonItemReaderBuilder<SeatDto>()
                .name("extendSeatReader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(SeatDto.class))
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/seats.json"))
                .build();
    }

    @Bean
    public ItemProcessor<SeatDto, SeatExtendDto> extendSeatProcessor() {
        AtomicReference<Map<Long, ScheduleDto>> scheduleMapRef = new AtomicReference<>();
        return seat -> {
            Map<Long, ScheduleDto> scheduleMap = scheduleMapRef.updateAndGet(map -> {
                if (map == null) {
                    try {
                        return new ObjectMapper().readValue(
                                        new FileSystemResource(NftBatchConfig.BASE_DIR + "/schedules.json").getInputStream(),
                                        new TypeReference<List<ScheduleDto>>() {
                                        }).stream()
                                .collect(Collectors.toMap(ScheduleDto::scheduleId, Function.identity()));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
                return map;
            });
            return SeatExtendDto.builder()
                    .seat(seat)
                    .schedule(scheduleMap.get(seat.scheduleId()))
                    .build();
        };
    }

    @Bean
    public JsonFileItemWriter<SeatExtendDto> extendSeatWriter() {
        return new JsonFileItemWriterBuilder<SeatExtendDto>()
                .name("extendSeatWriter")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(NftBatchConfig.BASE_DIR + "/seat-extends.json"))
                .build();
    }

    @Bean
    public Step countSeatPerPerformanceStep() {
        return new StepBuilder("extendSeatStep", jobRepository)
                .tasklet(countSeatPerPerformanceTasklet(), batchTransactionManager)
                .build();
    }

    @Bean
    public Tasklet countSeatPerPerformanceTasklet() {
        return (contribution, chunkContext) -> {
            ObjectMapper mapper = new ObjectMapper();
            List<SeatExtendDto> seatExtends = Arrays.asList(mapper.readValue(
                    new FileSystemResource(NftBatchConfig.BASE_DIR + "/seat-extends.json").getFile(),
                    SeatExtendDto[].class));

            // performanceId 별로 seatExtend 아이템들을 집계
            Map<Long, Long> countMap = seatExtends.stream()
                    .collect(Collectors.groupingBy(
                            seatExtend -> seatExtend.schedule().performance().performanceId(),
                            Collectors.counting()));

            // 집계 결과를 PerformanceSeatCountDto 리스트로 변환
            List<PerformanceSeatCountDto> performanceSeatCounts = countMap.entrySet().stream()
                    .map(entry -> new PerformanceSeatCountDto(entry.getKey(), entry.getValue()))
                    .collect(Collectors.toList());

            // 결과 파일에 쓰기
            mapper.writeValue(
                    new FileSystemResource(NftBatchConfig.BASE_DIR + "/performance-seat-counts.json").getFile(),
                    performanceSeatCounts);
            return RepeatStatus.FINISHED;
        };
    }
}
