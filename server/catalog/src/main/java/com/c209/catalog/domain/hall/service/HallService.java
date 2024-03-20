package com.c209.catalog.domain.hall.service;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.dto.response.HallsResponse;

import java.util.List;

public interface HallService {
    HallsResponse findHallsByKeywordAndRegion(String keyword, String region);
}
