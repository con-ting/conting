package com.c209.catalog.domain.grade.repository;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    void deleteByPerformance(Performance performance);
}
