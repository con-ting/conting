package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.PShowsDto;
import com.c209.catalog.domain.performance.dto.info.PShowInfo;
import com.c209.catalog.domain.performance.dto.response.GetMainPageResponse;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.repository.MainPageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SqlGroup(value = {
        @Sql(value = "/sql/total.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD),
        @Sql(value = "/sql/delete.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
})
class MainPageServiceImplTest {
    @Mock
    private MainPageRepository mainPageRepository;

    @InjectMocks
    private MainPageServiceImpl mainPageService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    @DisplayName("Test get Popular Shows when show exists")
//    void getShowListsAndSingersServiceTest() {
//
//        when(mainPageRepository.getPShowsList())
//                .thenReturn(List<PShowsDto>);
//        // when
//        GetMainPageResponse response = mainPageService.getMainPage();
//
//        // then
//        assertNotNull(response);
//    }
}