ALTER TABLE album MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE album MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
INSERT INTO hall (name, telephone, relate_url, latitude, longitude, address, restaurant, cafe, convenience_store, play_room, suyu_room, barrier_park, barrier_rest, barrier_runw, barrier_elevator, parking_lot, total_seat_count)
VALUES ('올림픽공원 뮤즈라이브', '02-410-1114', 'http://www.olympicpark.co.kr/', 37.52112, 127.1283636, '서울특별시 송파구 올림픽로 424 올림픽공원 (방이동)', 'Y', 'Y', 'Y', 'N', 'N', 'N', 'N', 'N', 'Y', 244);
