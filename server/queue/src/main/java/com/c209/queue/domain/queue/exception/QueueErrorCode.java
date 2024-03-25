package com.c209.queue.domain.queue.exception;


import com.c209.queue.global.error.CommonException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum QueueErrorCode {
    QUEUE_ALREADY_REGISTERED_USER( "해당 유저가 이미 큐에 등록되어있습니다.", HttpStatus.CONFLICT) ;

    private final String message;
    private final HttpStatus httpStatus;

    public CommonException build(){
        return new CommonException(message, httpStatus);
    }

}
