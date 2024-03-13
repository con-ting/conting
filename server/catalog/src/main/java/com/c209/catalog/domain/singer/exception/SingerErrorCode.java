package com.c209.catalog.domain.singer.exception;

import com.c209.catalog.global.exception.CommonException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum SingerErrorCode {

    NOT_EXIST_SINGER("가수를 조회할 수 없습니다.", BAD_REQUEST);



    private final String message;
    private final HttpStatus httpStatus;

}
