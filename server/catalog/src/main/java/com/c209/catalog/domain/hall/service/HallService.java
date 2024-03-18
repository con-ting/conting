package com.c209.catalog.domain.hall.service;

import com.c209.catalog.domain.hall.dto.HallDto;

import java.util.List;

public interface HallService {
    List<HallDto> findHallsByKeywordAndRegion(String keyword, String region);
}
