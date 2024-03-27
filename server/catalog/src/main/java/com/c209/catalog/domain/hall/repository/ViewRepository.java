package com.c209.catalog.domain.hall.repository;

import com.c209.catalog.domain.hall.dto.HallViewDto;
import com.c209.catalog.domain.hall.dto.info.ViewInfo;
import com.c209.catalog.domain.hall.entity.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ViewRepository extends JpaRepository<Hall, Long> {
    @Query("select new com.c209.catalog.domain.hall.dto.info.ViewInfo (" +
            "s.id, " +
            "g.id, g.grade, g.performance, g.price, " +
            "hg.id, hg.viewUrl, hg.grade )" +
            "FROM HallGrade hg " +
            "JOIN hg.grade g " +
            "JOIN g.performance s " +
            "WHERE g.performance.id = :show_id")
    Optional<List<ViewInfo>> findViews(Long show_id);

    @Query("select new com.c209.catalog.domain.hall.dto.HallViewDto (" +
            "h.name, h.address, h.latitude, h.longitude )" +
            "FROM Hall h WHERE h.id = :hall_id")
    Optional<HallViewDto> findHallsById(Long hall_id);
}
