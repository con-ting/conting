package com.c209.queue.global.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;
import com.c209.queue.global.error.CommonException;

@RestControllerAdvice
@Slf4j
public class CommonAdvice {

    @ExceptionHandler(CommonException.class)
    Mono<ErrorResponse> commonExceptionHandler(CommonException e)
    {
        return Mono.just(
                ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build()
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    Mono<ErrorResponse> dataIntegrityViolationExceptionHandler(DataIntegrityViolationException e){
        return Mono.just(
                ErrorResponse.builder(e, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()).build()
        );
    }


    @ExceptionHandler(RuntimeException.class)
    public Mono<ErrorResponse> RuntimeExceptionHandler(RuntimeException e){
        log.error(e.getMessage());
        return Mono.just(ErrorResponse.builder(e, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()).build());
    }




}
