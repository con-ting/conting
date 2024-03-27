package com.c209.catalog.domain.performance.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum PerformanceSearchErrorCode {
    NOT_FOUND_SHOW("검색 조건에 맞는 공연이 없습니다.", HttpStatus.OK);

    private final String message;
    private final HttpStatus httpStatus;
}
