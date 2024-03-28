package com.c209.catalog.domain.performance.service;

import com.c209.catalog.domain.performance.dto.request.PostShowRequest;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;

public interface PerformanceService {
    GetShowResponse getShowDetails(Long showId);

    void createShow(PostShowRequest postShowRequest);
    void deleteShow(Long show_id, Long member_id);
}
