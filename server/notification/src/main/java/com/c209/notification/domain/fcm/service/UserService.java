package com.c209.notification.domain.fcm.service;

import com.c209.notification.domain.fcm.dto.response.FcmTokenResponse;
import com.c209.notification.domain.fcm.exception.FcmException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class UserService {

    private final WebClient webClient;


    public UserService(WebClient.Builder webClientBuilder, Environment environment) {
        String userService = environment.getProperty("service.user");
        if (userService == null || userService.isEmpty()) {
            throw new IllegalArgumentException("User service URL is not properly configured.");
        }
        this.webClient = webClientBuilder.baseUrl(userService).build();
    }
    public Mono<String> getFcmTokenByUserId(Long userId){
        return webClient
                .get()
                .uri("/users/{userId}/fcm", userId)
                .retrieve()
                .bodyToMono(FcmTokenResponse.class)
                .map(FcmTokenResponse::fcmToken)
                .doOnSuccess(token-> log.info("fcm {}", token))
                .onErrorResume(e->{
                    log.error("user 조회시 error :: {}:{}", e.getMessage(), e.getCause());
                    return Mono.error(new FcmException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
                });
        }


}
