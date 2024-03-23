//package com.c209.catalog.domain.performance.service.impl;
//
//import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
//import com.c209.catalog.domain.performance.entity.Performance;
//import com.c209.catalog.domain.performance.exception.PerformanceException;
//import com.c209.catalog.domain.performance.repository.PerformanceRepository;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.*;
//
//class PerformanceServiceImplTest {
//    @Mock
//    private PerformanceRepository performanceRepository;
//
//    @InjectMocks
//    private PerformanceServiceImpl performanceService;
//
//    @Test
//    @DisplayName("Performance ServiceImpl Test when show exists")
//    void testGetShowDetailsWhenShowExists() {
//        // given
//        Long showId = 1L;
//        Performance performance = new Performance();
//        List<Performance> performances = new ArrayList<>();
//        performances.add(performance);
//
//        when(performanceRepository.getPerformanceByShowId(anyLong())).thenReturn(Optional.of(Collections.singletonList(performance)));
//
//        // when
//        GetShowResponse response = performanceService.getShowDetails(showId);
//
//        // then
//        assertNotNull(response);
//        verify(performanceRepository, times(1)).getPerformanceByShowId(showId);
//    }
//
//    @Test
//    @DisplayName("Test getShowDetails when show does not exist")
//    void testGetShowDetailsWhenShowDoesNotExist() {
//        // given
//        Long showId = 1L;
//
//        // Mocking repository response
//        when(performanceRepository.getPerformanceByShowId(anyLong())).thenReturn(Optional.empty());
//
//        // when, then
//        PerformanceException exception = assertThrows(PerformanceException.class, () -> performanceService.getShowDetails(showId));
//        assertEquals("NOT_EXIST_SHOW", exception.getHttpStatus().toString());
//        verify(performanceRepository, times(1)).getPerformanceByShowId(showId);
//    }
//}

package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.repository.PerformanceRepository;
import com.c209.catalog.global.exception.CommonException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

class PerformanceServiceImplTest {

    @Mock
    private PerformanceRepository performanceRepository;

    @InjectMocks
    private PerformanceServiceImpl performanceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test getShowDetails when show exists")
    void testGetShowDetailsWhenShowExists() {
        // given
        Long showId = 1L;

        when(performanceRepository.getPerformanceByShowId(anyLong()))
                .thenReturn(Optional.of(Collections.singletonList(new PerformanceDetailInfo())));

        // when
        GetShowResponse response = performanceService.getShowDetails(showId);

        // then
        assertNotNull(response);
    }

    @Test
    @DisplayName("Test getShowDetails when show does not exist")
    void testGetShowDetailsWhenShowDoesNotExist() {
        // given
        Long showId = 1L;

        // Mock repository response
        when(performanceRepository.getPerformanceByShowId(anyLong())).thenReturn(Optional.empty());

        // when, then
        CommonException exception = assertThrows(CommonException.class, () -> performanceService.getShowDetails(showId));
        assertEquals("NOT_EXIST_SHOW", exception.getHttpStatus().toString());
    }
}
