CREATE DATABASE proyectonoticiaspacheco;
USE proyectonoticiaspacheco;


CREATE TABLE users (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name varchar(120) NOT NULL,
    email varchar(255) NOT NULL,
    pwd varchar(128) NOT NULL
);
CREATE TABLE users_data (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT(20) NOT NULL,
    user_token VARCHAR(8) UNIQUE,
    permissions int(1) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 
CREATE TABLE news(
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content TEXT NOT NULL,
    image_url varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);




-- SP
DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE SP_LOGINUSUARIOS(IN name VARCHAR(65), IN email VARCHAR(45), IN pwd VARCHAR(255), IN rol VARCHAR(15))
BEGIN
INSERT INTO users (name, email, pwd)VALUES (name, email, pwd);
SET @idValue= LAST_INSERT_ID();

INSERT INTO users_data(user_id, permissions) VALUES (@idValue, rol);

END$$
DELIMITER ;



