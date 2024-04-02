package com.c209.payment.domain.pay.service.impl;


import com.c209.payment.domain.order.dto.request.OrderSuccessRequest;
import com.c209.payment.domain.order.entity.Order;
import com.c209.payment.domain.order.entity.PGStatus;
import com.c209.payment.domain.order.exception.OrderError;
import com.c209.payment.domain.order.repository.sync.OrderSyncRepository;
import com.c209.payment.domain.pay.dto.request.PayAuthRequest;
import com.c209.payment.global.api.iamport.dto.response.PaymentResponse;
import com.c209.payment.global.api.iamport.sync.IamportClientService;
import com.c209.payment.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class PayServiceImpl {

    private final IamportClientService iamportClientService;
    private final OrderSyncRepository orderSyncRepository;

    public void capture(Order order, String impUid){
        if (!Arrays.asList(PGStatus.CAPTURE_REQUEST, PGStatus.CAPTURE_RETRY).contains(order.getPgStatus())) {
            throw new CommonException("이미 캡처 처리가 완료되었습니다.", HttpStatus.BAD_REQUEST);
        }
        try{
            //실제 결제 내역 조회
            PaymentResponse response = iamportClientService.getPayment(impUid);
            order.setPgOrderId((response.response().impUid()));
            if(order.getAmount().equals(response.response().amount())){
                order.setPgStatus(PGStatus.AUTH_SUCCESS);
            }else{
                order.setPgStatus(PGStatus.AUTH_INVALID);
                throw new CommonException("사전등록시 등록했던 결제금액과 실제 결제 금액이 일치하지 않습니다.",HttpStatus.CONFLICT);
            }

        }catch(Exception e){
            e.printStackTrace();

            throw new CommonException("아이엠포트 통신중 에러가 발생했습니다. 로그를 확인해야합니다.", HttpStatus.INTERNAL_SERVER_ERROR);
//            if(order.getPgRetryCount()>2){
//                order.setPgStatus(PGStatus.CAPTURE_FAIL);
//            }else{
//                order.setPgStatus(PGStatus.CAPTURE_RETRY);
//            }
//            recapture(order, impUid);
        }finally{
            orderSyncRepository.save(order);
        }
    }

    public void capture(OrderSuccessRequest request){
        Order order = orderSyncRepository.getOrderByMerchantUid(request.merchantUid()).orElseThrow(()-> new CommonException(OrderError.NOT_EXIST_MERCHANT_UID));
        capture(order, request.impUid());
    }

    public void recapture(Order order, String impUid){
        long backoffDelay = getBackoffDelay(order.getPgRetryCount());

        capture(order, impUid);
    }

    private long getBackoffDelay(Integer retryCount){
        double tmp = Math.pow(2.0, retryCount) *1000;
        return (long) (tmp + ThreadLocalRandom.current().nextInt(0, (int) tmp));
    }



}
