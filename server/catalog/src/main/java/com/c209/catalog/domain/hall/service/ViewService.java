package com.c209.catalog.domain.hall.service;

import com.c209.catalog.domain.hall.dto.response.ViewResponse;

public interface ViewService {
    public ViewResponse findViewsByHallAndShow(Long hallId, Long showId);
}
