package com.c209.catalog.global.exception;

import com.c209.catalog.domain.singer.exception.SingerErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter

public class CommonException extends RuntimeException{

    private final String message;
    private final HttpStatus httpStatus;


    public CommonException(SingerErrorCode singerErrorCode) {
        this.message = singerErrorCode.getMessage();
        this.httpStatus = singerErrorCode.getHttpStatus();
    }
}
