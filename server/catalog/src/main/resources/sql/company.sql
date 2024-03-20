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

