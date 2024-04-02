package com.c209.did.domain.didtransfer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/did")
@RequiredArgsConstructor
public class DidController {
    @GetMapping("/health_check")
    public ResponseEntity<String> checkStatus() {
        return ResponseEntity.ok("ok");
    }
}
