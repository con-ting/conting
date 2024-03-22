package com.c209.queue.domain.queue.service.impl;


import com.c209.queue.domain.queue.exception.QueueErrorCode;
import com.c209.queue.domain.queue.service.QueueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuples;

import java.time.Instant;

import static com.c209.queue.domain.queue.service.QueueKey.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class QueueServiceReactiveRedisImpl implements QueueService {


    private final ReactiveRedisTemplate<String, String> reactiveRedisTemplate;


    @Override
    public Mono<Long> registerQueue(Long scheduleId, Long userId) {
        long unixTimeStamp = Instant.now().getEpochSecond();

        log.debug("[QueueServiceReactiveRedisImpl :: registerQueue] time : {}", unixTimeStamp);

        return reactiveRedisTemplate.opsForZSet()
                .add(USER_QUEUE_WAIT_KEY.name().formatted(scheduleId), userId.toString(), unixTimeStamp)
                .filter(i->i)
                .switchIfEmpty(Mono.error(QueueErrorCode.QUEUE_ALREADY_REGISTERED_USER.build()))
                .flatMap(i->reactiveRedisTemplate.opsForZSet().rank(USER_QUEUE_WAIT_KEY.name().formatted(scheduleId), userId.toString()))
                .map(i-> i>=0 ? i+1 : i);
    }

    @Override
    public Mono<Long> getRank(Long scheduleId, Long userId) {
        return reactiveRedisTemplate.opsForZSet()
                .rank(USER_QUEUE_WAIT_KEY.name()
                .formatted(scheduleId),userId.toString())
                .defaultIfEmpty(-1L)
                .map(rank->rank>=0? rank+1 : rank);
    }

    @Override
    public Mono<Long> allowOrder(Long scheduleId) {
        return reactiveRedisTemplate.opsForZSet().popMin(USER_QUEUE_WAIT_KEY.name().formatted(scheduleId), 1)
                .flatMap(member -> reactiveRedisTemplate.opsForZSet().add(USER_QUEUE_PROCEED_KEY.name().formatted(scheduleId), member.getValue(), Instant.now().getEpochSecond()))
                .count();
    }

    @Override
    public Mono<String> health() {
        return Mono.empty();
    }

    @Scheduled(initialDelay=5000, fixedDelay = 10000)
    public void scheduleAllowUSer(){


        log.info("스케줄링 동작");

        reactiveRedisTemplate.scan(ScanOptions.scanOptions()
                .match(USER_QUEUE_WAIT_KEY_FOR_SCAN.name())
                .count(100)
                .build())
                .map(key-> key.split(":")[2])
                .flatMap(scheduleId -> allowOrder(Long.valueOf(scheduleId))
                .map(allowed -> Tuples.of(scheduleId, allowed)))
                .doOnNext(tuple -> log.info("{}의 공연대기줄에서 {} 명이 빠졌습니다.", tuple.getT1(), tuple.getT2()))
                .subscribe();
    }

}
