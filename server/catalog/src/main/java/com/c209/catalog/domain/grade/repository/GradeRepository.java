package com.c209.catalog.domain.grade.repository;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    void deleteByPerformance(Performance performance);

    @Query("SELECT g " +
            "FROM Grade g " +
            "WHERE g.performance = :performance")
    List<Grade> findByPerformance(Performance performance);
}
