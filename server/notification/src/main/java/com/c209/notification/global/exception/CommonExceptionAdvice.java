package com.c209.notification.global.exception;


import com.c209.notification.domain.fcm.exception.FcmException;
import com.google.firebase.FirebaseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionAdvice {


    @ExceptionHandler(FcmException.class)
    ErrorResponse fcmExceptionHandler(FcmException e){
        return ErrorResponse.builder(e, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage() ).build();
    }

    @ExceptionHandler(FirebaseException.class)
    ErrorResponse firebaseMessagingException(FirebaseException e){
        return ErrorResponse.builder(e, HttpStatus.BAD_REQUEST, e.getMessage()).build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ErrorResponse illegalExceptionHandler(IllegalArgumentException e){
        return ErrorResponse.builder(e, HttpStatus.BAD_REQUEST, e.getMessage()).build();
    }



}
