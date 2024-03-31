package com.c209.ticket.domain.ticket.service.impl;

import com.c209.ticket.domain.ticket.dto.TicketIssueDto;
import com.c209.ticket.domain.ticket.dto.request.OrderSuccessRequest;
import com.c209.ticket.domain.ticket.entity.Status;
import com.c209.ticket.domain.ticket.entity.Ticket;
import com.c209.ticket.domain.ticket.repository.TicketRepository;
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

    private final TicketRepository ticketRepository;

    @KafkaListener(topics = "success_order")
    public void reserveSeat(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);

        ObjectMapper mapper = new ObjectMapper();
        try {
            // JSON 문자열을 OrderSuccessRequest 객체로 매핑
            OrderSuccessRequest orderRequest = mapper.readValue(kafkaMessage, OrderSuccessRequest.class);

            log.info("consumer :: {}", orderRequest);

            orderRequest.buyerId();
            orderRequest.impUid();
            orderRequest.merchantUid();
            // 여기서 orderRequest 객체를 사용하여 원하는 작업 수행
            // 예: orderRequest.getAmount(), orderRequest.getBuyerId(), orderRequest.getImpUid() 등을 사용하여 필요한 작업 수행
            for(TicketIssueDto issue : orderRequest.ticketList()){
                    Ticket save = issue.toEntity();
                    save.setIsUsed(false);
                    save.setBuyerId(orderRequest.buyerId());
                    save.setImpUid(orderRequest.impUid());
                    save.setStatus(Status.예매완료);
                    ticketRepository.save(save).block();
                    log.info("저장된 값 : {}", save);
            }
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
    }



}
