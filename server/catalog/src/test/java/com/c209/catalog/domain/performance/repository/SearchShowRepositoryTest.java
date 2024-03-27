package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SqlGroup(value = {
        @Sql(value = "/sql/total.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD),
        @Sql(value = "/sql/delete.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
})
@ExtendWith(SpringExtension.class)
@DataJpaTest(showSql = true)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SearchShowRepositoryTest {
    @Autowired
    private SearchShowRepository searchShowRepository;

    @Test
    void testSearchShowsByDetails() {
        Status status = Status.on_sale;
        String region = "SomeRegion";
        String sort = "예매일순";
        String keyword = "SomeKeyword";
        String searchType = "가수";
        ReservationType reservationType = ReservationType.R;

//        // When
//        List<PerformanceSearchDto> performances = searchShowRepository.searchShowsByDetails(status, region, sort, keyword, searchType, reservationType);
//
//        // Then
//        assertTrue(performances.isPresent());
//        assertEquals(2, performances.get().size());
    }
}