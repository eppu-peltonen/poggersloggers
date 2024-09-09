CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    memberId VARCHAR(255) NOT NULL
    createdAt TIMESTAMP NOT NULL
);