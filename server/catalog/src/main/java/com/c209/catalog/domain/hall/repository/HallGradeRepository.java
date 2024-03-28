package com.c209.catalog.domain.hall.repository;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.domain.hall.entity.HallGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallGradeRepository extends JpaRepository<HallGrade, Long> {
    void deleteByGrade(Grade grade);
}
