package com.c209.catalog.domain.schedule.service.impl;

import com.c209.catalog.domain.schedule.dto.ScheduleDto;
import com.c209.catalog.domain.schedule.dto.TimeDto;
import com.c209.catalog.domain.schedule.dto.info.ScheduleInfo;
import com.c209.catalog.domain.schedule.dto.response.GetScheduleResponse;
//import com.c209.catalog.domain.schedule.repository.ScheduleRepository;
import com.c209.catalog.domain.schedule.exception.ScheduleErrorCode;
import com.c209.catalog.domain.schedule.repository.ScheduleRepository;
import com.c209.catalog.domain.schedule.service.ScheduleService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {
    public final ScheduleRepository scheduleRepository;

    private ScheduleDto convertToScheduleDtos(List<ScheduleInfo> scheduleInfos) {
        List<ScheduleDto> scheduleDtos = new ArrayList<>();
        for (ScheduleInfo scheduleInfo : scheduleInfos) {
            ScheduleDto scheduleDto = ScheduleDto.builder()
                    .startDate(scheduleInfo.getStartTime())
                    .timeList(convertToTimeDtos(scheduleInfo.getTimeList()))
                    .build();
            scheduleDtos.add(scheduleDto);
        }
        return scheduleDtos;
    }

    private List<TimeDto> convertToTimeDtos(List<ScheduleInfo.TimeSlot> timeSlots) {
        List<TimeDto> timeDtos = new ArrayList<>();
        for (ScheduleInfo.TimeSlot timeSlot : timeSlots) {
            TimeDto timeDto = TimeDto.builder()
                    .id(timeSlot.getId())
                    .startTime(timeSlot.getStartTime())
                    .build();
            timeDtos.add(timeDto);
        }
        return timeDtos;
    }

    @Override
    public GetScheduleResponse getScheduleDetails(Long showId) {
        Optional<List<ScheduleInfo>> optionalSchedules = scheduleRepository.getSchedulesByShowId(showId);
        if (optionalSchedules.isPresent()) {
            List<ScheduleDto> scheduleDtos = convertToScheduleDtos(optionalSchedules.get());
            return GetScheduleResponse.builder().schedule(scheduleDtos).build();
        } else throw (new CommonException(ScheduleErrorCode.NOT_EXIST_SCHEDULE));
    }
}
