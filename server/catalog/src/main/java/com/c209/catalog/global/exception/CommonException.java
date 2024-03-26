package com.c209.catalog.global.exception;

import com.c209.catalog.domain.hall.exception.HallErrorCode;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.exception.PerformancePostErrorCode;
import com.c209.catalog.domain.performance.exception.PerformanceSearchErrorCode;
import com.c209.catalog.domain.performance.exception.PerformancerErrorCode;
import com.c209.catalog.domain.schedule.exception.ScheduleErrorCode;
import com.c209.catalog.domain.singer.exception.SingerErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {

    private final String message;
    private final HttpStatus httpStatus;

    public CommonException(SingerErrorCode singerErrorCode) {
        this.message = singerErrorCode.getMessage();
        this.httpStatus = singerErrorCode.getHttpStatus();
    }

    public CommonException(HallErrorCode hallErrorCode) {
        this.message = hallErrorCode.getMessage();
        this.httpStatus = hallErrorCode.getHttpStatus();
    }

    public CommonException(PerformanceErrorCode performanceErrorCode) {
        this.message = performanceErrorCode.getMessage();
        this.httpStatus = performanceErrorCode.getHttpStatus();
    }

    public CommonException(PerformancerErrorCode performancerErrorCode) {
        this.message = performancerErrorCode.getMessage();
        this.httpStatus = performancerErrorCode.getHttpStatus();
    }

    public CommonException(PerformancePostErrorCode performancePostErrorCode) {
        this.message = performancePostErrorCode.getMessage();
        this.httpStatus = performancePostErrorCode.getHttpStatus();
    }

    public CommonException(ScheduleErrorCode scheduleErrorCode) {
        this.message = scheduleErrorCode.getMessage();
        this.httpStatus = scheduleErrorCode.getHttpStatus();
    }

    public CommonException(PerformanceSearchErrorCode performanceSearchErrorCode) {
        this.message = performanceSearchErrorCode.getMessage();
        this.httpStatus = performanceSearchErrorCode.getHttpStatus();
    }

    public CommonException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
