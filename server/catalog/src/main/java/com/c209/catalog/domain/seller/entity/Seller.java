package com.c209.catalog.domain.seller.entity;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@Setter
public class Seller extends BaseEntity {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="seller_id")
    @Id
    private Long id;

    @Column(name = "user_id")
    private Long UserId;

    @Column
    private String wallet;
}
