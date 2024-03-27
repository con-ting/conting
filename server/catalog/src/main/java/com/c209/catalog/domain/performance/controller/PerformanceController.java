package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.request.PostShowRequest;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
<<<<<<< HEAD
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
=======
>>>>>>> parent of 7d8c4c2 ([BE]Add: 컨트롤러 추가)
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
import java.util.Optional;
=======
import java.util.Collections;
import java.util.List;
>>>>>>> parent of 7d8c4c2 ([BE]Add: 컨트롤러 추가)

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceService performanceService;

    @GetMapping("{show_id}")
    public ResponseEntity<GetShowResponse> getSingerDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable(value = "show_id") Long showId
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
<<<<<<< HEAD
    public ResponseEntity<SearchShowResponse> searchShows(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @RequestParam(value = "status", required = false, defaultValue = "") Status status,
            @RequestParam(value = "region", required = false, defaultValue = "") String region,
            @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "searchType", required = false, defaultValue = "") String searchType,
            @RequestParam(value = "reservationType", required = false, defaultValue = "") ReservationType reservation_type
=======
    public ResponseEntity<List<SearchShowResponse>> searchShows(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "region", required = false) String region,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "searchType", required = false) String searchType,
            @RequestParam(value = "reservation_type", required = false) String reservation_type
>>>>>>> parent of 7d8c4c2 ([BE]Add: 컨트롤러 추가)
    ) {
        return ResponseEntity.ok(Collections.emptyList());
    }
}
