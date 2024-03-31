package com.c209.seat.domain.seat.service.impl;



import com.c209.seat.domain.seat.entity.SeatSync;
import com.c209.seat.domain.seat.repository.async.SeatR2dbcRepository;
import com.c209.seat.domain.seat.repository.sync.SeatSyncRepository;
import com.c209.seat.global.exception.CommonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SeatConsumerServiceImplKafka {

    private final SeatSyncRepository seatSyncRepository;


    @KafkaListener(topics = "test")
    public void reserveSeat(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);


    }



}
