package com.c209.catalog.domain.seller.controller;

import com.c209.catalog.domain.seller.dto.response.SellerShowResponse;
import com.c209.catalog.domain.seller.service.SellerShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("catalog/seller")
@RequiredArgsConstructor
public class SellerController {
    private final SellerShowService sellerShowService;

    @GetMapping("{seller_id}/show")
    public ResponseEntity<SellerShowResponse> getSellerShow(
            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable(value = "seller_id") Long sellerId
    ) {
        return ResponseEntity.ok(sellerShowService.getSellerShows(memberId, sellerId));
    }
}
