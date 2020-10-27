const connection = require("./employeeDBConnection");

class DB {

    // constructor(connection) {
    //     this.connection = connection;
    // }

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


};

module.exports  = new DB(connection);

