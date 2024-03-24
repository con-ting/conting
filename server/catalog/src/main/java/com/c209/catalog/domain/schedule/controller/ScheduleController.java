package com.c209.catalog.domain.schedule.controller;

import com.c209.catalog.domain.schedule.dto.response.GetScheduleResponse;
import com.c209.catalog.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<GetScheduleResponse> getScheduleDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @RequestParam("showId") Long showId
    ) {
        return ResponseEntity.ok(scheduleService.getScheduleDetails(showId));
    }
}
