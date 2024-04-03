package com.c209.catalog.domain.seller.service;

import com.c209.catalog.domain.seller.dto.response.SellerShowResponse;

public interface SellerShowService {
    SellerShowResponse getSellerShows(Long memberId, Long sellerId);
    boolean isSellerOwnedByMember(Long memberId, Long sellerId);
}
