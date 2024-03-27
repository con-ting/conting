/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.repository;

import com.c209.batchservice.domain.catalog.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
}
