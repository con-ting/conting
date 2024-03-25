package com.c209.catalog.domain.performance.service;

import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;

public interface SearchShowService {
    SearchShowResponse searchShows(
            Status status,
            String region,
            String sort,
            String keyword,
            String searchType,
            ReservationType reservation_type
    );
}
