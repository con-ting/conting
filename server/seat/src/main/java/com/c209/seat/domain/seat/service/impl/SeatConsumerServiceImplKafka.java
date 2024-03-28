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


    @KafkaListener(topics = "reservation-seat-topic")
    public void reserveSeat(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }

        SeatSync targetSeat = seatSyncRepository.findById((Long) map.get("")).orElseThrow(()->new CommonException("seat id가 존재하지 않습니다.", HttpStatus.BAD_REQUEST));

        targetSeat.setIsAvailable(false);

        seatSyncRepository.save(targetSeat);

    }



}
