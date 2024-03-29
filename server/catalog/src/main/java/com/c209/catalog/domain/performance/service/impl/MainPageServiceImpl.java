package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.*;
import com.c209.catalog.domain.performance.dto.info.*;
import com.c209.catalog.domain.performance.dto.response.GetMainPageResponse;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.repository.MainPageRepository;
import com.c209.catalog.domain.performance.service.MainPageService;
import com.c209.catalog.domain.singer.exception.SingerErrorCode;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainPageServiceImpl implements MainPageService {
    private final MainPageRepository mainPageRepository;

    private List<PShowsDto> getPShowsDtoFromPShowsInfoList(List<PShowInfo> pShowInfoList) {
        return pShowInfoList.stream()
                .map(info -> PShowsDto.builder()
                        .show_id(info.getPShowId())
                        .poster(info.getPShowPoster())
                        .title(info.getPShowTitle())
                        .hall_id(info.getPShowHallId())
                        .hall_name(info.getPShowHallName())
                        .hall_address(info.getPShowHallAddress())
                        .reservation_type(String.valueOf(info.getPShowReservationType()))
                        .reservation_start_date_time(info.getPShowTicketOpenDate())
                        .reservation_end_date_time(info.getPShowTicketCloseDate())
                        .start_date(info.getPShowStartDate())
                        .end_date(info.getPShowEndDate())
                        .view(info.getPShowView())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    private List<FShowsDto> getFShowsDtoFromFShowsInfoList(List<FShowInfo> fShowInfoList) {
        return fShowInfoList.stream()
                .map(info -> FShowsDto.builder()
                        .show_id(info.getFShowId())
                        .poster(info.getFShowPoster())
                        .title(info.getFShowTitle())
                        .hall_id(info.getFShowHallId())
                        .hall_name(info.getFShowHallName())
                        .hall_address(info.getFShowHallAddress())
                        .reservation_type(String.valueOf(info.getFShowReservationType()))
                        .reservation_start_date_time(info.getFShowTicketOpenDate())
                        .reservation_end_date_time(info.getFShowTicketCloseDate())
                        .start_date(info.getFShowStartDate())
                        .end_date(info.getFShowEndDate())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    private List<RShowsDto> getRShowsDtoFromRShowsInfoList(List<RShowInfo> rShowInfoList) {
        return rShowInfoList.stream()
                .map(info -> RShowsDto.builder()
                        .show_id(info.getRShowId())
                        .poster(info.getRShowPoster())
                        .title(info.getRShowTitle())
                        .hall_id(info.getRShowHallId())
                        .hall_name(info.getRShowHallName())
                        .hall_address(info.getRShowHallAddress())
                        .reservation_type(String.valueOf(info.getRShowReservationType()))
                        .reservation_start_date_time(info.getRShowTicketOpenDate())
                        .reservation_end_date_time(info.getRShowTicketCloseDate())
                        .start_date(info.getRShowStartDate())
                        .end_date(info.getRShowEndDate())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    private List<PSingerDto> getPSingerDtoFromPSingerInfoList(List<PSingerInfo> pSingerInfoList) {
        return pSingerInfoList.stream()
                .map(info -> PSingerDto.builder()
                        .id(info.getPSingerId())
                        .name(info.getPSingerName())
                        .profile(info.getPSingerProfile())
                        .view(info.getPSingerView())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }
    @Override
    public GetMainPageResponse getMainPage() {
        List<PShowInfo> pShowInfoList = mainPageRepository
                .getPShowsList()
                .orElseThrow(() ->
                        new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW)
                );

        List<FShowInfo> fShowInfoList = mainPageRepository
                .getFShowsList()
                .orElseThrow(() ->
                        new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW)
                );

        List<RShowInfo> rShowInfoList = mainPageRepository
                .getRShowsList()
                .orElseThrow(() ->
                        new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW)
                );

        List<PSingerInfo> pSingerInfoList = mainPageRepository
                .getPSingerList()
                .orElseThrow(() ->
                        new CommonException(SingerErrorCode.NOT_EXIST_SINGER)
                );

        List<PShowsDto> pShowsDtoList = getPShowsDtoFromPShowsInfoList(pShowInfoList);
        List<FShowsDto> fShowsDtoList = getFShowsDtoFromFShowsInfoList(fShowInfoList);
        List<RShowsDto> rShowsDtoList = getRShowsDtoFromRShowsInfoList(rShowInfoList);
        List<PSingerDto> pSingerDtoList = getPSingerDtoFromPSingerInfoList(pSingerInfoList);

        return GetMainPageResponse.builder()
                .popular_shows(pShowsDtoList)
                .f_shows(fShowsDtoList)
                .r_shows(rShowsDtoList)
                .popular_singers(pSingerDtoList)
                .build();
    }

}
