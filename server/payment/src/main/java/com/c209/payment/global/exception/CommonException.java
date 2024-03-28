package com.c209.payment.global.exception;

import com.c209.payment.domain.order.exception.OrderError;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {

    private final String message;
    private final HttpStatus httpStatus;


    public CommonException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public CommonException(OrderError error) {
        this.message = error.getMessage();
        this.httpStatus = error.getHttpStatus();
    }
}
