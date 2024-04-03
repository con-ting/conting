package com.c209.queue.domain.queue.contoroller;


import com.c209.queue.domain.queue.data.dto.request.AllowOrderRequest;
import com.c209.queue.domain.queue.data.dto.request.PurchaseEntryRequest;
import com.c209.queue.domain.queue.data.dto.request.QueueRegisterRequest;
import com.c209.queue.domain.queue.data.dto.response.AllowOrderResponse;
import com.c209.queue.domain.queue.data.dto.response.AuthorizationTokenResponse;
import com.c209.queue.domain.queue.data.dto.response.PurchaseEntryResponse;
import com.c209.queue.domain.queue.data.dto.response.RankNumberResponse;
import com.c209.queue.domain.queue.service.QueueKey;
import com.c209.queue.domain.queue.service.QueueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
@RequestMapping("/queue")
@RequiredArgsConstructor
@Slf4j
public class QueueController {
    private final QueueService queueService;

    @GetMapping("health")
    public Mono<ResponseEntity<String>> healthCheck(){
        return queueService.health().map(ResponseEntity::ok);
    }


    @PostMapping("")
    public Mono<ResponseEntity<RankNumberResponse>> registerUser(
            @RequestBody QueueRegisterRequest request,
            @RequestHeader("X-Authorization-Id") Long userId
    ){


        log.error("{} {} ",request, userId);


        return queueService.registerQueue(request.schedule_id(), userId)
                .map(RankNumberResponse::new)
                .map(ResponseEntity::ok);
    }

    @GetMapping("")
    public Mono<ResponseEntity<RankNumberResponse>> getUserRank(
            @RequestParam(name="schedule_id") Long scheduleId,
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return queueService.getRank(scheduleId, userId)
                .map(RankNumberResponse::new)
                .map(ResponseEntity::ok);

    }

    @PostMapping("/allow")
    public Mono<ResponseEntity<AllowOrderResponse>> allowOrderQueue(
            @RequestBody AllowOrderRequest request
    ){
        return queueService.allowOrder(request.schedule_id())
                .map(AllowOrderResponse::new)
                .map(ResponseEntity::ok);
    }

    @PostMapping("/entry_token")
    public Mono<ResponseEntity<PurchaseEntryResponse>> generateToken(
            @RequestBody PurchaseEntryRequest request,
            @RequestHeader("X-Authorization-Id")Long userId,
            ServerWebExchange exchange
    ) {

        return Mono.defer(()-> queueService.generateToken(request.schedule_id(), userId))
                .map(token-> {
                    exchange.getResponse().addCookie(
                            ResponseCookie
                                    .from(QueueKey.USER_QUEUE_TOKEN.getName().formatted(request.schedule_id()), token)
                                    .maxAge(Duration.ofSeconds(300))
                                    .path("/")
                                    .build()
                    );
                    return token;
                })
                .map(PurchaseEntryResponse::new)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/entry_token")
    public Mono<ResponseEntity<AuthorizationTokenResponse>> authorizeToken(
            @RequestParam("token")String token,
            @RequestParam("schedule_id")Long scheduleId,
            @RequestHeader("X-Authorization-Id")Long userId
    ){
            return queueService.authorizeToken(scheduleId, userId, token)
                    .map(AuthorizationTokenResponse::new)
                    .map(ResponseEntity::ok);
    }

    @PostMapping("mock")
    public Flux<Long> registerUsers(
            @RequestParam("schedule_id") Long scheduleId
    ) {
        return Flux.range(1000, 1300)  // 1부터 1000까지의 숫자를 생성하는 Flux
                .flatMap(userId -> queueService.registerQueue(Long.valueOf(scheduleId), Long.valueOf(userId)));  // 각 userId에 대해 registerUser 메서드 호출
    }
}
