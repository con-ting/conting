package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.request.PostShowRequest;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceService performanceService;

    @GetMapping("{show_id}")
    public ResponseEntity<GetShowResponse> getSingerDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable(value = "show_id", required = false) Long showId
    ){
        return ResponseEntity.ok(performanceService.getShowDetails(showId));
    }

    @PostMapping()
    public ResponseEntity<String> postShow(@RequestBody PostShowRequest postShowRequest) {
        try {
            performanceService.createShow(postShowRequest);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Show Created");
        } catch (CommonException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<SearchShowResponse>> searchShows(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String reservation_type
    ) {
        return ResponseEntity.ok(Collections.emptyList());
    }
}
