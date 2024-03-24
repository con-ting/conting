package com.c209.catalog.domain.schedule.service.impl;

import com.c209.catalog.domain.schedule.dto.response.GetScheduleResponse;
import com.c209.catalog.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {
    @Override
    public GetScheduleResponse getScheduleDetails(Long showId) {
        return null;
    }
}
