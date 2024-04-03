package com.c209.ticket.domain.ticket.service.impl;

import com.c209.ticket.domain.ticket.dto.TicketIssueDto;
import com.c209.ticket.domain.ticket.dto.request.OrderFailRequest;
import com.c209.ticket.domain.ticket.dto.request.OrderSuccessRequest;
import com.c209.ticket.domain.ticket.entity.Status;
import com.c209.ticket.domain.ticket.entity.Ticket;
import com.c209.ticket.domain.ticket.repository.async.TicketAsyncRepository;
import com.c209.ticket.global.api.NotificationRestClient;
import com.c209.ticket.global.api.dto.FcmRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketConsumerService {

    private final TicketAsyncRepository ticketAsyncRepository;

    private final NotificationRestClient notificationRestClient;
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
                    log.info("현재 발급 처리중인 issue :: {}", issue);
                    Ticket save = issue.toEntityForSuccess();
                    save.setIsUsed(false);
                    save.setBuyerId(orderRequest.buyerId());
                    save.setImpUid(orderRequest.impUid());
                    save.setStatus(Status.예매완료);

                    try{
                        notificationRestClient.sendFcm(
                            FcmRequest
                                    .builder()
                                    .body("티켓 예매가 완료되었습니다.")
                                    .receiver_id(issue.ownerId())
                                    .title("[콘팅] : 티켓 예매 완료")
                                    .build()
                    );
                    }catch(Exception e){
                      log.error("fcm 발송 에러 {}", issue.ownerId());  
                    }
                    
                    ticketAsyncRepository.save(save).block();
                    log.info("저장된 값 : {}", save);
            }
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
    }

    @KafkaListener(topics = "failure_order")
    public void failTicket(String kafkaMessage){
        ObjectMapper mapper = new ObjectMapper();
        log.info("kafka message :: {}", kafkaMessage);
        try{
            OrderFailRequest request = mapper.readValue(kafkaMessage, OrderFailRequest.class);

            log.info("consumer :{}", request);


            for(TicketIssueDto ticketIssueDto : request.ticketList()){
                Ticket save = ticketIssueDto.toEntityForFail();

                ticketAsyncRepository.save(save).block();
                log.info("저장된 값 : {}", save);

                try{
                        notificationRestClient.sendFcm(
                            FcmRequest
                                    .builder()
                                    .body("티켓 예매가 완료되었습니다.")
                                    .receiver_id(issue.ownerId())
                                    .title("[콘팅] : 티켓 예매 완료")
                                    .build()
                    );
                }catch(Exception e){
                      log.error("fcm 발송 에러 {}", issue.ownerId());  
                }
                    
                ticketAsyncRepository.save(save).block();
                log.info("저장된 값 : {}", save);
            }

        }catch(JsonProcessingException e){
            e.printStackTrace();
        }
    }



}
