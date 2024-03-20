package com.c209.catalog.domain.performance.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum PerformanceErrorCode {
    NOT_EXIST_SHOW("공연을 조회할 수 없습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}

