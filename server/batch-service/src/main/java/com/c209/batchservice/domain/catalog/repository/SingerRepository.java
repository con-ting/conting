/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.repository;

import com.c209.batchservice.domain.catalog.entity.Singer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SingerRepository extends JpaRepository<Singer, Long> {
}
