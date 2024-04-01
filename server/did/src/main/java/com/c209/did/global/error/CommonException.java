package com.c209.did.global.error;


import com.c209.did.domain.didtransfer.exception.DidTransferErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {

    private final String message;
    private final HttpStatus httpStatus;

    public CommonException(DidTransferErrorCode errorCode) {
        message = errorCode.getMessage();
        httpStatus = errorCode.getHttpStatus();
    }

    public CommonException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }


}
