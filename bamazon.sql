

CREATE DATABASE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (item_id),
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(50) NULL,
  price  INT(50) NULL,
  stock_quantity INT (20) NULL
  );


 SELECT * FROM products;

 INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("boots", "shoes", 150, 350), ("tennis", "shoes", 100, 500), ("sandals", "shoes", 25, 100),("pijamas", "clothing", 10, 250),("camara", "electronics", 100, 300),("ipad", "electronics", 300, 400),
("milk", "groceries", 3, 60),("hotdogs", "groceries", 4, 80),("socks", "clothing", 3, 100),("guns", "sportingGoods", 80, 50),
("ammo", "sportingGoods", 20, 1000),("targets", "sportingGoods", 15, 600);