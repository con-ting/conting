package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.request.PostShowRequest;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.domain.performance.service.SearchShowService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceService performanceService;
    private final SearchShowService searchShowService;

    @GetMapping("{show_id}")
    public ResponseEntity<GetShowResponse> getSingerDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable(value = "show_id") Long showId
    ){
        return ResponseEntity.ok(performanceService.getShowDetails(showId));
    }

    @DeleteMapping({"{show_id}"})
    public ResponseEntity<Void> deletePerformance(@PathVariable Long show_id) {
        performanceService.deleteShow(show_id);
        return ResponseEntity.noContent().build();
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
    public ResponseEntity<SearchShowResponse> searchShows(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @RequestParam(value = "status", required = false, defaultValue = "") Status status,
            @RequestParam(value = "region", required = false, defaultValue = "") String region,
            @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "searchType", required = false, defaultValue = "") String searchType,
            @RequestParam(value = "reservationType", required = false, defaultValue = "") ReservationType reservation_type
    ) {
        return ResponseEntity.ok(searchShowService.searchShows(status, region, sort, keyword, searchType, reservation_type));
    }
}
