package com.c209.payment.global.api.iamport.dto.request;


import lombok.Builder;

@Builder
public record PreparePaymentRequest(
        String merchant_uid,
        int amount
) {

}

