package com.c209.catalog.domain.singer.repository;


import com.c209.catalog.domain.singer.dto.info.SingerAndAlbumInfo;
import com.c209.catalog.domain.singer.entity.Singer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SingerRepository extends JpaRepository<Singer, Long> {


    @Query("SELECT new com.c209.catalog.domain.singer.dto.info.SingerAndAlbumInfo ("+
    "s.id, "+
    "s.name, "+
    "s.instagram, "+
    "s.image, "+
    "a.id, "+
    "a.image, "+
    "a.name," +
    "a.title, "+
    "a.video, "+
    "a.releaseDate )"+
    "FROM Album a "+
    "JOIN a.singer s "+
    "WHERE s.id =:singerId")
    Optional<List<SingerAndAlbumInfo>> getSingerAndAlbumBySingerId(@Param("singerId")Long singerId);

}
