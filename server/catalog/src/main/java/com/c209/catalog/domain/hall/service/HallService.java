package com.c209.catalog.domain.hall.service;

import com.c209.catalog.domain.hall.dto.response.HallsResponse;

public interface HallService {
    HallsResponse findHallsByKeywordAndRegion(String keyword, String region);
}
