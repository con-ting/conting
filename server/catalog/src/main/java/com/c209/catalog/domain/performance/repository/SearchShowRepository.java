package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SearchShowRepository extends JpaRepository<Performance, Long> {
   Optional<List<Performance>> searchShowsByDetails(
            Status status,
            String region,
            String sort,
            String keyword,
            String searchType,
            ReservationType reservationType
    );
}
