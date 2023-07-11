DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
    
);

ALTER TABLE employees
ADD COLUMN department_id INT,
ADD COLUMN salary DECIMAL(10, 2);

UPDATE employees
SET department_id = 1, salary = 100000
WHERE id = 1;

UPDATE employees
SET department_id = 1, salary = 80000
WHERE id = 2;

UPDATE employees
SET department_id = 2, salary = 150000
WHERE id = 3;

UPDATE employees
SET department_id = 2, salary = 120000
WHERE id = 4;

UPDATE employees
SET department_id = 3, salary = 160000
WHERE id = 5;

UPDATE employees
SET department_id = 3, salary = 125000
WHERE id = 6;

UPDATE employees
SET department_id = 4, salary = 250000
WHERE id = 7;

UPDATE employees
SET department_id = 4, salary = 180000
WHERE id = 8;