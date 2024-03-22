package com.c209.queue.domain.queue.contoroller;


import com.c209.queue.domain.queue.data.dto.request.AllowOrderRequest;
import com.c209.queue.domain.queue.data.dto.request.QueueRegisterRequest;
import com.c209.queue.domain.queue.data.dto.response.AllowOrderResponse;
import com.c209.queue.domain.queue.data.dto.response.RankNumberResponse;
import com.c209.queue.domain.queue.service.QueueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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

    @PostMapping("/allowed")
    public Mono<ResponseEntity<AllowOrderResponse>> allowOrderQueue(
            @RequestBody AllowOrderRequest request
    ){
        return queueService.allowOrder(request.schedule_id())
                .map(AllowOrderResponse::new)
                .map(ResponseEntity::ok);
    }









}
