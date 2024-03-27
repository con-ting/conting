package com.c209.catalog.domain.hall.service.impl;

import com.c209.catalog.domain.hall.dto.HallViewDto;
import com.c209.catalog.domain.hall.dto.ViewDto;
import com.c209.catalog.domain.hall.dto.info.ViewInfo;
import com.c209.catalog.domain.hall.dto.response.ViewResponse;
import com.c209.catalog.domain.hall.exception.HallErrorCode;
import com.c209.catalog.domain.hall.exception.ViewErrorCode;
import com.c209.catalog.domain.hall.repository.ViewRepository;
import com.c209.catalog.domain.hall.service.ViewService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ViewServiceImpl implements ViewService {
    private final ViewRepository viewRepository;

    private List<ViewDto> getViewsFromViewInfoList(List<ViewInfo> viewInfoList) {
        return viewInfoList.stream()
                .map(info -> ViewDto.builder()
                        .grade(info.getGrades())
                        .url(info.getViewUrl())
                        .price(info.getPrice())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public ViewResponse findViewsByHallAndShow(Long hall_id, Long show_id) {
        List<ViewInfo> viewInfoList = viewRepository
                .findViews(show_id)
                .orElseThrow(() ->
                        new CommonException(ViewErrorCode.NOT_FOUND_VIEW)
                );
        List<ViewDto> viewDto = getViewsFromViewInfoList(viewInfoList);

        HallViewDto hallViewDto = viewRepository
                .findHallsById(hall_id)
                .orElseThrow(() ->
                        new CommonException(HallErrorCode.NOT_EXIST_HALL)
                );

        return ViewResponse.builder()
                .data(viewDto)
                .hall(hallViewDto)
                .build();
    }
}
