package com.c209.queue.domain.queue.service;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QueueKey {
    USER_QUEUE_WAIT_KEY("users:queue:%s:wait"),
    USER_QUEUE_WAIT_KEY_FOR_SCAN("users:queue:%s:wait"),
    USER_QUEUE_PROCEED_KEY("users:queue:%s:proceed");

    private final String name;


}
