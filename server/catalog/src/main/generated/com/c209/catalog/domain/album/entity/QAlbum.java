package com.c209.catalog.domain.album.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlbum is a Querydsl query type for Album
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbum extends EntityPathBase<Album> {

    private static final long serialVersionUID = 1824743567L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlbum album = new QAlbum("album");

    public final com.c209.catalog.global.common.QBaseEntity _super = new com.c209.catalog.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath name = createString("name");

    public final DatePath<java.time.LocalDate> releaseDate = createDate("releaseDate", java.time.LocalDate.class);

    public final com.c209.catalog.domain.singer.entity.QSinger singer;

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final StringPath video = createString("video");

    public QAlbum(String variable) {
        this(Album.class, forVariable(variable), INITS);
    }

    public QAlbum(Path<? extends Album> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlbum(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlbum(PathMetadata metadata, PathInits inits) {
        this(Album.class, metadata, inits);
    }

    public QAlbum(Class<? extends Album> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.singer = inits.isInitialized("singer") ? new com.c209.catalog.domain.singer.entity.QSinger(forProperty("singer")) : null;
    }

}

