package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.*;
import com.c209.catalog.domain.performance.dto.info.MainPageInfo;
import com.c209.catalog.domain.performance.dto.response.GetMainPageResponse;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.exception.PerformanceException;
import com.c209.catalog.domain.performance.repository.MainPageRepository;
import com.c209.catalog.domain.performance.service.MainPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainPageServiceImpl implements MainPageService {
    private final MainPageRepository mainPageRepository;

    private List<PShowsDto> getPShowsDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
        return mainPageInfoList.stream()
                .sorted(Comparator.comparing(MainPageInfo::getPShowView).reversed())
                .limit(10)
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
                        .view(info.getPShowView())
                        .build())
                .collect(Collectors.toList());
    }

    // reservation_start_date_time 지금 혹은 이후인 것들 중 reservation_start_date_time 가 지금과 가까운 순
    private List<FShowsDto> getFShowsDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
        return mainPageInfoList.stream()
                .filter(info -> info.getFShowTicketOpenDate().isAfter(LocalDateTime.now()))
                .sorted(Comparator.comparing(MainPageInfo::getFShowTicketOpenDate))
                .limit(10)
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
                        .build())
                .collect(Collectors.toList());
    }

    // reservation_end_date_time 지금 혹은 이후인 것들 중,reservation_end_date_time 가 가까운 순
    private List<RShowsDto> getRShowsDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
        return mainPageInfoList.stream()
                .filter(info -> info.getRShowTicketOpenDate().isAfter(LocalDateTime.now()))
                .sorted(Comparator.comparing(MainPageInfo::getRShowTicketOpenDate))
                .limit(10)
                .map(info -> RShowsDto.builder()
                        .show_id(info.getRShowId())
                        .poster(info.getRShowPoster())
                        .title(info.getRShowTitle())
                        .hall(info.getRShowHall())
                        .reservation_type(String.valueOf(info.getRShowReservationType()))
                        .reservation_start_date_time(info.getRShowTicketOpenDate())
                        .reservation_end_date_time(info.getRShowTicketCloseDate())
                        .start_date(info.getRShowStartDate())
                        .end_date(info.getRShowEndDate())
                        .build())
                .collect(Collectors.toList());
    }

    // view 기준 내림차순
    private List<PSingerDto> getSingerDtoFromMainPageInfoList(List<MainPageInfo> mainPageInfoList) {
        return mainPageInfoList
                .stream()
                .sorted(Comparator.comparing(MainPageInfo::getPSingerView).reversed())
                .limit(10)
                .map(info -> PSingerDto.builder()
                        .id(info.getPSingerId())
                        .name(info.getPSingerName())
                        .profile(info.getPSingerProfile())
                        .view(info.getPSingerView())
                        .build())
                .sorted()
                .collect(Collectors.toList());
    }
    @Override
    public GetMainPageResponse getMainPage() {
        List<MainPageInfo> mainPageInfoList = mainPageRepository
                .getMainPageList()
                .orElseThrow(() ->
                        new PerformanceException(PerformanceErrorCode.NOT_EXIST_SHOW)
                );

        List<PShowsDto> pShowsDtoList = getPShowsDtoFromMainPageInfoList(mainPageInfoList);
        List<FShowsDto> fShowsDtoList = getFShowsDtoFromMainPageInfoList(mainPageInfoList);
        List<RShowsDto> rShowsDtoList = getRShowsDtoFromMainPageInfoList(mainPageInfoList);
        List<PSingerDto> pSingerDtoList = getSingerDtoFromMainPageInfoList(mainPageInfoList);

        return GetMainPageResponse.builder()
                .popular_shows(pShowsDtoList)
                .f_shows(fShowsDtoList)
                .r_shows(rShowsDtoList)
                .popular_singers(pSingerDtoList)
                .build();
    }

}
