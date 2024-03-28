package com.c209.catalog.domain.seller.repository;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    void deleteByPerformance(Performance performance);
}
