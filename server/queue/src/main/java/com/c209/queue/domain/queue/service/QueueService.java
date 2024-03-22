package com.c209.queue.domain.queue.service;

import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;
import reactor.core.publisher.MonoSink;

import java.util.function.Consumer;

public interface QueueService {

    Mono<Long> registerQueue(Long scheduleId, Long userId);

    Mono<Long> getRank(Long scheduleId, Long userId);

    Mono<Long> allowOrder(Long scheduleId);

    Mono<String> health();
}
