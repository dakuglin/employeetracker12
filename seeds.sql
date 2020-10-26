-- Drops the employee_db if it already exists --
DROP DATABASE IF EXISTS employee_db;
-- Create a database called employee_db --
CREATE DATABASE employee_db;

-- Use programming db for the following statements --

USE employee_db;

CREATE TABLE department(
    id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INTEGER(11)

);

CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11) NULL

);


INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dana", "Kuglin", 5, 10);



