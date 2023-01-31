DROP TABLE IF EXISTS "Post";
DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    is_online BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Post" (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    owner_id INT,
    CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES "User"(id) ON DELETE
    SET NULL
);

INSERT INTO "User" (username, password)
VALUES ('test-user', 'test-password'),
    ('test-user-2', 'test-password-2'),
    ('bevzyk-ua', 'Abrakadabra2802');

INSERT INTO "Post" (owner_id, body)
VALUES (1, 'HELLO, SQL!');

SELECT *
FROM "User";

SELECT "Post".id,
    "Post".body,
    "Post".owner_id,
    "User".username,
    "User".is_online
FROM "Post"
    LEFT JOIN "User" ON "Post".owner_id = "User".id;

DELETE FROM "User"
WHERE id = 1;

SELECT * FROM User;