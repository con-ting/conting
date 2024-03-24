package com.c209.catalog.domain.schedule.service;

import com.c209.catalog.domain.schedule.dto.response.GetScheduleResponse;

public interface ScheduleService {
    public GetScheduleResponse getScheduleDetails(Long showId);
}
