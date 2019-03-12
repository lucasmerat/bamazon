-- DROP DATABASE IF EXISTS bamazon;

-- CREATE DATABASE bamazon;

use bamazon;

ALTER TABLE products ADD product_sales int(11);

-- create table departments (
-- 	department_id int NOT NULL auto_increment,
--     primary key(department_id),
--     department_name VARCHAR(100) NOT NULL,
-- 	over_head_costs int(11) NOT NULL
-- );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ('Cereal', 'Food', 4, 1000);

select * from products;

-- delete from products where item_id = 3;