package com.c209.catalog.domain.seller.repository;

import com.c209.catalog.domain.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT s " +
            "FROM Seller s " +
            "WHERE s.UserId = :user_id")
    Seller findByUserId(Long user_id);

    @Query("DELETE FROM Seller " +
            "WHERE UserId = :user_id")
    void deleteByUser(Long user_id);

    @Query("SELECT s FROM Seller s WHERE s.UserId = :userId AND s.id NOT IN (SELECT p.seller.id FROM Performance p)")
    Optional<List<Seller>> findUnusedSellerIdsByUserId(@Param("userId") Long userId);
}
