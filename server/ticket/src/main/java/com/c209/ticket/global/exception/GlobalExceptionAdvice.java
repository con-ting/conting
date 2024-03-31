package com.c209.ticket.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {

    @ExceptionHandler(CommonException.class)
    public ErrorResponse commonExceptionHandler(CommonException e){
        log.error(e.getHttpStatus().toString());
        return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
    }

//    @ExceptionHandler(NumberFormatException.class)
//    public ErrorResponse numberFormatExceptionHandler(NumberFormatException e){
//        log.error(e.getMessage());
//
//        return ErrorResponse.builder(e, HttpStatus.BAD_REQUEST, e.getMessage()).build();
//    }
//
//    @ExceptionHandler(ConversionFailedException.class)
//    public ErrorResponse conversionFailedException(ConversionFailedException e){
//        log.error(e.getMessage());
//
//        return ErrorResponse.builder(e, HttpStatus.BAD_REQUEST, e.getMessage()).build();
//    }

    //해당 핸들러는 가장 마지막에 위치해야합니다!!!
//    @ExceptionHandler(RuntimeException.class)
//    public ErrorResponse runtimeExceptionHandler(RuntimeException e){
//        return ErrorResponse.builder(e, HttpStatus.SERVICE_UNAVAILABLE, e.getMessage()).build();
//    }

}


