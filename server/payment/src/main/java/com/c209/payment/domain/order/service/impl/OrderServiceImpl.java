package com.c209.payment.domain.order.service.impl;

import com.c209.payment.domain.order.dto.request.CreateOrderRequest;
import com.c209.payment.domain.order.dto.response.CreateOrderResponse;
import com.c209.payment.domain.order.entity.Order;
import com.c209.payment.domain.order.entity.OrderedSeat;
import com.c209.payment.domain.order.entity.PGStatus;
import com.c209.payment.domain.order.exception.OrderError;
import com.c209.payment.domain.order.repository.async.OrderAsyncRepository;
import com.c209.payment.domain.order.repository.sync.OrderSyncRepository;
import com.c209.payment.domain.order.repository.sync.OrderedSyncRepository;
import com.c209.payment.domain.order.service.OrderService;
import com.c209.payment.global.api.iamport.sync.IamportClient;
import com.c209.payment.global.api.iamport.sync.IamportClientService;
import com.c209.payment.global.api.seat.SeatClient;
import com.c209.payment.global.exception.CommonException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.c209.payment.domain.order.exception.OrderError.CONFLICT_MERCHANT_UID;
import static com.c209.payment.domain.order.exception.OrderError.CONFLICT_PG_ORDER_ID;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {



    private final SeatClient seatClient;
    private final IamportClient iamportClient;
    private final IamportClientService iamportClientService;



    private final OrderSyncRepository orderSyncRepository;
    private final OrderedSyncRepository orderedSyncRepository;



    //to-do 나중에 비동기로 바꿔야한다.

    @Override
    @Transactional
    public CreateOrderResponse createOrder(CreateOrderRequest request, Long userId) {
        //seat 서버에서 조회
        if(!seatClient.getSeatStatusList(request.seatList(), userId).isAvailable()){
            throw new CommonException(OrderError.NOT_AVAILABLE_SEAT);
        }

        //결제 정보 PG사 사전 등록
        iamportClientService.prepare(request.toPaymentRequest());


        //동일한 merchat_id가 있는지 검사
        if(orderSyncRepository.existsByMerchantUid(request.merchantUid())){
            throw new CommonException(CONFLICT_MERCHANT_UID);
        }


        //db에 저장하기
        //order 객체 저장
        Order order = Order.builder()
                .buyerId(userId)
                .amount(request.amount())
                .merchantUid(request.merchantUid())
                .pgStatus(PGStatus.CAPTURE_REQUEST)
                .pgRetryCount(0)
                .build();
        Order savedOrder = orderSyncRepository.save(order);
        //seat 리스트 저장
        for(Long seatId : request.seatList()){
            OrderedSeat orderedSeat = OrderedSeat.
                    builder()
                    .order(savedOrder)
                    .seatId(seatId)
                    .build();

            orderedSyncRepository.save(orderedSeat);
        }

        return CreateOrderResponse.builder().result(true).build();

    }




}
