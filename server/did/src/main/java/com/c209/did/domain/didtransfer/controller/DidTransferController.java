package com.c209.did.domain.didtransfer.controller;

import com.c209.did.domain.didtransfer.data.dto.request.DidTransferRequest;
import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;
import com.c209.did.domain.didtransfer.service.DidTransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/did/transfer")
@RequiredArgsConstructor
public class DidTransferController {
    private final DidTransferService didTransferService;

    @GetMapping("/my")
    public ResponseEntity<List<DidTransferResponse>> getDidListByUserId(
            @RequestHeader("X-Authorization-Id") Long userId
    ) {
        return ResponseEntity.ok(didTransferService.getDidTransferListByBuyerId(userId));
    }

    @PostMapping
    public ResponseEntity<Long> transfer(
            @RequestBody DidTransferRequest didTransferRequest,
            @RequestHeader("X-Authorization-Id") Long userId
    ) {
        long id = didTransferService.createDid(didTransferRequest, userId);
        return ResponseEntity
                .created(URI.create(String.valueOf(id)))
                .body(id);
    }
}
