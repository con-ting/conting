package com.c209.payment.global.api.iamport.dto.response;

public record PreparePaymentResponse(
        int code,
        String message,
        PaymentPrepareAnnotation response
) {

    @Override
    public String toString() {
        return "PreparePaymentResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", response=" + response +
                '}';
    }
}
