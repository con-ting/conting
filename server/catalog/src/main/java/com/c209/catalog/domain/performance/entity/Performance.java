package com.c209.catalog.domain.performance.entity;

import com.c209.catalog.domain.company.entity.Company;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.performance.enums.Genre;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.singer.entity.Singer;
import com.c209.catalog.global.common.BaseEntity;
import com.querydsl.core.annotations.QueryEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@QueryEntity
public class Performance extends BaseEntity {
    @Id
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="performance_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="company_id", nullable = false)
    private Company company;

    @Column
    private String title;

    @Column(name="poster_image")
    private String posterImage;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(name="description_image")
    private String descriptionImage;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Genre genre;

    @Column(name="video_url")
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="singer_id", nullable = false)
    private Singer singer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="hall_id", nullable = false)
    private Hall hall;

    @Column(name="reservation_start_datetime")
    private LocalDateTime reservationStartDatetime;

    @Column(name="reservation_end_datetime")
    private LocalDateTime reservationEndDatetime;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Enumerated(value = EnumType.STRING)
    @Column(name="reservation_type", nullable = false)
    private ReservationType reservationType;

    @Column(name="start_date")
    private Date startDate;

    @Column(name="end_date")
    private Date endDate;

    @Column(name="max_ticket_per_person")
    private Integer maxTicketPerPerson;

    @Column(name="is_adult_only", columnDefinition = "boolean default false")
    private Boolean isAdultOnly;

    @Setter
    @Column(columnDefinition = "integer default 0")
    private Integer view;

    // status 자동 계산
    // PrePersist 어노테이션으로 엔티티 영속화 전의 메서드 정의해줌
    @PrePersist
    @PreUpdate
    private void calculateStatus() {
        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(reservationStartDatetime)) {
            status = Status.before_sale;
        } else if (now.isAfter(reservationStartDatetime) && now.isBefore(reservationEndDatetime)) {
            status = Status.on_sale;
        } else {
            status = Status.after_sale;
        }
    }
}

// ManyToMany
// 중간테이블을 만들고 PK, FK 쌍을 알아서 매핑해주는 것 까지는 문제가 없는데, 실무 레벨에서는 이러한 테이블 매핑에 필요한 필수적인 정보들 외에도 중간 테이블이 가져야하는 여러 가지 컬럼들이 있을 수 있다.
// (예를들어 멤버 - 오더 - 상품 이렇게 되어있을 경우 오더가 발생한 시간이라든가 하는 정보들)
// 하이버네이트에 의해 생성된 중간 테이블은 관계 설정에 필수적으로 필요한 정보들만 담겨있을 뿐 이러한 비즈니스 로직상 필요한 정보들은 담기지 않는다.
// 따라서, 실무 단계에서는 @ManyToMany 는 절대 사용하지 말아야 한다.

// Fetchtype.Lazy
// 실무에서는 가급적 지연 로딩만 사용하다.
// 즉시 로딩 쓰지 말자.JPA 구현체도 한번에 가저오려고 하고,
// 한번에 가져와서 쓰면 좋지 않나?즉시 로딩을 적용하면 예상하지 못한 SQL 이 발생한다.
// @ManyToOne 이 5개 있는데 전부 EAGER 로 설정되어 있다고 생각해보자.조인이 5개 일어난다.
// 실무에선 테이블이 더 많다.
// 즉시 로딩은 JPQL 에서 N+1 문제를 일으킨다.
// 실무에서 복잡한 쿼리를 많이 풀어내기 위해서 뒤에서 학습할 JPQL 을 많이 사용한다.
// em.find()는 PK를 정해놓고 DB 에서 가져오기 때문에 JPA 내부에서 최적화를 할 수 있다.(한방 쿼리)
// 하지만, JPQL 에선 입력 받은 query string 이 그대로 SQL 로 변환된다.
// "select m from Member m" 이 문장으로 당연히 Member 만 SELECT 하게 된다.
// MEMBER 를 쭉 다 가져와서 보니까어 근데, Member 엔티티의 Team 의 fetchType 이 EAGER 네?LAZY 면 프록시를 넣으면 되겠지만, EAGER 는 반환하는 시점에 다 조회가 되어 있어야 한다.
// 따라서, Member 를 다 가져오고 나서, 그 Member 와 연관된 Team 을 다시 다 가져온다.

// @OneToMany 와 @ManyToMany 는 기본이 지연 로딩(LAZY)이다.
