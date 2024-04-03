package com.c209.ticket.domain.ticket.service.impl;

import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.dto.response.TicketListResponse;
import com.c209.ticket.domain.ticket.dto.response.TicketPaymentsListResponse;
import com.c209.ticket.domain.ticket.entity.Status;
import com.c209.ticket.domain.ticket.entity.Ticket;
import com.c209.ticket.domain.ticket.entity.TicketSync;
import com.c209.ticket.domain.ticket.exception.TicketErrorCode;
import com.c209.ticket.domain.ticket.repository.async.TicketAsyncRepository;
import com.c209.ticket.domain.ticket.repository.sync.TicketSyncRepository;
import com.c209.ticket.domain.ticket.service.TicketService;
import com.c209.ticket.global.api.NotificationRestClient;
import com.c209.ticket.global.api.dto.FcmRequest;
import com.c209.ticket.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.*;
import java.util.List;
import java.util.UUID;

import static com.c209.ticket.domain.ticket.exception.QRErrorCode.QR_EXPIRED_ERROR;
import static com.c209.ticket.domain.ticket.exception.QRErrorCode.QR_INVALID_ERROR;
import static com.c209.ticket.domain.ticket.exception.TicketErrorCode.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class TicketServiceImpl implements TicketService {
    private final TicketAsyncRepository ticketAsyncRepository;
    private final TicketSyncRepository ticketSyncRepository;

    @Override
    public Mono<TicketListResponse> getUserTickerList(Long userId) {
        return ticketAsyncRepository.findAllNotUsedTicketByOwnerId(userId).collectList().map(TicketListResponse::new);
    }




    private final ReactiveRedisTemplate<String, String> reactiveRedisTemplate;
    private final NotificationRestClient notificationRestClient;




    @Override
    public Mono<TicketDto> getTicketDetail(Long userId, Long ticketId, String fingerPrint) {

        Mono<Ticket> ticketMono = ticketAsyncRepository.findByTicketId(ticketId)
                .switchIfEmpty(Mono.error(new CommonException(TICKET_NOT_FOUND)));

        //티켓의 isUsed 여부 판단
        //?


        Mono<Long> ownerIdMono = ticketMono.map(Ticket::getOwnerId);


        Mono<Boolean> isOwnerMatchedMono = ownerIdMono.map(ownerId -> ownerId.equals(userId));
        Mono<Boolean> isUsedMono = ticketMono.map(Ticket::getIsUsed);



        Mono<Boolean> isFingerPrintMatchedMono = ticketMono.map(Ticket::getFingerprintKey)
                .map(storedFingerPrint -> {
                    try {
                        MessageDigest digest = MessageDigest.getInstance("SHA-256");
                        byte[] hashedStoredFingerPrint = digest.digest(storedFingerPrint.getBytes());
                        byte[] hashedFingerPrint = digest.digest(fingerPrint.replace(" ", "+").getBytes()); // 공백 제거

                        return MessageDigest.isEqual(hashedStoredFingerPrint, hashedFingerPrint);
                    } catch (NoSuchAlgorithmException e) {
                        e.printStackTrace();
                        return false;
                    }
                });

        return Mono.zip(isOwnerMatchedMono, isFingerPrintMatchedMono, ticketMono, isUsedMono)
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
        if (ticket.getIsUsed()) {
            return Mono.error(new CommonException(TICKET_ALREADY_USED)); // ticket이 이미 사용되었을 경우 예외 발생
        }
        return Mono.just(ticket);
    }



    @Override
    public Mono<Boolean> verifyQR(Long userId, String qrUUID, Long ticketId) {
        return ticketAsyncRepository.findByTicketId(ticketId)
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
                                                    .then(ticketAsyncRepository.findByTicketId(ticketId)
                                                            .flatMap(existingTicket -> {
                                                                existingTicket.setIsUsed(true);
                                                                return ticketAsyncRepository.save(existingTicket).
                                                                        thenReturn(true);
                                                            }));
                                        });
                            })
                            .defaultIfEmpty(false);
                });
    }

    @Override
    public Mono<TicketPaymentsListResponse> getTicketPaymentsList(Long userId) {
        return ticketAsyncRepository.findAllTicketPayments(userId).collectList().map(TicketPaymentsListResponse::new);
    }
    //모든 티켓의 상태를 환불됨으로 바꿉니다. -> 해당 ticket 중 하나의 impUid로 환불 요청을 진행합니다.

    //환불된 티켓의 좌석 정보를 d당첨된 티켓 리스트에 옮겨 담습니다.



    @Override
    public boolean refund(Long userId, Long ticketId) {
        log.info("조회하는 티켓 id{}", ticketId);
        TicketSync ticket = ticketSyncRepository.findByTicketId(ticketId)
                .orElseThrow(()-> new CommonException(TICKET_NOT_FOUND));

        //현재 ticket_id가 ownerId 또는 buyerId와 일치하는지 확인합니다.
        if(!ticket.getBuyerId().equals(userId)){
            throw new CommonException( "구매자만 환불할 수 있습니다.",HttpStatus.BAD_REQUEST);
        }


        //일치할 경우에만 buyerId, 해당 티켓의 schedule_id와 연관된 모든 티켓을 가져옵니다.
        //해당 티켓을 순회합니다.
        //모든 티켓의 상태를 환불됨으로 바꿉니다.
        List<TicketSync> refundTickets = ticketSyncRepository.findByBuyerIdAndImpUid(userId, ticket.getImpUid());

        refundTickets.forEach(t -> {
            t.setStatus(Status.환불됨);
        });


        log.info("환불 내역 : {}", refundTickets);
        ticketSyncRepository.saveAll(refundTickets);


        //티켓의 개수만큼 동일 schedule_id이며 status=환불대기인 티켓 리스트를 가져옵니다.

        List<TicketSync> reIssueTickets = ticketSyncRepository.findRandomRefundPendingTicketsByScheduleId(ticket.getScheduleId());
        int reIssueNum = Math.min(refundTickets.size(), reIssueTickets.size());

        log.info("재발급 후보 티켓들 {} ::",reIssueTickets);


        reIssueTickets = reIssueTickets.subList(0, reIssueNum);
        LocalDateTime payDueDate = LocalDate.now().plusDays(1).atTime(LocalTime.MAX);
        for(int i=0; i<reIssueNum; i++){
            reIssueTickets.get(i).setStatus(Status.결제대기);
            reIssueTickets.get(i).setCol(refundTickets.get(i).getCol());
            reIssueTickets.get(i).setRow(refundTickets.get(i).getRow());
            reIssueTickets.get(i).setNftUrl(refundTickets.get(i).getNftUrl());
            reIssueTickets.get(i).setPayDueDate(payDueDate);
            log.info("환불표가 발생했습니다! "+payDueDate.toLocalDate().toString() +" 23:59분까지 결제를 완료해주세요!");
            try{
                notificationRestClient.sendFcm(FcmRequest
                    .builder()
                    .receiver_id(reIssueTickets.get(i).getOwnerId())
                            .title("[콘팅] :: 환불표 발생 알림")
                            .body(("환불표가 발생했습니다! "+payDueDate.toLocalDate().toString() +" 23:59분까지 결제를 완료해주세요!"))
                    .build());
            }catch(Exception e){
                e.printStackTrace();
            }
            
        }


        log.info("재발급된 티켓 {}", reIssueTickets);
        ticketSyncRepository.saveAll(reIssueTickets);
        return true;
    }
}
