package com.c209.catalog.domain.performance.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPerformance is a Querydsl query type for Performance
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPerformance extends EntityPathBase<Performance> {

    private static final long serialVersionUID = -231397905L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPerformance performance = new QPerformance("performance");

    public final com.c209.catalog.global.common.QBaseEntity _super = new com.c209.catalog.global.common.QBaseEntity(this);

    public final com.c209.catalog.domain.company.entity.QCompany company;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath description = createString("description");

    public final StringPath descriptionImage = createString("descriptionImage");

    public final DateTimePath<java.util.Date> endDate = createDateTime("endDate", java.util.Date.class);

    public final EnumPath<com.c209.catalog.domain.performance.enums.Genre> genre = createEnum("genre", com.c209.catalog.domain.performance.enums.Genre.class);

    public final com.c209.catalog.domain.hall.entity.QHall hall;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isAdultOnly = createBoolean("isAdultOnly");

    public final NumberPath<Integer> maxTicketPerPerson = createNumber("maxTicketPerPerson", Integer.class);

    public final StringPath posterImage = createString("posterImage");

    public final DateTimePath<java.time.LocalDateTime> reservationEndDatetime = createDateTime("reservationEndDatetime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> reservationStartDatetime = createDateTime("reservationStartDatetime", java.time.LocalDateTime.class);

    public final EnumPath<com.c209.catalog.domain.performance.enums.ReservationType> reservationType = createEnum("reservationType", com.c209.catalog.domain.performance.enums.ReservationType.class);

    public final com.c209.catalog.domain.singer.entity.QSinger singer;

    public final DateTimePath<java.util.Date> startDate = createDateTime("startDate", java.util.Date.class);

    public final EnumPath<com.c209.catalog.domain.performance.enums.Status> status = createEnum("status", com.c209.catalog.domain.performance.enums.Status.class);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final StringPath videoUrl = createString("videoUrl");

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QPerformance(String variable) {
        this(Performance.class, forVariable(variable), INITS);
    }

    public QPerformance(Path<? extends Performance> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPerformance(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPerformance(PathMetadata metadata, PathInits inits) {
        this(Performance.class, metadata, inits);
    }

    public QPerformance(Class<? extends Performance> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new com.c209.catalog.domain.company.entity.QCompany(forProperty("company")) : null;
        this.hall = inits.isInitialized("hall") ? new com.c209.catalog.domain.hall.entity.QHall(forProperty("hall")) : null;
        this.singer = inits.isInitialized("singer") ? new com.c209.catalog.domain.singer.entity.QSinger(forProperty("singer")) : null;
    }

}

