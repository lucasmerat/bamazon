-- DROP DATABASE IF EXISTS bamazon;

-- CREATE DATABASE bamazon;

use bamazon;

-- DROP table products;

-- create table departments (
-- 	department_id int NOT NULL auto_increment,
--     primary key(department_id),
--     department_name VARCHAR(100) NOT NULL,
-- 	over_head_costs int(11) NOT NULL
-- );

-- create table products (
-- 	item_id int NOT NULL auto_increment,
--     primary key(item_id),
--     product_name VARCHAR(100) NOT NULL,
-- 	price int(11) NOT NULL,
--     stock_quantity int(11) NOT NULL
-- );

-- delete from departments where department_id = 7;

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Electronics',1800);


select * from departments;
-- select * from products;


