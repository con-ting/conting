package com.c209.catalog.domain.hall.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QHall is a Querydsl query type for Hall
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHall extends EntityPathBase<Hall> {

    private static final long serialVersionUID = -1787751621L;

    public static final QHall hall = new QHall("hall");

    public final com.c209.catalog.global.common.QBaseEntity _super = new com.c209.catalog.global.common.QBaseEntity(this);

    public final StringPath address = createString("address");

    public final BooleanPath barrier_elevator = createBoolean("barrier_elevator");

    public final BooleanPath barrier_park = createBoolean("barrier_park");

    public final BooleanPath barrier_rest = createBoolean("barrier_rest");

    public final BooleanPath barrier_runw = createBoolean("barrier_runw");

    public final BooleanPath cafe = createBoolean("cafe");

    public final BooleanPath convenience_store = createBoolean("convenience_store");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Float> latitude = createNumber("latitude", Float.class);

    public final NumberPath<Float> longitude = createNumber("longitude", Float.class);

    public final StringPath name = createString("name");

    public final BooleanPath parking_lot = createBoolean("parking_lot");

    public final BooleanPath play_room = createBoolean("play_room");

    public final StringPath relate_url = createString("relate_url");

    public final BooleanPath restaurant = createBoolean("restaurant");

    public final BooleanPath suyu_room = createBoolean("suyu_room");

    public final StringPath telephone = createString("telephone");

    public final NumberPath<Integer> total_seat_count = createNumber("total_seat_count", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QHall(String variable) {
        super(Hall.class, forVariable(variable));
    }

    public QHall(Path<? extends Hall> path) {
        super(path.getType(), path.getMetadata());
    }

    public QHall(PathMetadata metadata) {
        super(Hall.class, metadata);
    }

}

