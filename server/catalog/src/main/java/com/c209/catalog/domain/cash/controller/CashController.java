package com.c209.catalog.domain.cash.controller;

import com.c209.catalog.domain.cash.dto.response.CashResponse;
import com.c209.catalog.domain.cash.service.CashService;
import com.c209.catalog.domain.performance.service.MainPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("catalog/cash")
@RequiredArgsConstructor
public class CashController {
    private final CashService cashService;

    @GetMapping
    public ResponseEntity<CashResponse> getCash() {
        return ResponseEntity.ok(cashService.getCash());
    }
}
