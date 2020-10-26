
INSERT INTO department (name)
VALUES 
    ("Engineering"), 
    ("Accounting"), 
    ("Sales"), 
    ("Operations");


INSERT INTO role (title, salary, department_id)
VALUES 
    ("Filed Enginner", 100000, 1),
    ("Staff Engineer", 90000, 1),
    ("Operationa Accountant", 60000, 2),
    ("Accounts Recieviable" , 65000, 2),
    ("Sales Rep", 120000, 3),
    ("District Sales Manager", 140000, 3),
    ("Equipment Operator", 70000, 4),
    ("Crew Manager", 80000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Steven", "Brown", 1, NULL),
    ("Jon", "Dow", 2, NULL),
    ("Mary", "Johnson", 3, NULL),
    ("Susan", "White", 4, 3),
    ("Bob", "Ross", 5, NULL),
    ("Chuck", "Norris", 6, 5),
    ("Kim", "Dillon", 7, NULL),
    ("Patrick", "Star", 8, 7);

