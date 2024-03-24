package com.c209.catalog.domain.schedule.controller;

import com.c209.catalog.domain.schedule.dto.response.GetScheduleResponse;
import com.c209.catalog.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("{show_id}")
    public ResponseEntity<GetScheduleResponse> getScheduleDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("show_id") Long showId
    ) {
        return ResponseEntity.ok(scheduleService.getScheduleDetails(showId));
    }
}
