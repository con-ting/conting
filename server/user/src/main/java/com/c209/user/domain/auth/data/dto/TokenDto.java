package com.c209.user.domain.auth.data.dto;

import lombok.Builder;

@Builder

public record TokenDto (
        String accessToken,
        String refreshToken
){
}
