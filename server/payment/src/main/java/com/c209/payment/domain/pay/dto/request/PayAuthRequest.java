package com.c209.payment.domain.pay.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record PayAuthRequest(
        String impUid,
        String merchantUid,
        Integer amount
) {
}
