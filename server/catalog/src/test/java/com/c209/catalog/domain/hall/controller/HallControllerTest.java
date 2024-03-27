package com.c209.catalog.domain.hall.controller;

import com.c209.catalog.domain.hall.dto.response.ViewResponse;
import com.c209.catalog.domain.hall.service.ViewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.c209.catalog.domain.hall.dto.response.HallsResponse;
import com.c209.catalog.domain.hall.service.HallService;
import org.junit.jupiter.api.DisplayName;
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

    @MockBean
    private ViewService viewService;

    @Test
    @DisplayName("get Hall by keyword and region")
    public void testGetHallResponse() throws Exception {
        // Given
        String keyword = "keyword";
        String region = "region";
        HallsResponse response = new HallsResponse(Collections.emptyList());

        // When
        when(hallService.findHallsByKeywordAndRegion(keyword, region)).thenReturn(response);

        // Then
        mockMvc.perform(get("/catalog/hall")
                        .param("keyword", keyword)
                        .param("region", region)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.halls").isArray());
    }

    @Test
    @DisplayName("get hall view by hall_id and show_id")
    public void testGetViewResponse() throws Exception {
        Long hall_id = 1L;
        Long show_id = 1L;

        ViewResponse response = new ViewResponse();

        // when
        when(viewService.findViewsByHallAndShow(hall_id, show_id)).thenReturn(response);

        // then
        mockMvc.perform(get("/catalog/hall/{hall_id}/show/{show_id}", hall_id, show_id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

}
