package com.c209.user.domain.user.repository;

import com.c209.user.domain.user.data.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {


    boolean existsByEmail(String email);
    boolean existsByFcmToken(String fcmToken);


}
