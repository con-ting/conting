package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Seller;
import lombok.Builder;

@Builder
public record SellerDto(
        Long id,
        String wallet
) {
    public static SellerDto of(Seller seller) {
        return SellerDto.builder()
                .id(seller.getId())
                .wallet(seller.getWallet())
                .build();
    }
}
