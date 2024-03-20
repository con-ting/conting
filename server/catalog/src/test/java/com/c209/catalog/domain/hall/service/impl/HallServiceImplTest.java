package com.c209.catalog.domain.hall.service.impl;

import com.c209.catalog.domain.hall.dto.response.HallsResponse;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.hall.repository.HallRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HallServiceImplTest {

    @Mock
    private HallRepository hallRepository;

    @InjectMocks
    private HallServiceImpl hallService;

    @Test
    @DisplayName("Hall ServiceImpl Test : findByNameContainingAndAddressContaining Service Test")
    void testGetHalls(){
        // given
        // findByNameContainingAndAddressContaining메서드가 호출될 때 목 객체의 동작 설정
        String keyword = "hall";
        String region = "address";
        List<Hall> halls = new ArrayList<>();
        halls.add(new Hall(1L, "Hall 1", "1234567890", "www.example.com", 0.0f, 0.0f, "Address 1", true, false, false, false, false, false, false, false, false, false, 100));
        halls.add(new Hall(2L, "Hall 2", "0987654321", "www.example.com", 0.0f, 0.0f, "Address 2", true, false, false, false, false, false, false, false, false, false, 150));

        // Mockito의 when 메서드를 사용하여 목 객체의 동작 설정
        when(hallRepository.findByNameContainingAndAddressContaining(anyString(), anyString())).thenReturn(halls);

        // when
        // 실제 테스트할 메서드 호출
        HallsResponse response = hallService.findHallsByKeywordAndRegion(keyword, region);

        // then
        assertNotNull(response);
        assertEquals(2, response.getHalls().size());
    }
}
