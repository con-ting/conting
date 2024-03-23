package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.exception.PerformancePostErrorCode;
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceService performanceService;

    @GetMapping("{show_id}")
    public ResponseEntity<GetShowResponse> getSingerDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("show_id") Long showId
    ){
        return ResponseEntity.ok(performanceService.getShowDetails(showId));
    }

//    @PostMapping()
//    public ResponseEntity<?> postShow(
////            @RequestBody
////            PostShowDto postShowDto;
//    ) {
//        try {
//
//        } catch (CommonException(PerformancePostErrorCode)) {
//            return CommonException(PerformancePostErrorCode);
//        }
//    }
}
