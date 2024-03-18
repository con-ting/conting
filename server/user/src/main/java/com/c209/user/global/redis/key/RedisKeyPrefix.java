package com.c209.user.global.redis.key;

import lombok.Getter;

@Getter
public enum RedisKeyPrefix {

    FCM_KEY("fcm::"),
    ;

    private final String keyName;


    RedisKeyPrefix(String keyName) {
        this.keyName = keyName;
    }
}
