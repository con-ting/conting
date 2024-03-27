package com.c209.catalog.domain.performance.controller;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.dto.PostShowDTO;
import com.c209.catalog.domain.performance.dto.request.PostShowRequest;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.domain.performance.service.SearchShowService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@WebMvcTest(PerformanceController.class)
class PerformanceControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PerformanceService performanceService;

    @MockBean
    private SearchShowService searchShowService;

    @Autowired
    private ObjectMapper objectMapper;

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

    @Test
    void testCreateShow() throws Exception {
        PostShowRequest postShowRequest = createMockPostShowRequest();

        doNothing().when(performanceService).createShow(any(PostShowRequest.class));

        mockMvc.perform(MockMvcRequestBuilders.post("/show")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(postShowRequest)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().string("Show Created"));
    }

    private PostShowRequest createMockPostShowRequest() {
        return PostShowRequest.builder()
                .show(createMockShowDTO())
                .build();
    }

    private PostShowDTO createMockShowDTO() {
        return PostShowDTO.builder()
                .title("Mock Show")
                .reservationStartDatetime(LocalDateTime.now())
                .reservationEndDatetime(LocalDateTime.now().plusDays(1))
                .build();
    }

    @Test
    void testSearchShows() throws Exception {
        // Given
        Status status = Status.on_sale;
        String region = "Region";
        String sort = "Sort";
        String keyword = "Keyword";
        String searchType = "SearchType";
        ReservationType reservationType = ReservationType.R;

        List<PerformanceSearchDto> searchResults = new ArrayList<>();

        Optional<List<PerformanceSearchDto>> optionalSearchResults = Optional.of(searchResults);

        when(searchShowService.searchShows(any(), any(), any(), any(), any(), any()))
                .thenReturn(new SearchShowResponse(optionalSearchResults));

        // When, then
        mockMvc.perform(MockMvcRequestBuilders.get("/show")
                        .param("status", status.toString())
                        .param("region", region)
                        .param("sort", sort)
                        .param("keyword", keyword)
                        .param("searchType", searchType)
                        .param("reservationType", reservationType.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }
}