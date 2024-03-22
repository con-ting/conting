package com.c209.queue.domain.queue.service;

import com.c209.queue.global.error.CommonException;
import com.c209.queue.infra.EmbeddedRedis;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.connection.ReactiveRedisConnection;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Import(EmbeddedRedis.class)
@ActiveProfiles("test")
class QueueServiceTest {


    @Autowired
    private QueueService queueService;


    @Autowired
    private ReactiveRedisTemplate<String, String> reactiveRedisTemplate;


    @BeforeEach
    public void beforeEach(){
        ReactiveRedisConnection connection = reactiveRedisTemplate.getConnectionFactory().getReactiveConnection();
        connection.serverCommands().flushAll().subscribe();
    }

    @Test
    @DisplayName("유저는 원하는 공연의 대기큐에 등록할 수 있다.")
     void user_regist_queue(){

        for(long i=1; i<=5; i++){
            StepVerifier.create(queueService.registerQueue(1L, i))
                    .expectNext(i)
                    .verifyComplete();
        }
    }

    @Test
    @DisplayName("유저가 중복으로 같은 공연의 대기큐에 등록할 경우 에러가 발생한다.")
    void user_already_register_wait_queue(){
        StepVerifier.create(queueService.registerQueue(1L, 100L))
                .expectNext(1L)
                .verifyComplete();

        StepVerifier.create(queueService.registerQueue(1L, 100L))
                .expectError(CommonException.class)
                .verify();
    }

    @Test
    @DisplayName("유저는 자신의 대기 순위를 조회할 수 있다.")
    void user_get_rank(){
        for(long i=1; i<=5; i++){
            StepVerifier.create(queueService.registerQueue(1L, i)
                            .then(queueService.getRank(1L, i)))
                    .expectNext(i)
                    .verifyComplete();
        }
    }

    @Test
    @DisplayName("유저가 자신의 대기 순위를 조회했을 때 아무도 없으면 -1을 응답으로 받는다.")
    void user_get_empty_rank(){
        StepVerifier.create(queueService.getRank(1L,1L)).expectNext(-1L).verifyComplete();
    }




}