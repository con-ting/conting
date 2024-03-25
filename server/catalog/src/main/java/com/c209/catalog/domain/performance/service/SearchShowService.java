package com.c209.catalog.domain.performance.service;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;

import java.util.List;
import java.util.Optional;

public interface SearchShowService {
    Optional<List<Performance>> searchShows(
            Status status,
            String region,
            String sort,
            String keyword,
            String searchType,
            ReservationType reservation_type
    );
}
