package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.repository.SearchShowRepository;
import com.c209.catalog.domain.performance.service.SearchShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchShowServiceImpl implements SearchShowService {
    private final SearchShowRepository searchShowRepository;

    @Override
    public Optional<List<Performance>> searchShows(
            Status status,
            String region,
            String sort,
            String keyword,
            String searchType,
            ReservationType reservationType
    ) {
        return searchShowRepository.searchShowsByDetails(status, region, sort, keyword, searchType, reservationType);
    }
}
