ALTER TABLE singer MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE singer MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO singer (name,wallet,image,instagram,date_of_birth,date_of_debut)
VALUES ('라이즈','','https://i.namu.wiki/i/0xXQ6NbvOzmuOBb8NlRol1EjOFF7OL0ByOCpQ9uUGpI_v8vTFUH20vjLE_JqjDVjzzZi5OhFJN3sT3FHc4Tz78cNTPZ5YhczYpso7LHpOYCLDGjb0kxSbvmboXC9o0vk6Yc3ZaXrgWG8wB8j75zNGA.webp','https://www.instagram.com/riize_official/','2023-09-04','2023-09-04'),
       ('핑크퐁', '', 'https://yt3.googleusercontent.com/ytc/AIdro_nw1KkzDGpTh0vu021H1c3VBHvehuQvpdvnE_4iFg=s900-c-k-c0x00ffffff-no-rj', 'https://www.instagram.com/pinkfong.ko/', '2012-09-06', '2012-09-06'),
       ('아이브', '', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMjdfMjQw%2FMDAxNjc5OTEyNjk4MDk2.TklQU4plys8IFf3nOJ-7oTthMnxW3A-nLie7EH_N3AAg.yARx_9YQqcfyIs78yLTsUIlD4dOlNLGT-DwDnaOiNHYg.JPEG.haon3301%2F2.jpg&type=a340', 'https://www.instagram.com/ivestarship/', '2021-12-01', '2021-12-01');

ALTER TABLE album MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE album MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
INSERT INTO album (name,title,video,image,release_date,singer_id)
VALUES
    ('Get A Guitar','Get A Guitar','https://www.youtube.com/watch?v=iUw3LPM7OBU','https://namu.wiki/w/Get%20A%20Guitar','2023-09-04',1),
    ('Memories','Memories','https://www.youtube.com/watch?v=2H0duKgnYgE','https://i.namu.wiki/i/vupcIEtOYRut70-hs3WhuWfcqa82rLqSVRAcB-XJbzTdTvyC3zPQlvLlxgE_0D2P-40F39fNJxmYIQyZt2NjtZ7EWSjOKBCVQyx4ZAXZsA4Ytmwb2_hYod89n1i6_Q_Z8afkJK5S6Q-Eotu7iGyYwg.webp','2023-09-04',1),
    ('Talk Saxy','Talk Saxy','https://www.youtube.com/watch?v=gJMheHHf4GQ','https://namu.wiki/w/Talk%20Saxy','2023-10-27',1),
    ('Love 119','Love 119','https://www.youtube.com/watch?v=0TAAUWHo4Ec','https://namu.wiki/w/Love%20119','2024-01-05',1);

ALTER TABLE hall
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO hall (name, telephone, relate_url, latitude, longitude, address, restaurant, cafe, convenience_store, play_room, suyu_room, barrier_park, barrier_rest, barrier_runw, barrier_elevator, parking_lot, total_seat_count)
VALUES ('올림픽공원 뮤즈라이브', '02-410-1114', 'http://www.olympicpark.co.kr/', 37.52112, 127.1283636, '서울특별시 송파구 올림픽로 424 올림픽공원 (방이동)', 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 244),
       ('잠실종합운동장', '02-2240-8800', 'http://stadium.seoul.go.kr/', 37.5140929, 127.0749534, '서울특별시 송파구 올림픽로 25 (잠실동)', 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 81813);



ALTER TABLE company
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO company (company_name, company_call)
VALUES ('SM Entertainment', 'www.smentertainment.com/'),
       ('YG Entertainment', 'www.ygfamily.com'),
       ('JYP Entertainment', 'www.jype.com'),
       ('HYBE', 'hybecorp.com'),
       ('PLEDIS Entertainment', 'www.pledis.co.kr'),
       ('TEHBLACKLABEL', 'www.theblackad.com'),
       ('AOMG', 'www.aomgofficial.com'),
       ('더핑크퐁컴퍼니', 'https://www.pinkfong.com/ko/'),
       ('스타쉽엔터테인먼트', 'www.starship-ent.com'),
       ('주식회사 메이드온', 'https://www.youtube.com/@waterbomb_official');


ALTER TABLE performance
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO performance (title, poster_image, description, description_image, genre, video_url, view, singer_id, hall_id, reservation_start_datetime, reservation_end_datetime, status, reservation_type, start_date, end_date, max_ticket_per_person, company_id, is_adult_only)
VALUES ('2024 IVE 2nd FANMEETING 〈MAGAZINE IVE〉', 'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/02/20240207105504dbc862cf-1e34-4050-9f0b-827a7ebc3a9f.jpg/melon/resize/180x254/strip/true/quality/90/optimize','', 'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/02/20240207110635ac758c63-b12b-4ad4-ac3f-65f9e835dfff.jpg/melon/quality/90/optimize', 'KP', 'https://www.youtube.com/watch?v=8TtyQcLv0eU', 0, 3, 1, '2024.02.13.20:00:00', '2024.02.16:23:59:59', 'on_sale', 'F', '2024.03.09', '2024.03.10', 1, 9, false),
       ('플레이 뮤지컬 〈핑크퐁과 아기상어의 무지개 구출 작전〉', 'https://ticketimage.interpark.com/Play/image/large/24/24002524_p.gif',	'2024년 5월, 핑크퐁, 아기상어와 함께 무지개를 구하러 알록달록 다채로운 색깔 나라로 떠나보아요!','https://ticketimage.interpark.com/Play/image/etc/24/24002524-01.jpg', 'FE', 'https://www.youtube.com/watch?v=SCQQ1mN-1pM', 0, 2, 2, '2024.02.29', '2024.08.24', 'on_sale', 'F', '2024.05.01', '2024.08.25', 4, 8, false);

ALTER TABLE grade
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO grade (performance_id, grade, price)
VALUES (1, 'R', 150000),
       (1, 'S', 120000),
       (1, 'A', 100000),
       (2, 'R', 50000),
       (2, 'S', 30000),
       (2, 'A', 20000);

ALTER TABLE schedule
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO schedule (performance_id, start_time, end_time)
VALUES (1,	'2024.03.09.18:00',	'2024.03.09.20:30'),
       (1,	'2024.03.10.17:00',	'2024.03.10.19:30'),
       (2,	'2024.05.01.11:00',	'2024.05.01.12:00'),
       (2,	'2024.05.01.14:00',	'2024.05.01.15:00'),
       (2,	'2024.05.02.11:00',	'2024.05.02.12:00'),
       (2,	'2024.05.02.15:00',	'2024.05.02.16:00'),
       (2,	'2024.05.03.11:00',	'2024.05.03.12:00'),
       (2,	'2024.05.03.15:00',	'2024.05.03.16:00');

ALTER TABLE hall_grade
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO hall_grade (view_url, grade_id)
VALUES ('1', 1),
       ('2', 2),
       ('3', 3),
       ('4', 4),
       ('5', 5),
       ('6', 6);

ALTER TABLE seller
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO seller (performance_id, user_id)
VALUES (1,	1),
       (2,	1);
