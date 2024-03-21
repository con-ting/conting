package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(PerformanceController.class)
class PerformanceControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PerformanceService performanceService;

    @Test
    public void testGetPerformanceResponse() throws Exception {
        // given
        Long show_id = 1L;

        GetShowResponse response = new GetShowResponse();
        // mock service response
        when(performanceService.getShowDetails(show_id)).thenReturn(response);

        // when, then
        mockMvc.perform(MockMvcRequestBuilders.get("/show/{show_id}", show_id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }
}