package com.c209.user.global.infra.coolsms.exception;


import net.nurigo.sdk.message.exception.NurigoBadRequestException;
import net.nurigo.sdk.message.exception.NurigoUnknownException;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CoolSmsExceptionHandler {

    //NurigoUnknownException
    //시크릿키가 유효하지 않은 경우
    @ExceptionHandler(NurigoUnknownException.class)
    public ErrorResponse invalidSecretKey(NurigoUnknownException e){
        e.printStackTrace();
        return ErrorResponse.builder(e, HttpStatus.SERVICE_UNAVAILABLE, "CoolSMS :: "+e.getMessage()).build();
    }



    //사용량을 전부 사용해서 추가 충전이 필요한 경우




}
