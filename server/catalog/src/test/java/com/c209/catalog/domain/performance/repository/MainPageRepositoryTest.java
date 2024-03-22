package com.c209.catalog.domain.performance.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.c209.catalog.domain.performance.dto.info.FShowInfo;
import com.c209.catalog.domain.performance.dto.info.PShowInfo;
import com.c209.catalog.domain.performance.dto.info.PSingerInfo;
import com.c209.catalog.domain.performance.dto.info.RShowInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;

import java.util.List;
import java.util.Optional;

@SqlGroup(value = {
        @Sql(value = "/sql/total.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD),
        @Sql(value = "/sql/delete.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
})
@DataJpaTest
class MainPageRepositoryTest {

    @Autowired
    private MainPageRepository mainPageRepository;

    @Test
    void testGetPShowsList() {
        Optional<List<PShowInfo>> pShowsListOptional = mainPageRepository.getPShowsList();
        assertTrue(pShowsListOptional.isPresent());
        List<PShowInfo> pShowsList = pShowsListOptional.get();
        assertFalse(pShowsList.isEmpty());
    }

    @Test
    void testGetFShowsList() {
        Optional<List<FShowInfo>> fShowsListOptional = mainPageRepository.getFShowsList();
        assertTrue(fShowsListOptional.isPresent());
        List<FShowInfo> fShowsList = fShowsListOptional.get();
        assertFalse(fShowsList.isEmpty());
    }

    @Test
    void testGetRShowsList() {
        Optional<List<RShowInfo>> rShowsListOptional = mainPageRepository.getRShowsList();
        assertTrue(rShowsListOptional.isPresent());
        List<RShowInfo> rShowsList = rShowsListOptional.get();
        assertFalse(rShowsList.isEmpty());
    }

    @Test
    void testGetPSingerList() {
        Optional<List<PSingerInfo>> pSingerListOptional = mainPageRepository.getPSingerList();
        assertTrue(pSingerListOptional.isPresent());
        List<PSingerInfo> pSingerList = pSingerListOptional.get();
        assertFalse(pSingerList.isEmpty());
    }
}
