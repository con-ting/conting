package com.c209.catalog.domain.hall.repository;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.domain.hall.entity.HallGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HallGradeRepository extends JpaRepository<HallGrade, Long> {
    @Query("DELETE FROM HallGrade " +
            "WHERE grade.id = :grade_id")
    void deleteByGrade(Long grade_id);
}
