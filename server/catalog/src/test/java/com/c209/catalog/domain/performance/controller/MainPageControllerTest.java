package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.response.GetMainPageResponse;
import com.c209.catalog.domain.performance.service.MainPageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

//@SpringBootTest
//@AutoConfigureMockMvc-> 모두 목빈으로 만듦(SpringBootTest에서)
@ExtendWith(SpringExtension.class)
@WebMvcTest(MainPageController.class)
public class MainPageControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MainPageService mainPageService;

    @Test
    void getMainPageInfosTest() throws Exception {
        GetMainPageResponse response = new GetMainPageResponse();

        when(mainPageService.getMainPage()).thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.get("/catalog/main")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }
}