package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.domain.singer.dto.response.GetSingerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
public class PerformanceController {
//    private final PerformanceService performanceService;

    @GetMapping("{show_id}")
    public ResponseEntity<GetSingerResponse> getSingerDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("show_id") Long showId
    ){
        return null;
//        return ResponseEntity.ok(performanceService.getShowDetails(showId));
    }
}
