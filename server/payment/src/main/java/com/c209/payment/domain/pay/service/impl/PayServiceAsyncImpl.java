package com.c209.payment.domain.pay.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class PayServiceAsyncImpl  {
//
//    private final OrderAsyncRepository orderAsyncRepository;
//    private final RedisRepository redisRepository;
//
//    private final IamportApi iamportApi;
//    @Override
//    @Transactional
//    public Mono<Boolean> authSucceed(PayAuthRequest request) {
//        return orderAsyncRepository.getOrderByPgOrderId(request.merchantUid())
//                .flatMap(order -> {
//                    order.setPgKey(request.impUid());
//                    order.setPgStatus(PGStatus.AUTH_SUCCESS);
//                    if (!order.getAmount().equals(request.amount())) {
//                        order.setPgStatus(PGStatus.AUTH_INVALID);
//                        return Mono.just(false);
//                    } else {
//                        return orderAsyncRepository.save(order).thenReturn(true);
//                    }
//                });
//    }
//
//
//    @Override
//    @Transactional
//    public Mono<Void> authFailed(PayAuthRequest request) {
//        return orderAsyncRepository.getOrderByPgOrderId(request.merchantUid())
//                .flatMap(order -> {
//                    if (order.getPgStatus() == PGStatus.CREATE) {
//                        order.setPgStatus(PGStatus.AUTH_FAIL);
//                        return orderAsyncRepository.save(order).then();
//                    } else {
//                        return Mono.empty();
//                    }
//                });
//    }
//
//    @Override
//    @Transactional
//    public Mono<Void> capture(PayAuthRequest request) {
//        return orderAsyncRepository.getOrderByPgOrderId(request.merchantUid())
//                .flatMap(order -> {
//                    order.setPgStatus(PGStatus.CAPTURE_REQUEST);
//                    return orderAsyncRepository.save(order)
//                            .then(Mono.fromRunnable(() -> capture(order)));
//                });
//    }
//
//    @Transactional
//    public Mono<Void> capture(OrderAsync order) {
//        if (!Arrays.asList(PGStatus.CAPTURE_REQUEST, PGStatus.CAPTURE_RETRY).contains(order.getPgStatus())) {
//            return Mono.error(new CommonException("이미 캡처 처리가 완료되었습니다.", HttpStatus.BAD_REQUEST));
//        }
//        order.increaseRetryCount();
//
//        return redisRepository.put(order)
//                .then(Mono.defer(() -> iamportApi.createAccessTokenAndGetPayHistory(order.getPgOrderId())
//                        .doOnNext(res -> log.debug(">> res: {}", res))
//                        .flatMap(res -> {
//                            order.setPgStatus(PGStatus.CAPTURE_SUCCESS);
//                            return orderAsyncRepository.save(order);
//                        })
//                        .onErrorResume(e -> {
//                            log.error(e.getMessage(), e);
//                            if (e instanceof WebClientRequestException) {
//                                order.setPgStatus(PGStatus.CAPTURE_RETRY);
//                            } else if (e instanceof WebClientResponseException) {
//                                log.debug(">> res error: {}", e);
//                                order.setPgStatus(PGStatus.CAPTURE_FAIL);
//                            } else {
//                                order.setPgStatus(PGStatus.CAPTURE_FAIL);
//                            }
//                            if (order.getPgStatus() == PGStatus.CAPTURE_RETRY && order.getPgRetryCount() >= 3) {
//                                order.setPgStatus(PGStatus.CAPTURE_FAIL);
//                            }
//                            return orderAsyncRepository.save(order)
//                                    .then(redisRepository.remove(order.getOrderId()))
//                                    .then(Mono.defer(() -> {
//                                        if (order.getPgStatus() == PGStatus.CAPTURE_RETRY) {
//                                            return recapture(order.getOrderId());
//                                        }
//                                        return recapture(-1);
//                                    }));
//                        })
//                ));
//    }
//
//    public Mono<Void> recapture(Long orderId) {
//        return orderAsyncRepository.getOrderByOrderId(orderId)
//                .flatMap(orderAsync -> {
//                    log.debug(">> recapture: " + orderAsync);
//                    long backoffDelay = getBackoffDelay(orderAsync);
//                    log.debug(">> delay: " + backoffDelay + " ms");
//                    return Mono.delay(Duration.ofMillis(backoffDelay))
//                            .then(Mono.defer(() -> capture(orderAsync)));
//                });
//    }
//
//    private long getBackoffDelay(OrderAsync order) {
//        double temp = Math.pow(2.0, order.getPgRetryCount()) * 1000;
//        return (long) (temp + ThreadLocalRandom.current().nextInt(0, (int) temp));
//    }
}
