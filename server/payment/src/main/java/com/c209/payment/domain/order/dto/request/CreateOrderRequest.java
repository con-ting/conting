package com.c209.payment.domain.order.dto.request;

import com.c209.payment.global.api.iamport.dto.request.PreparePaymentRequest;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CreateOrderRequest(
        List<Long> seatList,
        String merchantUid,
        Integer amount
)
{

    public PreparePaymentRequest toPaymentRequest(){
        return PreparePaymentRequest.builder()
                .amount(this.amount)
                .merchant_uid(this.merchantUid)
                .build();
    }
}
