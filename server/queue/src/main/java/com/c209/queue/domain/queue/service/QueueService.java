package com.c209.queue.domain.queue.service;

import com.c209.queue.domain.queue.data.dto.response.AuthorizationTokenResponse;
import reactor.core.publisher.Mono;

public interface QueueService {

    Mono<Long> registerQueue(Long scheduleId, Long userId);

    Mono<Long> getRank(Long scheduleId, Long userId);

    Mono<Long> allowOrder(Long scheduleId);

    Mono<String> health();

    Mono<String> generateToken(Long scheduleId, Long userId);

    Mono<Boolean> authorizeToken(Long scheduleId, Long userId, String token);
}
