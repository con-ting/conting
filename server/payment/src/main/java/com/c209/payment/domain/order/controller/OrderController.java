package com.c209.payment.domain.order.controller;


import com.c209.payment.domain.order.dto.request.CreateOrderRequest;
import com.c209.payment.domain.order.dto.request.OrderSuccessRequest;
import com.c209.payment.domain.order.dto.response.CreateOrderResponse;
import com.c209.payment.domain.pay.dto.request.PayAuthRequest;
import com.c209.payment.domain.pay.dto.response.PayAuthResponse;
import com.c209.payment.domain.pay.service.PayAsyncService;
import com.c209.payment.domain.order.service.OrderService;
import com.c209.payment.domain.pay.service.PayService;
import com.c209.payment.domain.pay.service.impl.PayServiceImpl;
import com.c209.payment.domain.seat.dto.request.SeatUpdateRequest;
import com.c209.payment.domain.seat.service.SeatProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@RestController()
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;
    private final SeatProducer seatProducer;
    private final PayServiceImpl payService;


    @GetMapping("/check")
    public ResponseEntity<Long> checkHealth(
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return ResponseEntity.ok(userId);
    }
    @PostMapping()
    public ResponseEntity<CreateOrderResponse> createOrder(
            @RequestBody CreateOrderRequest request,
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return ResponseEntity.ok(orderService.createOrder(request, userId));
    }

    @PostMapping("/success")
    ResponseEntity<PayAuthResponse> paySucceed(
            @RequestBody OrderSuccessRequest request){

        //아이엠포트 결제 단건 api를 조회해 db값과 비교한다.z
            //아이엠포트 통신시 에러가 났을 경우 최대 3회 더 수행하고 만료한다.
        payService.capture(request);


        log.info("요청 :: {}", request);
        //issue 발행
        seatProducer.updateSeat("update_seat", SeatUpdateRequest.builder().seatIds(request.seatIds()).isAvailable(false).build());
        seatProducer.issueTicket("success_order", request);
        return ResponseEntity.ok(PayAuthResponse.builder().result(true).build());
    }

    @GetMapping("/fail")
    ResponseEntity<PayAuthResponse> payFailed(PayAuthRequest reqeust){
        return ResponseEntity.ok(null);
    }



//
//    @GetMapping("/fail")
//    Mono<ResponseEntity<>>

}
