package com.c209.payment.domain.pay.dto.response;

import lombok.Builder;

@Builder
public record PayAuthResponse(
        Boolean result
) {
}
