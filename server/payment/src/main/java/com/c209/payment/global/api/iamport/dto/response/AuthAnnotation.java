package com.c209.payment.global.api.iamport.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AuthAnnotation(
        String accessToken,
        Integer expiredAt,
        Integer now
) {
}
