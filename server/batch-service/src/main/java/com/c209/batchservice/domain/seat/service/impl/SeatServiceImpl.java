/**
 * This code was COPIED from "com.c209.seat" package.
 */
package com.c209.batchservice.domain.seat.service.impl;

import com.c209.batchservice.domain.seat.dto.SeatDto;
import com.c209.batchservice.domain.seat.repository.SeatRepository;
import com.c209.batchservice.domain.seat.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {
    private final SeatRepository seatRepository;

    @Override
    public List<SeatDto> getSeatList(Long scheduleId) {
        return seatRepository.findAllByScheduleId(scheduleId).stream()
                .map(SeatDto::of)
                .toList();
    }
}
