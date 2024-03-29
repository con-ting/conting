package com.c209.ticket.domain.ticket.service.impl;

import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.dto.response.TicketListResponse;
import com.c209.ticket.domain.ticket.entity.Ticket;
import com.c209.ticket.domain.ticket.repository.TicketRepository;
import com.c209.ticket.domain.ticket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.NoSuchElementException;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    private final ReactiveRedisTemplate<String, Long> reactiveRedisTemplate;


    @Override
    public Mono<TicketListResponse> getUserTickerList(Long userId) {
        return ticketRepository.findAllByOwnerId(userId).collectList().map(TicketListResponse::new);
    }


    @Override
    public Mono<TicketDto> getTicketDetail(Long userId, Long ticketId, String fingerPrint) {

        Mono<Ticket> ticketMono = ticketRepository.findByTicketId(ticketId);

        //티켓의 isUsed 여부 판단
        //?


        Mono<Long> ownerIdMono = ticketMono.map(Ticket::getOwnerId);


        Mono<Boolean> isOwnerMatchedMono = ownerIdMono.map(ownerId -> ownerId.equals(userId));


        Mono<Boolean> isFingerPrintMatchedMono = ticketMono.map(Ticket::getFingerprintKey)
                .map(storedFingerPrint -> storedFingerPrint.equals(fingerPrint));


        return Mono.zip(isOwnerMatchedMono, isFingerPrintMatchedMono, ticketMono)
                .flatMap(tuple -> {
                    boolean isOwnerMatched = tuple.getT1();
                    boolean isFingerPrintMatched = tuple.getT2();
                    Ticket ticket = tuple.getT3();

                    if (!isOwnerMatched) {
                        // 소유자가 아닌 경우 에러를 발생시킵니다.
                        return Mono.error(new IllegalAccessException("User is not the owner of the ticket"));
                    } else if (!isFingerPrintMatched) {
                        // 지문이 일치하지 않는 경우 에러를 발생시킵니다.
                        return Mono.error(new IllegalArgumentException("Fingerprint does not match"));
                    } else {
                        String uuid = UUID.randomUUID().toString();
                        long currentTimeStamp = Instant.now().getEpochSecond();
                        long maxExpTimeStamp =  Instant.now().plusSeconds(30).getEpochSecond();
                        long tmpExpTimeStamp =  Instant.now().plusSeconds(5).getEpochSecond();
                        // UUID를 키로 하여 redis에 저장합니다.
                        return reactiveRedisTemplate.opsForValue()
                                .set(uuid,tmpExpTimeStamp, maxExpTimeStamp)
                                .thenReturn(ticket.toDto(uuid));
                    }
                });
    }

    @Override
    public Mono<Void> extendQRExpTime(Long userId, String qrUUID) {

        //uuid로 redis에서 조회
            //없으면 예외를 던진다.
            //밸류가 tmpExpTimeStamp =  Instant.now().plusSeconds(5).getEpochSecond();처럼 저장되어있는데, 현재 시간을 넘겼을 경우 예외를 던진다.

        //uuid의 밸류 값을 Instant.now().plusSeconds(5).getEpochSecond();로 업데이트

        return reactiveRedisTemplate.opsForValue().get(qrUUID)
                .flatMap(value -> {
                    if (value == null) {
                        // 없으면 예외를 던집니다.
                        return Mono.error(new IllegalArgumentException("QR UUID not found"));
                    } else {
                        long tmpExpTimeStamp = Instant.now().plusSeconds(5).getEpochSecond();
                        long currentTimeStamp = Instant.now().getEpochSecond();
                        // 밸류가 현재 시간을 넘겼을 경우 예외를 던집니다.
                        if (Long.parseLong(value.toString()) < currentTimeStamp) {
                            return Mono.error(new IllegalArgumentException("QR code has already expired"));
                        }
                        // uuid의 밸류 값을 업데이트합니다.
                        return reactiveRedisTemplate.opsForValue().set(qrUUID, tmpExpTimeStamp);
                    }
                })
                .then();
    }



        //reds에서 uuid로 조회합니다.
            //없으면 예외처리합니다.
            //밸류가 tmpExpTimeStamp =  Instant.now().plusSeconds(5).getEpochSecond();처럼 저장되어있는데, 현재 시간을 넘겼을 경우 예외를 던진다.

        //redis엫서 uuid로 삭제합니다.

        //repository에서 Ticket을 tickerId로 조회합니다.
            //없으면 예외처리합니다.

        //해당 티켓이 가지고 있는 ownerId가 userId와 일치하는지 검사합니다.
            //불일치할경우 예외처리합니다.

        //해당 ticket의 isUsed속성을 true로 업데이트한 후 db에 저장합니다.



    @Override
    public Mono<Void> verifyQR(Long userId, String qrUUID, Long ticketId) {

        // Redis에서 uuid로 조회합니다.
        return reactiveRedisTemplate.opsForValue().get(qrUUID)
                .flatMap(expTime -> {
                    if (expTime == null) {
                        return Mono.error(new NoSuchElementException("QR UUID not found in Redis"));
                    } else {
                        long currentTimeStamp = Instant.now().getEpochSecond();
                        long expirationTime = Long.parseLong(expTime.toString());
                        if (currentTimeStamp > expirationTime) {
                            return Mono.error(new IllegalStateException("QR UUID has expired"));
                        } else {
                            // Redis에서 uuid 삭제
                            return reactiveRedisTemplate.opsForValue().delete(qrUUID)
                                    .then(ticketRepository.findByTicketId(ticketId)
                                            .switchIfEmpty(Mono.error(new NoSuchElementException("Ticket not found")))
                                            .flatMap(ticket -> {
                                                if (!ticket.getOwnerId().equals(userId)) {
                                                    return Mono.error(new IllegalAccessException("User is not the owner of the ticket"));
                                                } else {
                                                    // 해당 티켓의 isUsed 속성을 true로 업데이트 후 저장
                                                    ticket.markAsUsed();
                                                    return ticketRepository.save(ticket).then();
                                                }
                                            }));
                        }
                    }
                });

    }
}
