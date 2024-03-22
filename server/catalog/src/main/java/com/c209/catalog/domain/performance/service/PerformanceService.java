package com.c209.catalog.domain.performance.service;

import com.c209.catalog.domain.performance.dto.response.GetShowResponse;

public interface PerformanceService {
    GetShowResponse getShowDetails(Long showId);
}
