package com.c209.catalog.domain.hall.repository;

import com.c209.catalog.domain.hall.entity.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallRepository extends JpaRepository<Hall, Long> {
    List<Hall> findByNameContainingAndAddressContaining(String name, String address);
}
