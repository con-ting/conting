package com.c209.catalog.domain.singer.dto;

import com.c209.catalog.domain.performance.dto.PShowsDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.time.LocalDate;
import java.util.Objects;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class SingerListDto {
    @NotNull
    private Long singer_id;
    @NotNull
    private String singer_name;
    private String singer_profile_image;
    private String singer_instagram;
    private String singer_wallet;
    private LocalDate dateOfDebut;
    private LocalDate dateOfBirth;
    @PositiveOrZero
    private Integer singer_view;

    @Override
    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = prime * result + ((singer_id == null) ? 0 : singer_id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        SingerListDto other = (SingerListDto) obj;
        return Objects.equals(singer_id, other.singer_id);
    }
}
