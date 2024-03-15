package com.c209.catalog.domain.hall.exception;
import com.c209.catalog.global.exception.CommonException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum HallErrorCode {
    NOT_EXIST_HALL("공연장을 조회할 수 없습니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
