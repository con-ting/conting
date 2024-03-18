package com.c209.user.domain.auth.repository.redis;


import com.c209.user.global.redis.key.RedisKeyPrefix;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class AuthRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;


    private String buildFCMKey(String fcmToken){
        return new StringBuilder().append(RedisKeyPrefix.FCM_KEY).append(fcmToken).toString();
    }


    public void saveRandomNumberWithFCMToken(String fcmToken, int randomNumber){
        redisTemplate.opsForValue()
                .set(buildFCMKey(fcmToken),String.valueOf(randomNumber), Duration.ofSeconds(100));
    }


    public Optional<String> findRandomNumberByFCMToken(String fcmToken){
        String randomNumber = redisTemplate.opsForValue().get(buildFCMKey(fcmToken));

        return Optional.ofNullable(randomNumber);
    }

    public void deleteRandomNumberByFCMToken(String fcmToken ){
        redisTemplate.delete(buildFCMKey(fcmToken));
    }








}
