package com.c209.ticket.domain.ticket.service.impl;

import com.c209.ticket.global.exception.CommonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketConsumerService {

    @KafkaListener(topics = "test2")
    public void reserveSeat(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);
    }



}
