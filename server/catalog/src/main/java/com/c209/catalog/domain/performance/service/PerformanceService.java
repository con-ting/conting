package com.c209.catalog.domain.performance.service;

import com.c209.catalog.domain.performance.dto.request.PostShowRequest;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;

public interface PerformanceService {
    public GetShowResponse getShowDetails(Long showId);

    void createShow(PostShowRequest postShowRequest);
}
