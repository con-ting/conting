package com.c209.catalog.global.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ErrorResponse commonExceptionHandler(CommonException e){
        return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
    }

    //해당 핸들러는 가장 마지막에 위치해야합니다!!!
    @ExceptionHandler(RuntimeException.class)
    public ErrorResponse runtimeExceptionHandler(RuntimeException e){
        return ErrorResponse.builder(e, HttpStatus.SERVICE_UNAVAILABLE, e.getMessage()).build();
    }

}

