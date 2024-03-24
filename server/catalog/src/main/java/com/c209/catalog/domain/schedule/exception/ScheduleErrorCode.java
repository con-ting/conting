package com.c209.catalog.domain.schedule.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public class ScheduleErrorCode {

    NOT_EXIST_SCHEDULE("공연일정이 없습니다.",BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
