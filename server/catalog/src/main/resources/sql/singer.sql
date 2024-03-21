ALTER TABLE singer MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE singer MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO singer (name,wallet,image,instagram,date_of_birth,date_of_debut) VALUES
    ('라이즈','','https://i.namu.wiki/i/0xXQ6NbvOzmuOBb8NlRol1EjOFF7OL0ByOCpQ9uUGpI_v8vTFUH20vjLE_JqjDVjzzZi5OhFJN3sT3FHc4Tz78cNTPZ5YhczYpso7LHpOYCLDGjb0kxSbvmboXC9o0vk6Yc3ZaXrgWG8wB8j75zNGA.webp','https://www.instagram.com/riize_official/','2023-09-04','2023-09-04'),
    ('핑크퐁', '', 'https://yt3.googleusercontent.com/ytc/AIdro_nw1KkzDGpTh0vu021H1c3VBHvehuQvpdvnE_4iFg=s900-c-k-c0x00ffffff-no-rj', 'https://www.instagram.com/pinkfong.ko/', '2012-09-06', '2012-09-06'),
    ('아이브', '', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMjdfMjQw%2FMDAxNjc5OTEyNjk4MDk2.TklQU4plys8IFf3nOJ-7oTthMnxW3A-nLie7EH_N3AAg.yARx_9YQqcfyIs78yLTsUIlD4dOlNLGT-DwDnaOiNHYg.JPEG.haon3301%2F2.jpg&type=a340', 'https://www.instagram.com/ivestarship/', '2021-12-01', '2021-12-01');