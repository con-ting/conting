package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.FShowsDto;
import com.c209.catalog.domain.performance.dto.PShowsDto;
import com.c209.catalog.domain.performance.dto.RShowsDto;
import com.c209.catalog.domain.performance.dto.info.MainPageInfo;
import com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo;
import com.c209.catalog.domain.performance.dto.response.GetMainPageResponse;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.exception.PerformanceException;
import com.c209.catalog.domain.performance.repository.MainPageRepository;
import com.c209.catalog.domain.performance.service.MainPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainPageServiceImpl implements MainPageService {
    private final MainPageRepository mainPageRepository;

    private List<PShowsDto> getPShowsDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
        return mainPageInfoList.stream()
                .map(info -> PShowsDto.builder()
                        .show_id(info.getPShowId())
                        .poster(info.getPShowPoster())
                        .title(info.getPShowTitle())
                        .hall(info.getPShowHall())
                        .reservation_type(String.valueOf(info.getPShowReservationType()))
                        .reservation_start_date_time(info.getPShowTicketOpenDate())
                        .reservation_end_date_time(info.getPShowTicketCloseDate())
                        .start_date(info.getPShowStartDate())
                        .end_date(info.getPShowEndDate())
                        .build())
                .collect(Collectors.toList());
    };

    private List<FShowsDto> getFShowsDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
        return mainPageInfoList.stream()
                .map(info -> FShowsDto.builder()
                        .show_id(info.getFShowId())
                        .poster(info.getFShowPoster())
                        .title(info.getFShowTitle())
                        .hall(info.getFShowHall())
                        .reservation_type(String.valueOf(info.getFShowReservationType()))
                        .reservation_start_date_time(info.getFShowTicketOpenDate())
                        .reservation_end_date_time(info.getFShowTicketCloseDate())
                        .start_date(info.getFShowStartDate())
                        .end_date(info.getFShowEndDate())
                        .build()
                .collect(Collectors.toList()));
    };
//
//    private List<RShowsDto> getRShowsDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
//        return mainPageInfoList.stream()
//                .map(info -> PShowsDto.builder()
//
//                        .build())
//                .findAny()
//                .orElseThrow(() -> new PerformanceException(PerformanceErrorCode.NOT_EXIST_SHOW));
//    };
//    @Override
//    public GetMainPageResponse getMainPage();
}
