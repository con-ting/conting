package com.c209.batchservice.domain.catalog.repository;

import com.c209.batchservice.domain.catalog.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
}
