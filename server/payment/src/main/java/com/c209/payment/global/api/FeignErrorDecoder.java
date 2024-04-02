package com.c209.payment.global.api;

import com.c209.payment.global.exception.CommonException;
import feign.Response;
import feign.Util;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import feign.Response.Body;
import feign.Util;
import java.io.IOException;

@Slf4j
public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String s, Response response) {
        log.error("Feign Client Error Response - Status: {}, Reason: {}, Body: {}", response.status(), response.reason(), getResponseBody(response));
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

     // Response.Body를 문자열로 변환하는 메서드
    private String getResponseBody(Response response) {
        if (response.body() != null) {
            try {
                Body body = response.body();
                if (body != null) {
                    return Util.toString(body.asReader());
                }
            } catch (IOException e) {
                log.error("Error reading response body", e);
            }
        }
        return "Empty response body";
    }
}
