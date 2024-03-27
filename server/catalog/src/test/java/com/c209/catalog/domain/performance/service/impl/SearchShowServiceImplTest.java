package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.repository.SearchShowRepository;
import com.c209.catalog.global.exception.CommonException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class SearchShowServiceImplTest {
    @Mock
    private SearchShowRepository searchShowRepository;

    @InjectMocks
    private SearchShowServiceImpl searchShowService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test searchShows when show exists")
    void testSearchShowWhenExists() {
        // given
        Status status = Status.on_sale;
        String region = "region";
        String sort = "이름순";
        String keyword = "keyword";
        String searchType = "가수";
        ReservationType reservationType = ReservationType.R;

        List<PerformanceSearchDto> mockDtoList = Collections.singletonList(new PerformanceSearchDto());
        when(searchShowRepository.searchShowsByDetails(status, region, sort, keyword, searchType, reservationType))
                .thenReturn(Optional.of(mockDtoList));

        // when
        SearchShowResponse response = searchShowService.searchShows(status, region, sort, keyword, searchType, reservationType);

        // then
        assertNotNull(response);
    }

    @Test
    @DisplayName("Test searchShows when show does not exist")
    void testSearchShowWhenNotExists() {
        // given
        Status status = Status.on_sale;
        String region = "region";
        String sort = "이름순";
        String keyword = "keyword";
        String searchType = "가수";
        ReservationType reservationType = ReservationType.R;

        when(searchShowRepository.searchShowsByDetails(status, region, sort, keyword, searchType, reservationType))
                .thenReturn(Optional.empty());

        // when
        assertThrows(CommonException.class, () -> searchShowService.searchShows(status, region, sort, keyword, searchType, reservationType));
    }
}