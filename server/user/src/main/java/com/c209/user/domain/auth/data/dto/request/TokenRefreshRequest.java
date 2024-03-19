package com.c209.user.domain.auth.data.dto.request;

public record TokenRefreshRequest (
        String refreshToken,
        String accessToken
){
}
