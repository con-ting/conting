package com.c209.payment.global.api.iamport.dto.response;

public record PaymentResponse(
        Integer code,
        String message,
        PaymentAnnotation response

) {
}
