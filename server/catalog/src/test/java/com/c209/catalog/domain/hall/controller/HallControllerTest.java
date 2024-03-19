package com.c209.catalog.domain.hall.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.c209.catalog.domain.hall.dto.response.HallsResponse;
import com.c209.catalog.domain.hall.service.HallService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;

@ExtendWith(SpringExtension.class)
@WebMvcTest(HallController.class)
public class HallControllerTest {

    @Autowired
    private MockMvc mockMvc;
    // mockmvc라는 객체를 테스트 할 때 사용

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private HallService hallService;

    @Test
    public void testGetHallResponse() throws Exception {
        // Given
        String keyword = "keyword";
        String region = "region";
        HallsResponse response = new HallsResponse(Collections.emptyList()); // Assuming an empty response for simplicity

        // When
        when(hallService.findHallsByKeywordAndRegion(keyword, region)).thenReturn(response);

        // Then
        mockMvc.perform(get("/hall")
                        .param("keyword", keyword)
                        .param("region", region)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.halls").isArray());
    }
}
