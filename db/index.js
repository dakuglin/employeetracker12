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


};

module.exports  = new DB(connection);

