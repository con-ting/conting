package com.c209.user.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private final JwtProps props;

    // 액세스 토큰 발급
    public String issueAccessToken(Long memberId) {

        Claims claims = Jwts.claims()
                .id(String.valueOf(memberId))
                .build();

        return issueToken(claims, props.accessExpiration(), props.accessKey());
    }

    // 리프레시 토큰 발급
    public String issueRefreshToken() {
        return issueToken(null, props.accessExpiration(), props.refreshKey());
    }

    private String issueToken(Claims claims, Duration expiration, String secretKey) {
        Date now = new Date();

        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration.toMillis()))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    // 파싱
    public Long parseAccessTokenByBase64(String accessToken) {
        String payload = accessToken.split("\\.")[1];

        String decodePayload = new String(Base64.getUrlDecoder().decode(payload));

        BasicJsonParser jsonParser = new BasicJsonParser();

        Map<String, Object> map = jsonParser.parseMap(decodePayload);

        return Long.valueOf((String) (map.get("jti")));

    }

}
