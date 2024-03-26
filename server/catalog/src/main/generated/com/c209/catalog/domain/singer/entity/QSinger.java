package com.c209.catalog.domain.singer.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSinger is a Querydsl query type for Singer
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSinger extends EntityPathBase<Singer> {

    private static final long serialVersionUID = 177693953L;

    public static final QSinger singer = new QSinger("singer");

    public final com.c209.catalog.global.common.QBaseEntity _super = new com.c209.catalog.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DatePath<java.time.LocalDate> dateOfBirth = createDate("dateOfBirth", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> dateOfDebut = createDate("dateOfDebut", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath instagram = createString("instagram");

    public final StringPath name = createString("name");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public final StringPath wallet = createString("wallet");

    public QSinger(String variable) {
        super(Singer.class, forVariable(variable));
    }

    public QSinger(Path<? extends Singer> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSinger(PathMetadata metadata) {
        super(Singer.class, metadata);
    }

}

