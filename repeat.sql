DROP TABLE IF EXISTS basket;

CREATE TABLE basket (item VARCHAR NOT NULL);

INSERT INTO basket (item)
VALUES ('watermelon');

UPDATE basket
SET item = 'apple'
WHERE item = 'watermelon';

SELECT *
FROM basket;

DELETE FROM basket
WHERE item = 'apple';

SELECT *
FROM basket;