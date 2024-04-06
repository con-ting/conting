package com.c209.catalog.domain.singer.repository;


import com.c209.catalog.domain.singer.dto.info.SingerAndAlbumInfo;
import com.c209.catalog.domain.singer.dto.info.SingerListInfo;
import com.c209.catalog.domain.singer.entity.Singer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SingerRepository extends JpaRepository<Singer, Long> {

    @Query("SELECT new com.c209.catalog.domain.singer.dto.info.SingerAndAlbumInfo(" +
           "s.id, " +
           "s.name, " +
           "s.image, " +
           "s.instagram, " +
           "s.wallet, " +
           "a.id, " +
           "a.image, " +
           "a.name," +
           "a.title, " +
           "a.video, " +
           "a.releaseDate )" +
           "FROM Album a " +
           "JOIN a.singer s " +
           "WHERE s.id =:singerId")
    Optional<List<SingerAndAlbumInfo>> getSingerAndAlbumBySingerId(@Param("singerId") Long singerId);

    @Query("SELECT new com.c209.catalog.domain.singer.dto.info.SingerListInfo ( " +
           "s.id, s.name, s.image, s.instagram, s.wallet, s.dateOfDebut, s.dateOfBirth, s.view ) " +
           " FROM Singer s")
    Optional<List<SingerListInfo>> getSinger();
}
