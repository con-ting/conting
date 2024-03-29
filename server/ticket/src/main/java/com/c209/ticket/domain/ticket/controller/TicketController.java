package com.c209.ticket.domain.ticket.controller;


import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.dto.response.TicketListResponse;
import com.c209.ticket.domain.ticket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ticket")
public class TicketController {

    private final TicketService ticketService;



    @GetMapping("/my")
    public Mono<ResponseEntity<TicketListResponse>> getMyTicketList(
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return ticketService.getUserTickerList(userId)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/{ticket_id")
    public Mono<ResponseEntity<TicketDto>> getTicketDetail(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("ticket_id")Long ticketId,
            @RequestParam("finger_print")String fingerPrint
    ){
        return ticketService.getTicketDetail(userId, ticketId, fingerPrint)
                .map(ResponseEntity::ok);
    }

    @PutMapping("qr/{uuid]")
    public Mono<ResponseEntity> extendQRExpTime(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("uuid")String qrUUID
    ){
        return ticketService.extendQRExpTime(userId, qrUUID)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/{ticket_id}/qr/{uuid]")
    public Mono<ResponseEntity> verifyQR(
            @RequestHeader("X-Authorization-Id")Long userId,
            @PathVariable("uuid")String qrUUID,
            @PathVariable("ticket_id")Long ticketId
    ){
        return ticketService.verifyQR(userId, qrUUID, ticketId)
                .map(ResponseEntity::ok);
    }



}
