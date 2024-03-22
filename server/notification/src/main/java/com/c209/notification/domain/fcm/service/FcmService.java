package com.c209.notification.domain.fcm.service;

import reactor.core.publisher.Mono;

public interface FcmService {
    Mono<String> sendMessage(String title, String body, String token);
}
