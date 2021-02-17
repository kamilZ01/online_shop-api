DROP TABLE IF EXISTS category,product,order_status,users,orders,order_quantity;

CREATE TABLE category (
id int not null auto_increment PRIMARY KEY,
name text not null
);

CREATE TABLE product (
id int not null auto_increment PRIMARY KEY,
name text not null,
description text,
unit_price DECIMAL(6,2) not null,
unit_weight decimal(5,2) not null,
category_id int not null,
foreign key (category_id)
	references category(id)
);

CREATE TABLE order_status (
id int not null auto_increment PRIMARY KEY,
name text not null
);

-- CREATE TABLE users (
-- id int not null auto_increment PRIMARY KEY,
-- user_name text not null,
-- email text not null,
-- phone_number text not null,
-- address text
-- );

CREATE TABLE orders (
id int not null auto_increment PRIMARY KEY,
user_name text not null,
email text not null,
phone_number text not null,
address text,
order_date datetime not null,
status_id int not null,
	foreign key (status_id)
		references order_status(id)
);

CREATE TABLE order_quantity (
order_id int not null,
	foreign key (order_id)
		references orders(id),
product_id int not null,
	foreign key (product_id)
		references product(id),
quantity int not null,
primary key(order_id, product_id)
);

INSERT INTO category(name) VALUES
('Sport'),
('Electronics'),
('Toys'),
('Sweets'),
('Chemicals');
SELECT * FROM category;

INSERT INTO order_status(name) VALUES
('NOT APPROVED'),
('CONFIRMED'),
('CANCELLED'),
('COMPLETED');

SELECT * FROM order_status;

INSERT INTO product (name, description,unit_price,unit_weight, category_id) VALUES
('Laptop DELL', 'Laptop',3999.99, 2.0,2);
SELECT * FROM product;
