package com.c209.user.global.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@AllArgsConstructor
public enum JwtErrorCode {
    EXPIRED_TOKEN("토큰이 만료되었습니다.", UNAUTHORIZED),
    INVALID_TOKEN("사용할 수 없는 토큰 입니다.", UNAUTHORIZED);

    private final String message;
    private HttpStatus httpStatus;
}