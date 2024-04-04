package com.c209.did.domain.didtransfer.controller;

import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;
import com.c209.did.domain.didtransfer.service.DidTransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/did/transfer/buyer")
@RequiredArgsConstructor
public class DidTransferBuyerController {
    private final DidTransferService didTransferService;

    @GetMapping("/my")
    public ResponseEntity<List<DidTransferResponse>> getDidTransferListToUserId(
            @RequestHeader("X-Authorization-Id") Long buyerId
    ) {
        return ResponseEntity.ok(didTransferService.getDidTransferListByBuyerId(buyerId));
    }

    @GetMapping("/{performanceId}")
    public ResponseEntity<List<DidTransferResponse>> getDidTransferListToUserId(
            @PathVariable Long performanceId,
            @RequestHeader("X-Authorization-Id") Long buyerId
    ) {
        return ResponseEntity.ok(didTransferService.getDidTransferListByBuyerId(buyerId, performanceId));
    }
}
