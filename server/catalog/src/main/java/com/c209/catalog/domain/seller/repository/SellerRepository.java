package com.c209.catalog.domain.seller.repository;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT s.id " +
            "FROM Seller s " +
            "where s.UserId = :user_id")
    Seller findByUserId(Long user_id);

    @Query("DELETE FROM Seller " +
            "WHERE performance.id = :performance_id")
    void deleteByPerformance(Long performance_id);
}
