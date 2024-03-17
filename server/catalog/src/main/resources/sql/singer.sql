<<<<<<< HEAD
=======


>>>>>>> 61ae66f0f56f29afd874e80e6f911543bead33a7
ALTER TABLE singer MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE singer MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO singer (name,wallet,image,instagram,date_of_birth,date_of_debut) VALUES
    ('라이즈','','https://i.namu.wiki/i/0xXQ6NbvOzmuOBb8NlRol1EjOFF7OL0ByOCpQ9uUGpI_v8vTFUH20vjLE_JqjDVjzzZi5OhFJN3sT3FHc4Tz78cNTPZ5YhczYpso7LHpOYCLDGjb0kxSbvmboXC9o0vk6Yc3ZaXrgWG8wB8j75zNGA.webp','https://www.instagram.com/riize_official/','2023-09-04','2023-09-04');