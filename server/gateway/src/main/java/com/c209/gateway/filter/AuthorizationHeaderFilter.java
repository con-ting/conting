package com.c209.gateway.filter;

import com.c209.gateway.jwt.error.AuthException;
import com.c209.gateway.jwt.util.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import static org.springframework.http.HttpHeaders.*;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    @Value("${jwt.access-key}")
    private String jwtKey;


    @Autowired
    private JwtUtils jwtUtils;

    public AuthorizationHeaderFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {

            try {
                String token = exchange.getRequest().getHeaders().get(AUTHORIZATION).get(0).substring(7);

                String userId = jwtUtils.parseId(token);
                String userIdFromHeader = exchange.getRequest().getHeaders().get(USER_AGENT).get(0);

                log.info(userId);

                if(!userId.equals(userIdFromHeader)){
                    throw new AuthException("유효하지 않은 토큰입니다.");
                }

                addAuthorizationHeaders(exchange.getRequest(), userId);

            } catch (ExpiredJwtException ex) {
                log.info("토큰이 만료되었습니다.");
                throw new AuthException("토큰이 만료되었습니다.");
            } catch (MalformedJwtException | SignatureException | IllegalArgumentException |
                     NullPointerException ex) {
                log.info("인증에 실패하였습니다.");
                throw new AuthException("인증에 실패하였습니다.");
            }





            return chain.filter(exchange);
        };
    }

    private void addAuthorizationHeaders(ServerHttpRequest request, String userId) {

        request.mutate()
                .header("X-Authorization-Id", userId)
                .build();
    }
    static class Config {

    }


}
