package com.c209.ticket.domain.ticket.controller;


import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.dto.response.ResultResponse;
import com.c209.ticket.domain.ticket.dto.response.TicketListResponse;
import com.c209.ticket.domain.ticket.dto.response.TicketPaymentsListResponse;
import com.c209.ticket.domain.ticket.service.TicketService;
import jakarta.ws.rs.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ticket")
@Slf4j
public class TicketController {

    private final TicketService ticketService;

    @PutMapping("/{ticket_id}/refund")
    public ResponseEntity<ResultResponse> refundTicket(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("ticket_id") Long ticketId
    ){

        return ResponseEntity.ok(ResultResponse
                .builder()
                .result(ticketService.refund(userId, ticketId))
                .build());
    }

    //환불 결제
        //해당 티켓을 조회합니다.
        //owner id 가 맞는지 확인합니다.
        //
        //예매완료처리합니다.
            //해당 티켓의 is_used를 0으로 만듭니다.
            //해당 티켓의 imp uid를 업데이트 합니다.
            //status를 예매완료로 바꿉니다. 



    @GetMapping("/my")
    public Mono<ResponseEntity<TicketListResponse>> getMyTicketList(
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return ticketService.getUserTickerList(userId)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/{ticket_id}")
    public Mono<ResponseEntity<TicketDto>> getTicketDetail(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("ticket_id")Long ticketId,
            @RequestParam("finger_print")String fingerPrint
    ){
        log.info(fingerPrint);
        return ticketService.getTicketDetail(userId, ticketId, fingerPrint)
                .map(ResponseEntity::ok);
    }

    @PutMapping("qr/{uuid}")
    public Mono<ResponseEntity<ResultResponse>> extendQRExpTime(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("uuid")String qrUUID
    ){
        return ticketService.extendQRExpTime(userId, qrUUID)
                .map(ResultResponse::new)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/{ticket_id}/qr/{uuid}")
    public Mono<ResponseEntity<ResultResponse>> verifyQR(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("uuid")String qrUUID,
            @PathVariable("ticket_id")Long ticketId
    ){
        return ticketService.verifyQR(userId, qrUUID, ticketId)
                .map(ResultResponse::new)
                .map(ResponseEntity::ok);

    }

    @GetMapping("/payments")
    public Mono<ResponseEntity<TicketPaymentsListResponse>> getTicketPayments(
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return ticketService.getTicketPaymentsList(userId)
                .map(ResponseEntity::ok);
    }





}
