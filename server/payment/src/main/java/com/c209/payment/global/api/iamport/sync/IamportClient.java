package com.c209.payment.global.api.iamport.sync;

import com.c209.payment.global.api.iamport.dto.request.CreateIamportAccessTokenRequest;
import com.c209.payment.global.api.iamport.dto.response.CreateIamportAccessTokenResponse;
import com.c209.payment.global.api.iamport.dto.response.PaymentResponse;
import com.c209.payment.global.api.iamport.dto.response.PreparePaymentResponse;
import com.c209.payment.global.api.iamport.dto.request.PreparePaymentRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "iamport-client", url = "https://api.iamport.kr")
public interface IamportClient {



    @PostMapping("/users/getToken")
    CreateIamportAccessTokenResponse createAccessToken(

            @RequestBody CreateIamportAccessTokenRequest createIamportAccessTokenRequest
    );


    @PostMapping("/payments/prepare")
    PreparePaymentResponse preparePayment(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody PreparePaymentRequest paymentRequest
    );


    @GetMapping("/payments/{imp_uid}")
    PaymentResponse getPayment(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable("imp_uid") String impUid
    );



}
