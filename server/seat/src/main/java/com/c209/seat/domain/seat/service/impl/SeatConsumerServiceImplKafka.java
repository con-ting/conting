package com.c209.seat.domain.seat.service.impl;



import com.c209.seat.domain.seat.dto.request.SeatUpdateRequest;
import com.c209.seat.domain.seat.entity.Seat;
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
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SeatConsumerServiceImplKafka {

    private final SeatR2dbcRepository seatRepository;


    @KafkaListener(topics = "update_seat")
    public void updateSeat(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);
        ObjectMapper mapper = new ObjectMapper();
        try {
            SeatUpdateRequest request = mapper.readValue(kafkaMessage, SeatUpdateRequest.class);
            log.info("consumer :: {}", request);
            Flux<Seat> seatsToUpdate = seatRepository.findBySeatIdIn(request.seatIds());

            // 조회된 좌석의 isPossible 값을 업데이트하고 저장합니다.
            seatsToUpdate.subscribe(seat -> {
                seat.setAvailable(request.isAvailable());
                seatRepository.save(seat).subscribe(savedSeat -> {
                    log.info("Updated seat with id {}", savedSeat);
                });
            });
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
    }



}
