package com.c209.user.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RandomNumberUtil {


    public int getRandomNumber(){
        long seed = System.currentTimeMillis(); // 현재 시간을 밀리초 단위로 가져오기
        Random random = new Random(seed); // 시드로 Random 객체 생성

        // 1000부터 9999 사이의 무작위 정수 생성
        int min = 1000;
        int max = 9999;

        return  random.nextInt(max - min + 1) + min;
    }
}
