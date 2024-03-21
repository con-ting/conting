package com.c209.catalog.domain.performance.exception;

import com.c209.catalog.global.exception.CommonException;

public class PerformanceException extends CommonException {

    public PerformanceException(PerformanceErrorCode performanceErrorCode) {
        super(performanceErrorCode.getMessage(), performanceErrorCode.getHttpStatus());
    }
}