package com.c209.catalog.domain.cash.service.impl;

import com.c209.catalog.domain.cash.dto.PerformanceDto;
import com.c209.catalog.domain.cash.dto.ScheduleDto;
import com.c209.catalog.domain.cash.dto.info.HallInfo;
import com.c209.catalog.domain.cash.dto.info.PerformanceInfo;
import com.c209.catalog.domain.cash.dto.info.ScheduleInfo;
import com.c209.catalog.domain.cash.dto.response.CashResponse;
import com.c209.catalog.domain.cash.repository.CashRepository;
import com.c209.catalog.domain.cash.service.CashService;
import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.exception.HallErrorCode;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.schedule.exception.ScheduleErrorCode;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CashServiceImpl implements CashService {
    private final CashRepository cashRepository;

    private List<PerformanceDto> getPerformanceInfo(List<PerformanceInfo> performanceInfos) {
        return performanceInfos.stream()
                .map(info -> PerformanceDto.builder()
                        .performance_id(info.getPerformance_id())
                        .title(info.getTitle())
                        .poster_image(info.getPoster_image())
                        .description_image(info.getDescription_image())
                        .hall_id(info.getHall_id())
                        .reservation_start_datetime(info.getReservation_start_datetime())
                        .reservation_end_datetime(info.getReservation_end_datetime())
                        .start_date(info.getStart_date())
                        .end_date(info.getEnd_date())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    private List<HallDto> getHallInfo(List<HallInfo> hallInfos) {
        return hallInfos.stream()
                .map(info -> HallDto.builder()
                        .id(info.getHall_id())
                        .name(info.getHall_name())
                        .address(info.getHall_address())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    private List<ScheduleDto> getScheduleInfo(List<ScheduleInfo> scheduleInfos) {
        return scheduleInfos.stream()
                .map(info -> ScheduleDto.builder()
                        .schedule_id(info.getSchedule_id())
                        .performance_id(info.getPerformance_id())
                        .start_time(info.getStart_time())
                        .end_time(info.getEnd_time())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }


    @Override
    public CashResponse getCash() {
        List<HallInfo> hallInfoList = cashRepository
                .getHallInfo()
                .orElseThrow(() ->
                        new CommonException(HallErrorCode.NOT_EXIST_HALL)
                );

        List<PerformanceInfo> performanceInfoList = cashRepository
                .getPerformanceInfo()
                .orElseThrow(() ->
                        new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW)
                );

        List<ScheduleInfo> scheduleInfoList = cashRepository
                .getScheduleInfo()
                .orElseThrow(() ->
                        new CommonException(ScheduleErrorCode.NOT_EXIST_SCHEDULE)
                );

        List<HallDto> hallDtos = getHallInfo(hallInfoList);
        List<PerformanceDto> performanceDtos = getPerformanceInfo(performanceInfoList);
        List<ScheduleDto> scheduleDtos = getScheduleInfo(scheduleInfoList);

        return CashResponse.builder()
                .performances(performanceDtos)
                .halls(hallDtos)
                .schedules(scheduleDtos)
                .build();
    }
}
