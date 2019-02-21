DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100)  NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Footwear", 75.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts", "Apparel", 25.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 500.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Furniture", 1200.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Maker", "Housewares", 85.00, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Song Download", "Media", 1.00, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winter Jacket", "Outerwear", 450.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watch", "Accessories", 250.00, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Windshield Wipers", "Automotive", 20.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drill", "Tools", 350.00, 85);

SELECT*FROM products; 