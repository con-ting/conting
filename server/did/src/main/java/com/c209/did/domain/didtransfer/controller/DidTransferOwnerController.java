package com.c209.did.domain.didtransfer.controller;

import com.c209.did.domain.didtransfer.data.dto.request.DidTransferRequest;
import com.c209.did.domain.didtransfer.data.dto.request.DidTransferV2Request;
import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;
import com.c209.did.domain.didtransfer.service.DidTransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/did/transfer/owner")
@RequiredArgsConstructor
public class DidTransferOwnerController {
    private final DidTransferService didTransferService;

    @GetMapping("/my")
    public ResponseEntity<List<DidTransferResponse>> getDidTransferListToUserId(
            @RequestHeader("X-Authorization-Id") Long ownerId
    ) {
        return ResponseEntity.ok(didTransferService.getDidTransferListByOwnerId(ownerId));
    }

    @GetMapping("/{performanceId}")
    public ResponseEntity<List<DidTransferResponse>> getDidTransferListToUserId(
            @PathVariable Long performanceId,
            @RequestHeader("X-Authorization-Id") Long ownerId
    ) {
        return ResponseEntity.ok(didTransferService.getDidTransferListByOwnerId(performanceId, ownerId));
    }

    @GetMapping("/{performanceId}/{buyerId}")
    public ResponseEntity<DidTransferResponse> getDidTransfer(
            @PathVariable Long performanceId,
            @PathVariable Long buyerId,
            @RequestHeader("X-Authorization-Id") Long ownerId
    ) {
        return ResponseEntity.ok(didTransferService.getDidTransfer(performanceId, ownerId, buyerId));
    }

    @PostMapping
    public ResponseEntity<Long> transfer(
            @RequestBody DidTransferRequest didTransferRequest,
            @RequestHeader("X-Authorization-Id") Long ownerId
    ) {
        long id = didTransferService.createDidTransfer(didTransferRequest, ownerId);
        return ResponseEntity
                .created(URI.create(String.valueOf(id)))
                .body(id);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Long>> transferList(
            @RequestBody List<DidTransferRequest> didTransferRequestList,
            @RequestHeader("X-Authorization-Id") Long ownerId
    ) {
        return ResponseEntity
                .ok()
                .body(didTransferRequestList.stream()
                        .map(x -> didTransferService.createDidTransfer(x, ownerId))
                        .toList());
    }

    @PostMapping("/v2")
    public ResponseEntity<List<Long>> transferV2(
            @RequestBody DidTransferV2Request didTransferV2Request,
            @RequestHeader("X-Authorization-Id") Long ownerId
    ) {
        return ResponseEntity
                .ok()
                .body(didTransferV2Request.families().stream()
                        .map(x -> didTransferService.createDidTransfer(DidTransferRequest.builder()
                                        .performanceId(didTransferV2Request.performanceId())
                                        .ownerId(didTransferV2Request.ownerId())
                                        .buyerId(x.id())
                                        .ownerWallet(didTransferV2Request.ownerWallet())
                                        .buyerWallet(x.wallet())
                                        .ownerFingerprintKey(didTransferV2Request.ownerFingerprintKey())
                                        .build(),
                                ownerId))
                        .toList());
    }
}
