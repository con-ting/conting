package com.c209.queue.domain.queue.service.impl;


import com.c209.queue.domain.queue.data.dto.response.AuthorizationTokenResponse;
import com.c209.queue.domain.queue.exception.QueueErrorCode;
import com.c209.queue.domain.queue.service.QueueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.StandardReflectionParameterNameDiscoverer;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuples;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

import static com.c209.queue.domain.queue.service.QueueKey.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class QueueServiceReactiveRedisImpl implements QueueService {

    @Value("${scheduler.enabled}")
    private Boolean scheduling;

    private final ReactiveRedisTemplate<String, String> reactiveRedisTemplate;


    @Override
    public Mono<Long> registerQueue(Long scheduleId, Long userId) {
        long unixTimeStamp = Instant.now().getEpochSecond();

        log.debug("[QueueServiceReactiveRedisImpl :: registerQueue] time : {}", unixTimeStamp);

        return reactiveRedisTemplate.opsForZSet()
                .add("users:queue:%s:wait".formatted(scheduleId), userId.toString(), unixTimeStamp)
                .filter(i->i)
                .switchIfEmpty(Mono.error(QueueErrorCode.QUEUE_ALREADY_REGISTERED_USER.build()))
                .flatMap(i->reactiveRedisTemplate.opsForZSet().rank("users:queue:%s:wait".formatted(scheduleId), userId.toString()))
                .map(i-> i>=0 ? i+1 : i);
    }

    @Override
    public Mono<Long> getRank(Long scheduleId, Long userId) {
        return reactiveRedisTemplate.opsForZSet()
                .rank("users:queue:%s:wait"
                .formatted(scheduleId),userId.toString())
                .defaultIfEmpty(-1L)
                .map(rank->rank>=0? rank+1 : rank);
    }

    @Override
    public Mono<Long> allowOrder(Long scheduleId) {
        return reactiveRedisTemplate.opsForZSet().popMin("users:queue:%s:wait".formatted(scheduleId), 1)
                .flatMap(member -> reactiveRedisTemplate.opsForZSet().add("users:queue:%s:proceed".formatted(scheduleId), member.getValue(), Instant.now().getEpochSecond()))
                .count();
    }

    @Override
    public Mono<String> health() {
        return Mono.empty();
    }

    @Override
    public Mono<String> generateToken(Long scheduleId, Long userId) {

        MessageDigest digest = null;

        try {
            digest = MessageDigest.getInstance("SHA-256");
            String input = "user-queue-%s-token".formatted(scheduleId, userId);
            byte[] encodedHash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder();

            for(byte hashUnit : encodedHash){
                hexString.append(String.format("%02x", hashUnit));
            }

            return Mono.just(hexString.toString());


        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Mono<Boolean> authorizeToken(Long scheduleId, Long userId, String requestedToken) {
        return generateToken(scheduleId, userId)
                .filter(generatedToken -> generatedToken.equals(requestedToken))
                .map(i-> true)
                .defaultIfEmpty(false);
    }

    @Scheduled(initialDelay=100, fixedDelay = 100)
    public void scheduleAllowUSer(){

        if (!scheduling) {
            log.info("passed scheduling...");
            return;
        }
        log.info("called scheduling...");

        reactiveRedisTemplate.scan(ScanOptions.scanOptions()
                .match("users:queue:*:wait")
                .count(100)
                .build())
                .map(key-> {
                    String scheduleId = key.split(":")[2];
                    log.info("키: {}, scheduleId: {}", key, scheduleId); // 로깅 추가
                    return scheduleId;
                })
                //.map(key-> key.split(":")[2])
                .flatMap(scheduleId -> allowOrder(Long.valueOf(scheduleId))
                .map(allowed -> Tuples.of(scheduleId, allowed)))
                .doOnNext(tuple -> log.info("{}의 공연대기줄에서 {} 명이 빠졌습니다.", tuple.getT1(), tuple.getT2()))
                .subscribe();
    }

}
