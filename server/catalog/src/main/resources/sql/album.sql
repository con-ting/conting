ALTER TABLE album MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE album MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
INSERT INTO album (name,title,video,image,release_date,singer_id) VALUES
                                                                      ('Get A Guitar','Get A Guitar','https://www.youtube.com/watch?v=iUw3LPM7OBU','https://namu.wiki/w/Get%20A%20Guitar','2023-09-04',1),
                                                                      ('Memories','Memories','https://www.youtube.com/watch?v=2H0duKgnYgE','https://i.namu.wiki/i/vupcIEtOYRut70-hs3WhuWfcqa82rLqSVRAcB-XJbzTdTvyC3zPQlvLlxgE_0D2P-40F39fNJxmYIQyZt2NjtZ7EWSjOKBCVQyx4ZAXZsA4Ytmwb2_hYod89n1i6_Q_Z8afkJK5S6Q-Eotu7iGyYwg.webp','2023-09-04',1),
                                                                      ('Talk Saxy','Talk Saxy','https://www.youtube.com/watch?v=gJMheHHf4GQ','https://namu.wiki/w/Talk%20Saxy','2023-10-27',1),
                                                                      ('Love 119','Love 119','https://www.youtube.com/watch?v=0TAAUWHo4Ec','https://namu.wiki/w/Love%20119','2024-01-05',1);