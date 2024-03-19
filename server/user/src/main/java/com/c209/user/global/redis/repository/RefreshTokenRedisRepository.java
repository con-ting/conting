package com.c209.user.global.redis.repository;

import com.c209.user.global.jwt.JwtProps;
import com.c209.user.global.jwt.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.c209.user.global.redis.key.RedisKeyPrefix.REFRESH_TOKEN;

@RequiredArgsConstructor
@Repository
public class RefreshTokenRedisRepository implements RefreshTokenRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtProps props;

    public void save(String refreshToken, String memberId) {
        redisTemplate.opsForValue()
                .set(REFRESH_TOKEN + memberId, refreshToken, props.refreshExpiration());
    }

    public Optional<String> find(String memberId) {
        String token = redisTemplate.opsForValue().get(REFRESH_TOKEN + memberId);

        return Optional.ofNullable(token);
    }

    public void delete(String memberId) {
        redisTemplate.delete(REFRESH_TOKEN + memberId);
    }

}
