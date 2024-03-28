package com.c209.catalog.domain.seller.repository;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT s.id " +
            "FROM Seller s " +
            "WHERE s.UserId = :user_id AND s.performance.id = :show_id")
    Optional<Seller> findByUserIdAndShowId(Long user_id, Long show_id);

    @Query("DELETE FROM Seller " +
            "WHERE performance.id = :performance_id")
    void deleteByPerformance(Long performance_id);
}
