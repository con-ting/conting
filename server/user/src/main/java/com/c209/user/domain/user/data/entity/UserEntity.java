package com.c209.user.domain.user.data.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table
@Getter
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
@ToString
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name="date_of_birth", nullable = false)
    private LocalDate birthDate;

    @Column(name="fcm_token", nullable = false)
    private String fcmToken;


    @Column(nullable=false)
    private String wallet;

}
