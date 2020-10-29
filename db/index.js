const connection = require("./employeeDBConnection");

class DB {

    constructor(connection) {
        this.connection = connection;
    }

    addEmployee(employee) {  //method

        return this.connection.query("INSERT INTO employee SET ?", employee)
    }
    // class Employee (firstName, lastName, roleId, managerId) {
    //     return this.connection.query("INSERT INTO employee SET ?", employee)
    // }
    // createEmployee(employee) {
    //     return this.connection.query("INSERT INTO employee SET ?", employee)
    // }

    // addDepartment(department_name) {  //method

    //     return this.connection.query("INSERT INTO department SET ?", department)
    // }

    allEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

};

module.exports  = new DB(connection);
