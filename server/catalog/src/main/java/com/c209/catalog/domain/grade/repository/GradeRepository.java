package com.c209.catalog.domain.grade.repository;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {

    @Query("DELETE FROM Grade " +
            "WHERE performance.id = :performance_id")
    void deleteByPerformance(Long performance_id);

    @Query("SELECT g " +
            "FROM Grade g " +
            "WHERE g.performance.id = :performance_id")
    List<Grade> findByPerformance(Long performance_id);
}
