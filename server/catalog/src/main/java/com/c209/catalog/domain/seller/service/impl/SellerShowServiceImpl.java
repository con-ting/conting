package com.c209.catalog.domain.seller.service.impl;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.seller.dto.info.SellerShowInfo;
import com.c209.catalog.domain.seller.dto.response.SellerShowResponse;
import com.c209.catalog.domain.seller.entity.Seller;
import com.c209.catalog.domain.seller.exception.SellerErrorCode;
import com.c209.catalog.domain.seller.repository.SellerShowRepository;
import com.c209.catalog.domain.seller.service.SellerShowService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerShowServiceImpl implements SellerShowService {
    private final SellerShowRepository sellerShowRepository;

    private List<PerformanceSearchDto> getPerformanceSearchDtoFromSellerShowInfoList(List<SellerShowInfo> sellerShowInfoList) {
        return sellerShowInfoList.stream()
                .map(info -> PerformanceSearchDto.builder()
                        .show_id(info.getShow_id())
                        .title(info.getTitle())
                        .reservation_type(info.getReservation_type())
                        .status(info.getStatus())
                        .start_date(info.getStart_date())
                        .end_date(info.getEnd_date())
                        .reservation_start_date_time(info.getReservation_start_date())
                        .reservation_end_date_time(info.getReservation_end_date())
                        .hall_id(info.getHall_id())
                        .hall_name(info.getHall_name())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public SellerShowResponse getSellerShows(Long memberId, Long sellerId) {
        if (!isSellerOwnedByMember(memberId, sellerId)) {
            throw new CommonException(SellerErrorCode.NOT_SELLER);
        }

        List<SellerShowInfo> sellerShowInfoList = sellerShowRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW));

        List<PerformanceSearchDto> sellerShowList = getPerformanceSearchDtoFromSellerShowInfoList(sellerShowInfoList);
        return SellerShowResponse.builder().show(sellerShowList).build();
    }

    @Override
    public boolean isSellerOwnedByMember(Long memberId, Long sellerId) {
        Seller seller = sellerShowRepository.findById(sellerId).orElse(null);
        return seller != null && seller.getUserId().equals(memberId);
    }
}
