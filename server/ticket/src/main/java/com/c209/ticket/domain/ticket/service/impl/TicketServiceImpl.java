package com.c209.ticket.domain.ticket.service.impl;

import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.dto.response.TicketListResponse;
import com.c209.ticket.domain.ticket.entity.Ticket;
import com.c209.ticket.domain.ticket.exception.QRErrorCode;
import com.c209.ticket.domain.ticket.repository.TicketRepository;
import com.c209.ticket.domain.ticket.service.TicketService;
import com.c209.ticket.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.Instant;
import java.util.NoSuchElementException;
import java.util.UUID;

import static com.c209.ticket.domain.ticket.exception.QRErrorCode.QR_EXPIRED_ERROR;
import static com.c209.ticket.domain.ticket.exception.QRErrorCode.QR_INVALID_ERROR;
import static com.c209.ticket.domain.ticket.exception.TicketErrorCode.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class TicketServiceImpl implements TicketService {


    @Override
    public Mono<TicketListResponse> getUserTickerList(Long userId) {
        return ticketRepository.findAllNotUsedTicketByOwnerId(userId).collectList().map(TicketListResponse::new);
    }


    private final TicketRepository ticketRepository;

    private final ReactiveRedisTemplate<String, String> reactiveRedisTemplate;
//    public Mono<TicketDto> getTicketDetail2(Long userId, Long ticketId, String fingerPrint) {
//        return ticketRepository.findByTicketId(ticketId)
//                .map(ticket->{
//                    if(!ticket.getOwnerId().equals(userId)){
//
//                    }else if(!ticket.getFingerprintKey().equals(fingerPrint)){
//
//                    }else if()
//                })
//    }



    @Override
    public Mono<TicketDto> getTicketDetail(Long userId, Long ticketId, String fingerPrint) {
        log.info("티켓 아이디로 조회");
        Mono<Ticket> ticketMono = ticketRepository.findByTicketId(ticketId)
                .switchIfEmpty(Mono.error(new CommonException(TICKET_NOT_FOUND)));

        //티켓의 isUsed 여부 판단
        //?

        log.info("티켓 아이디로 조회2");
        Mono<Long> ownerIdMono = ticketMono.map(Ticket::getOwnerId);


        Mono<Boolean> isOwnerMatchedMono = ownerIdMono.map(ownerId -> ownerId.equals(userId));
        Mono<Boolean> isUsedMono = ticketMono.map(Ticket::getIsUsed);


        Mono<Boolean> isFingerPrintMatchedMono = ticketMono.map(Ticket::getFingerprintKey)
                .map(storedFingerPrint -> storedFingerPrint.equals(fingerPrint));


        log.info("{}", ticketMono);


        return Mono.zip(isOwnerMatchedMono.log(), isFingerPrintMatchedMono.log(), ticketMono.log(), isUsedMono.log())
                .flatMap(tuple -> {
                    boolean isOwnerMatched = tuple.getT1();
                    boolean isFingerPrintMatched = tuple.getT2();
                    Ticket ticket = tuple.getT3();
                    boolean isUsed = tuple.getT4();

                    if (!isOwnerMatched) {
                        // 소유자가 아닌 경우 에러를 발생시킵니다.
                        return Mono.error(new CommonException(TICKET_UNOWNED));
                    } else if (!isFingerPrintMatched) {
                        // 지문이 일치하지 않는 경우 에러를 발생시킵니다.
                        return Mono.error(new CommonException((TICKET_NOT_MATCHED_FINGER_PRINT)));
                    }else if(isUsed){
                        return Mono.error(new CommonException(TICKET_ALREADY_USED));
                    }
                    else {
                        String uuid = UUID.randomUUID().toString();
                        long currentTimeStamp = Instant.now().getEpochSecond();

                        long tmpExpTimeStamp = Instant.now().plusSeconds(3).getEpochSecond();

                        // UUID를 키로 하여 redis에 저장합니다.
                        return reactiveRedisTemplate.opsForValue()
                                .set(uuid, String.valueOf(tmpExpTimeStamp), Duration.ofSeconds(30))
                                .thenReturn(ticket.toDto(uuid));
                    }
                });
    }

    @Override
    public Mono<Boolean> extendQRExpTime(Long userId, String qrUUID) {
        // Redis에서 UUID로 조회하여 해당 UUID에 대한 값 가져오기
        return reactiveRedisTemplate.opsForValue().get(qrUUID)
                .flatMap(value -> {
                    if (value == null) {
                        // 값이 없으면 예외 발생
                        return Mono.error(new CommonException(QR_INVALID_ERROR));
                    } else {
                        // 기존 만료 시간 가져오기
                        return reactiveRedisTemplate.getExpire(qrUUID)
                                .flatMap(expireTime -> {

                                    long newExpTimeStamp = Instant.now().plusSeconds(3).getEpochSecond();
                                    long currentTimeStamp = Instant.now().getEpochSecond();
                                    // 현재 시간보다 밸류의 시간이 작으면 이미 만료된 것으로 간주
                                    // 네트워크 차단이 감지됨
                                    if (Long.parseLong(value) < currentTimeStamp) {
                                        return reactiveRedisTemplate.delete(qrUUID)
                                                .then(Mono.error(new CommonException(QR_EXPIRED_ERROR)));
                                    }
                                    // UUID의 밸류 값을 업데이트하고 새로운 만료 시간 설정
                                    return reactiveRedisTemplate.opsForValue().set(qrUUID, String.valueOf(newExpTimeStamp), expireTime)
                                            .thenReturn(true); // 업데이트 성공 시 true 반환
                                });
                    }
                })
                .switchIfEmpty(Mono.error(new CommonException(QR_INVALID_ERROR))); // Mono가 비어있을 경우 false 반환
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

    private Mono<Ticket> validateTicket(Long userId, Ticket ticket) {
        if (!ticket.getOwnerId().equals(userId)) {
            return Mono.error(new CommonException(TICKET_UNOWNED)); // userId와 ownerId가 일치하지 않을 경우 예외 발생
        }
        if (ticket.getIsUsed()) {
            return Mono.error(new CommonException(TICKET_ALREADY_USED)); // ticket이 이미 사용되었을 경우 예외 발생
        }
        return Mono.just(ticket);
    }



    @Override
    public Mono<Boolean> verifyQR(Long userId, String qrUUID, Long ticketId) {
        return ticketRepository.findByTicketId(ticketId)
                .switchIfEmpty(Mono.error(new CommonException(TICKET_NOT_FOUND))) // ticket이 존재하지 않을 경우 예외 발생
                .flatMap(ticket -> validateTicket(userId, ticket))
                .flatMap(ticket -> {
                    // Redis에서 uuid로 조회합니다.
                    return reactiveRedisTemplate.opsForValue().get(qrUUID)
                            .switchIfEmpty(Mono.error(new CommonException(QR_INVALID_ERROR))) // 값이 없으면 예외 발생
                            .flatMap(value -> {
                                // 기존 만료 시간 가져오기
                                return reactiveRedisTemplate.getExpire(qrUUID)
                                        .flatMap(expireTime -> {
                                            long currentTimeStamp = Instant.now().getEpochSecond();
                                            // 현재 시간보다 밸류의 시간이 작으면 이미 만료된 것으로 간주
                                            // 네트워크 차단이 감지됨
                                            if (Long.parseLong(value) < currentTimeStamp) {
                                                return reactiveRedisTemplate.delete(qrUUID)
                                                        .then(Mono.error(new CommonException(QR_EXPIRED_ERROR)));
                                            }
                                            // UUID의 밸류 값을 업데이트하고 새로운 만료 시간 설정
                                            return reactiveRedisTemplate.delete(qrUUID)
                                                    .then(ticketRepository.findByTicketId(ticketId)
                                                            .flatMap(existingTicket -> {
                                                                existingTicket.setIsUsed(true);
                                                                return ticketRepository.save(existingTicket).
                                                                        thenReturn(true);
                                                            }));
                                        });
                            })
                            .defaultIfEmpty(false);
                });
    }
}
