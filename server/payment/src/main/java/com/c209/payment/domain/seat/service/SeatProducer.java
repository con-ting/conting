package com.c209.payment.domain.seat.service;

import com.c209.payment.domain.order.dto.request.OrderFailRequest;
import com.c209.payment.domain.order.dto.request.OrderSuccessRequest;
import com.c209.payment.domain.seat.dto.request.SeatUpdateRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SeatProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public SeatUpdateRequest updateSeat(String topic, SeatUpdateRequest seatDto) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";

        try {
            jsonInString = mapper.writeValueAsString(seatDto);
        } catch(JsonProcessingException e) {
            e.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent data from the Order microservice: " + seatDto);

        return seatDto;
    }


    public OrderSuccessRequest issueTicket(String topic, OrderSuccessRequest request) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";

        try {
            jsonInString = mapper.writeValueAsString(request);
        } catch(JsonProcessingException e) {
            e.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent data from the Order microservice: " + jsonInString);

        return request;
    }

    public void failTicket(String topic, OrderFailRequest request) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";

        try {
            jsonInString = mapper.writeValueAsString(request);
        } catch(JsonProcessingException e) {
            e.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent data from the Order microservice: " + jsonInString);

    }
}
