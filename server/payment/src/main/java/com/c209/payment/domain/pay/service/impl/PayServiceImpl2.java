package com.c209.payment.domain.pay.service.impl;

import com.c209.payment.domain.order.repository.sync.OrderSyncRepository;
import com.c209.payment.global.api.iamport.sync.IamportClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PayServiceImpl2  {

    private final OrderSyncRepository orderSyncRepository;
//    private final RedisSyncRepository redisSyncRepository;
    private final IamportClientService iamportClientService;

//    @Override
//    @Transactional
//    public boolean authSucceed(PayAuthRequest request) {
//        Order order = orderSyncRepository.getOrderByPgOrderId(request.merchantUid()).orElseThrow(()->new CommonException(OrderError.NOT_EXIST_PG_ORDER_ID));
//        if (order != null) {
//            order.setPgKey(request.impUid());
//            order.setPgStatus(PGStatus.AUTH_SUCCESS);
//            if (!order.getAmount().equals(request.amount())) {
//                order.setPgStatus(PGStatus.AUTH_INVALID);
//                return false;
//            } else {
//                orderSyncRepository.save(order);
//                return true;
//            }
//        } else {
//            return false;
//        }
//    }
//
//    @Override
//    @Transactional
//    public void authFailed(PayAuthRequest request) {
//        Order order = orderSyncRepository.getOrderByPgOrderId(request.merchantUid()).orElseThrow(()-> new CommonException(OrderError.NOT_EXIST_PG_ORDER_ID));
//        if (order != null && order.getPgStatus() == PGStatus.CREATE) {
//            order.setPgStatus(PGStatus.AUTH_FAIL);
//            orderSyncRepository.save(order);
//        }
//    }
//
//    @Override
//    @Transactional
//    public void capture(PayAuthRequest request) {
//        Order order = orderSyncRepository.getOrderByPgOrderId(request.merchantUid()).orElseThrow(()-> new CommonException(OrderError.NOT_EXIST_PG_ORDER_ID));
//        if (order != null) {
//            order.setPgStatus(PGStatus.CAPTURE_REQUEST);
//            orderSyncRepository.save(order);
//            capture(order);
//        }
//    }
//
//    @Transactional
//    public void capture(Order order) {
//        if (!Arrays.asList(PGStatus.CAPTURE_REQUEST, PGStatus.CAPTURE_RETRY).contains(order.getPgStatus())) {
//            throw new CommonException("이미 캡처 처리가 완료되었습니다.", HttpStatus.BAD_REQUEST);
//        }
//        order.increaseRetryCount();
//
//        try {
//            redisSyncRepository.put(order);
//
//            String accessToken = iamportClientService.getAccessToken();
//
//            log.debug(">> access token response: {}", accessToken);
//
//            order.setPgStatus(PGStatus.CAPTURE_SUCCESS);
//            orderSyncRepository.save(order);
//
//            if (order.getPgStatus() == PGStatus.CAPTURE_RETRY && order.getPgRetryCount() >= 3) {
//                order.setPgStatus(PGStatus.CAPTURE_FAIL);
//            }
//
//            if (order.getPgStatus() == PGStatus.CAPTURE_RETRY) {
//                recapture(order.getOrderId());
//            }
//
//            redisSyncRepository.remove(order.getOrderId());
//
//        } catch (WebClientRequestException e) {
//            log.error(e.getMessage(), e);
//            order.setPgStatus(PGStatus.CAPTURE_RETRY);
//        } catch (WebClientResponseException e) {
//            log.debug(">> res error: {}", e);
//            order.setPgStatus(PGStatus.CAPTURE_FAIL);
//        } catch (Exception e) {
//            log.error("Error occurred during capturing order: {}", e.getMessage());
//            order.setPgStatus(PGStatus.CAPTURE_FAIL);
//        }finally{
//
//            orderSyncRepository.save(order);
//        }
//
//
//    }
//
//    public void recapture(Long orderId) {
//        orderSyncRepository.getOrderByOrderId(orderId)
//                .flatMap(orderAsync -> {
//                    log.debug(">> recapture: " + orderAsync);
//                    long backoffDelay = getBackoffDelay(orderAsync);
//                    log.debug(">> delay: " + backoffDelay + " ms");
//                    return Mono.delay(Duration.ofMillis(backoffDelay))
//                            .then(Mono.defer(() -> {
//                                capture(orderAsync);
//                                return Mono.empty();
//                            }));
//                }).block();
//    }
//
//    private long getBackoffDelay(OrderAsync order) {
//        double temp = Math.pow(2.0, order.getPgRetryCount()) * 1000;
//        return (long) (temp + ThreadLocalRandom.current().nextInt(0, (int) temp));
//    }
}
