package com.c209.gateway.jwt.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtUtils {

    private final JwtProps props;

    public String parseId(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(props.getAccessKey().getBytes()))
                .build()
                .parseSignedClaims(token).getPayload().getId();
    }
}

