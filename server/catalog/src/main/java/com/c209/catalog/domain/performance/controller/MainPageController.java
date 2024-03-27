package com.c209.catalog.domain.performance.controller;


import com.c209.catalog.domain.performance.dto.response.GetMainPageResponse;
import com.c209.catalog.domain.performance.service.MainPageService;
import com.c209.catalog.domain.performance.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("catalog/main")
@RequiredArgsConstructor
public class MainPageController {
    private final MainPageService mainPageService;

    @GetMapping
    public ResponseEntity<GetMainPageResponse> getMainPage(
//            @RequestHeader("X-Authorization-Id") Long memberId,
    ) {
        return ResponseEntity.ok(mainPageService.getMainPage());
    }
}
