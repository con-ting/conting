package com.c209.user.domain.user.repository;

import com.c209.user.domain.user.data.dto.UserDto;
import com.c209.user.domain.user.data.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserEntity, Long> {


    boolean existsByEmail(String email);
    boolean existsByFcmToken(String fcmToken);

    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findById(Long id);


    Optional<UserEntity> findByWallet(String wallet);
}
