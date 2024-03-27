package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.repository.SearchShowRepository;
import com.c209.catalog.domain.performance.service.SearchShowService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchShowServiceImpl implements SearchShowService {
    private final SearchShowRepository searchShowRepository;

    @Override
    public SearchShowResponse searchShows(
            Status status,
            String region,
            String sort,
            String keyword,
            String searchType,
            ReservationType reservationType
    ) {
        Optional<List<PerformanceSearchDto>> searchResult = searchShowRepository.searchShowsByDetails(status, region, sort, keyword, searchType, reservationType);


        if (searchResult.isEmpty()) {
            throw new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW);
        }

        List<PerformanceSearchDto> performanceSearchDtos = searchResult.get();

        if (status != null) {
            performanceSearchDtos = performanceSearchDtos.stream()
                    .filter(dto -> dto.getStatus() == status)
                    .collect(Collectors.toList());
        }

        if (region != null) {
            performanceSearchDtos = performanceSearchDtos.stream()
                    .filter(dto -> dto.getHall_address().contains(region))
                    .collect(Collectors.toList());
        }

        if (reservationType != null) {
            performanceSearchDtos = performanceSearchDtos.stream()
                    .filter(dto -> dto.getReservation_type() == reservationType)
                    .collect(Collectors.toList());
        }

        if (searchType != null) {
            if (searchType.equals("가수")) {
                performanceSearchDtos = performanceSearchDtos.stream()
                        .filter(dto -> dto.getSinger_name().contains(keyword))
                        .collect(Collectors.toList());
            } else if (searchType.equals("공연장")) {
                performanceSearchDtos = performanceSearchDtos.stream()
                        .filter(dto -> dto.getHall_name().contains(keyword))
                        .collect(Collectors.toList());
            } else if (searchType.equals("공연명")) {
                performanceSearchDtos = performanceSearchDtos.stream()
                        .filter(dto -> dto.getTitle().contains(keyword))
                        .collect(Collectors.toList());
            }
        }

        switch (sort) {
            case "예매일순":
                performanceSearchDtos.sort(Comparator.comparing(PerformanceSearchDto::getReservation_start_date_time));
                break;
            case "이름순":
                performanceSearchDtos.sort(Comparator.comparing(PerformanceSearchDto::getTitle));
                break;
            case "공연일순":
                performanceSearchDtos.sort(Comparator.comparing(PerformanceSearchDto::getStart_date));
                break;
            default:
                break;
        }

        SearchShowResponse response = new SearchShowResponse();
        response.setPerformances(performanceSearchDtos);
        return response;
    }
}
