package com.c209.catalog.domain.schedule.service.impl;

import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.schedule.dto.ScheduleDto;
import com.c209.catalog.domain.schedule.dto.TimeDto;
import com.c209.catalog.domain.schedule.dto.info.ScheduleInfo;
import com.c209.catalog.domain.schedule.dto.response.GetScheduleResponse;
import com.c209.catalog.domain.schedule.exception.ScheduleErrorCode;
import com.c209.catalog.domain.schedule.repository.ScheduleRepository;
import com.c209.catalog.domain.schedule.service.ScheduleService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {
    public final ScheduleRepository scheduleRepository;

    @Override
    public GetScheduleResponse getScheduleDetails(Long showId) {
        if (showId == null) {
            throw new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW);
        }
        Optional<List<ScheduleInfo>> optionalSchedules = scheduleRepository.getSchedulesByShowId(showId);

        if (optionalSchedules.isEmpty() || optionalSchedules.get().isEmpty()) {
            throw new CommonException(ScheduleErrorCode.NOT_EXIST_SCHEDULE);
        }

        List<ScheduleDto> scheduleDtoList = groupSchedules(optionalSchedules.get());

        return GetScheduleResponse.builder()
                .schedule(scheduleDtoList)
                .build();
    }

    private List<ScheduleDto> groupSchedules(List<ScheduleInfo> schedules) {
        schedules.sort((s1, s2) -> s1.getStartTime().toLocalDate().compareTo(s2.getStartTime().toLocalDate()));

        Map<LocalDate, List<TimeDto>> scheduleMap = new HashMap<>();
        for (ScheduleInfo schedule : schedules) {
            LocalDate startDate = schedule.getStartTime().toLocalDate();
            TimeDto timeDto = TimeDto.builder()
                    .id(schedule.getScheduleId().toString())
                    .startTime(schedule.getStartTime().toLocalTime())
                    .build();
            scheduleMap.computeIfAbsent(startDate, k -> new ArrayList<>()).add(timeDto);
        }

        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        for (LocalDate startDate : scheduleMap.keySet()) {
            List<TimeDto> timeList = scheduleMap.get(startDate);
            scheduleDtoList.add(ScheduleDto.builder()
                    .startDate(startDate)
                    .timeList(timeList)
                    .build());
        }

        return scheduleDtoList;
    }
}
