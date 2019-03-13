DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

use bamazon;

create table products (
	item_id int NOT NULL auto_increment,
    primary key(item_id),
    product_name VARCHAR(100) NOT NULL,
	price int(11) NOT NULL,
    stock_quantity int(11) NOT NULL,
    product_sales int(11)
);

create table departments (
	department_id int NOT NULL auto_increment,
    primary key(department_id),
    department_name VARCHAR(100) NOT NULL,
	over_head_costs int(11) NOT NULL
);


select * from departments;
select * from products;


