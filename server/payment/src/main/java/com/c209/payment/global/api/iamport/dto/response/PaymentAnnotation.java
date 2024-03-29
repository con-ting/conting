package com.c209.payment.global.api.iamport.dto.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;



@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record PaymentAnnotation(
         String impUid,
         String merchantUid,
         String payMethod,
         String pgProvider,
         Integer amount
) {
}
