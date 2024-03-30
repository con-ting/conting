package com.c209.ticket.global.exception;

import com.c209.ticket.domain.ticket.exception.QRErrorCode;
import com.c209.ticket.domain.ticket.exception.TicketErrorCode;
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


    public CommonException(QRErrorCode errorCode) {
        this.message = errorCode.getMessage();
        this.httpStatus = errorCode.getHttpStatus();
    }

    public CommonException(TicketErrorCode errorCode) {
        this.message = errorCode.getMessage();
        this.httpStatus = errorCode.getHttpStatus();
    }
}
