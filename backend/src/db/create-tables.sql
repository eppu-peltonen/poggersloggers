CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    memberId UUID NOT NULL,
    createdAt TIMESTAMP NOT NULL
);