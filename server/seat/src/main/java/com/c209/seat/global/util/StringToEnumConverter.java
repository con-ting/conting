package com.c209.seat.global.util;

import com.c209.seat.domain.seat.entity.enums.Sector;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.core.convert.converter.Converter;



public class StringToEnumConverter implements Converter<String, Sector> {

    @Override
    public Sector convert(String source) {
        try {
            return Sector.valueOf(source);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Sector value: " + source);
        }
    }
}
