package com.c209.catalog.domain.album.entity;


import com.c209.catalog.domain.singer.entity.Singer;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static jakarta.persistence.GenerationType.IDENTITY;


import static jakarta.persistence.FetchType.LAZY;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Album extends BaseEntity {

    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "album_id")
    @Id
    private Long id;

    @ManyToOne(fetch= LAZY, optional=false)
    @JoinColumn(name="singer_id", nullable = false)
    private Singer singer;
<<<<<<< HEAD
=======

>>>>>>> 61ae66f0f56f29afd874e80e6f911543bead33a7
    @Column
    private String name;

    @Column
    private String image;

    @Column
    private String title;


    @Column(name="release_date")
    private LocalDate releaseDate;

    @Column
    private String video;

}
