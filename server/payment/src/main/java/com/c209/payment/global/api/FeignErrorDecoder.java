package com.c209.payment.global.api;

import com.c209.payment.global.exception.CommonException;
import feign.Response;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Slf4j
public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String s, Response response) {
        log.error("Feign Client Error Response - Status: {}, Reason: {}, Body: {}", response.status(), response.reason(), response.body());

        //to-do 리팩토링하기
        int status = response.status();
        if(status==400){
            return new CommonException(response.reason(), HttpStatus.BAD_REQUEST);
        }else if(status ==401){
            return new CommonException(response.reason(), HttpStatus.UNAUTHORIZED);
        }
        else if(status ==404){
            return new CommonException(response.reason(), HttpStatus.BAD_REQUEST);
        }else if(status ==403){
            return new CommonException(response.reason(), HttpStatus.UNAUTHORIZED);
        }else{
            return new CommonException(response.reason(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
