package com.c209.user.domain.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
@AllArgsConstructor
public enum UserErrorCode {
    NOT_FOUND_USER("유저를 조회할 수 없습니다.", HttpStatus.BAD_REQUEST);


    private final String message;
    private final HttpStatus httpStatus;
}
