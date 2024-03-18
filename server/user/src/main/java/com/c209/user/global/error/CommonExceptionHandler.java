package com.c209.user.global.error;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.dao.DataIntegrityViolationException;

@RestControllerAdvice
@Slf4j
public class CommonExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ErrorResponse commonExceptionHandler(CommonException e){
        return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
    }





    @ExceptionHandler(RuntimeException.class)
    public ErrorResponse runtimeExceptionHandler(RuntimeException e){
        //디버깅용으로 에러 스택을 로깅합니다.
        log.debug(e.getMessage());


        return ErrorResponse.builder(e, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()).build();
    }


    @ExceptionHandler(DataIntegrityViolationException.class)
    public ErrorResponse dataIntegrityViolationExceptionHandler(DataIntegrityViolationException e){
        return ErrorResponse.builder(e, HttpStatus.BAD_REQUEST, e.getMessage()).build();
    }


}
