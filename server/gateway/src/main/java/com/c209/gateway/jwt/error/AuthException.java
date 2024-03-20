package com.c209.gateway.jwt.error;

public class AuthException extends RuntimeException {
    public AuthException(String message) {
        super(message);
    }
}
