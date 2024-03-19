package com.c209.user.domain.auth.repository.redis;

import java.util.Optional;

public interface AuthRepository {


    public void saveRandomNumberWithFCMToken(String fcmToken, int randomNumber);

    public Optional<String> findRandomNumberByFCMToken(String fcmToken);

    public void deleteRandomNumberByFCMToken(String fcmToken);


}
