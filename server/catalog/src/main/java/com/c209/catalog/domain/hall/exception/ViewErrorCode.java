package com.c209.catalog.domain.hall.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ViewErrorCode {
    NOT_FOUND_VIEW("공연장 시야를 확인할 수 없습니다.",HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
