package com.c209.notification.domain.fcm.exception;

import com.google.api.Http;
import org.springframework.http.HttpStatus;

public class FcmException extends  RuntimeException{

    private HttpStatus httpStatus;
    private String message;

    public FcmException(FcmErrorCode errorCode) {
        this.httpStatus = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();

    }

    public FcmException(HttpStatus httpStatus, String message){
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
