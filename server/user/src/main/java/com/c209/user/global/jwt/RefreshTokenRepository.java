package com.c209.user.global.jwt;

import java.util.Optional;

public interface RefreshTokenRepository {

    public void save(String refreshToken, String memberId);

    public Optional<String> find(String memberId);

    public void delete(String memberId);

}
