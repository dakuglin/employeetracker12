USE employeeTracker_db;

-- All employee query --

SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.department_name AS Department , role.salary AS Salary, CONCAT(manager.first_name, manager.last_name) AS Manager 
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department on role.department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id;



-- By manager query --

SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.department_name AS Department , role.salary AS Salary, CONCAT(manager.first_name, manager.last_name) AS Manager 
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department on role.department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE manager.id = ?;

-- By department query --

SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.department_name AS Department , role.salary AS Salary, CONCAT(manager.first_name, manager.last_name) AS Manager 
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department on role.department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE department.id = ?;


