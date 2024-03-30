package com.c209.payment.global.api.iamport.dto.response;


import lombok.Getter;
public record CreateIamportAccessTokenResponse(
        Integer code,
        String message,
        AuthAnnotation response
) {
}
