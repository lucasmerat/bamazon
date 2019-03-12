-- DROP DATABASE IF EXISTS bamazon;

-- CREATE DATABASE bamazon;

use bamazon;

-- create table products (
-- 	item_id int NOT NULL auto_increment,
--     primary key(item_id),
--     product_name VARCHAR(100) NOT NULL,
-- 	department_name VARCHAR(100) NOT NULL,
--     price decimal(7,2) NOT NULL,
--     stock_quantity int(10) NOT NULL
-- );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ('Cheese Grater', 'Kitchen', 8.99, 124);

select * from products;

-- delete from products where item_id = 3;