package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.exception.PerformanceSearchErrorCode;
import com.c209.catalog.domain.performance.repository.SearchShowRepository;
import com.c209.catalog.domain.performance.service.SearchShowService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
            throw new CommonException(PerformanceSearchErrorCode.NOT_FOUND_SHOW);
        }

        SearchShowResponse response = new SearchShowResponse();
        response.setPerformances(searchResult);
        return response;
    }
}
