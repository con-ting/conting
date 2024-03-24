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
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {
    public final ScheduleRepository scheduleRepository;

    private List<TimeDto> getTimeDtoList(ScheduleInfo scheduleInfo) {
        List<TimeDto> timeDtoList = new ArrayList<>();
        LocalTime startTime = scheduleInfo.getStartTime().toLocalTime();

        timeDtoList.add(TimeDto.builder()
                .id(scheduleInfo.getScheduleId().toString())
                .startTime(startTime)
                .build());

        return timeDtoList;
    }

    @Override
    public GetScheduleResponse getScheduleDetails(Long showId) {
        if (showId == null) {
            throw new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW);
        }
        Optional<List<ScheduleInfo>> optionalSchedules = scheduleRepository.getSchedulesByShowId(showId);

        if (optionalSchedules.isEmpty() || optionalSchedules.get().isEmpty()) {
            throw new CommonException(ScheduleErrorCode.NOT_EXIST_SCHEDULE);
        }

        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        List<ScheduleInfo> schedules = optionalSchedules.get();
        for (ScheduleInfo schedule : schedules) {
            LocalDate startDate = schedule.getStartTime().toLocalDate();
            List<TimeDto> timeList = getTimeDtoList(schedule);
            scheduleDtoList.add(ScheduleDto.builder()
                    .startDate(startDate)
                    .timeList(timeList)
                    .build());
        }

        return GetScheduleResponse.builder()
                .schedule(scheduleDtoList)
                .build();
    }
}