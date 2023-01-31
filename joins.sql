DROP TABLE IF EXISTS basket_a;
DROP TABLE IF EXISTS basket_b;

CREATE TABLE basket_a (
    item_a VARCHAR NOT NULL, 
    basket_a_id INT PRIMARY KEY
);

CREATE TABLE basket_b (
    item_b VARCHAR NOT NULL,
    basket_b_id INT PRIMARY KEY
);

INSERT INTO basket_a (basket_a_id, item_a)
VALUES (1, 'Apple'),
    (2, 'Cucumber'),
    (3, 'Watermelon'),
    (4, 'Cheese');

INSERT INTO basket_b (basket_b_id, item_b)
VALUES (1, 'Apple'),
    (2, 'Orange'),
    (3, 'Watermelon'),
    (4, 'Pear');

SELECT *
FROM basket_a
    INNER JOIN basket_b ON item_a = item_b;

SELECT *
FROM basket_a
    LEFT JOIN basket_b ON item_a = item_b;

SELECT *
FROM basket_a
    RIGHT JOIN basket_b ON item_a = item_b;

SELECT *
FROM basket_a
    FULL JOIN basket_b ON item_a = item_b;