//Required In Information
//==================================================================
const inquirer = require("inquirer");
const cTable = require("console.table"); 
const connection = require("./db/employeeDBConnection");
const db = require("./db"); //looks for index.js


//Console.Table
//==================================================================

// function Employee (firstName, lastName, role, manager) {
   
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.role = role;
//     this.manager = manager;
// }
// console.table(functiont)
//     {
//       name: 'test',
//       age: 10
//     }, {
//       name: 'test',
//       age: 2
//     }
//   ]);


//Variables
//===================================================================
const startList = [
{
    type: "list",
    message: "What would you like to do?", //question 
    name: "command",
    choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],  
}
];

const addEmployee = [
    {
        type: "input",
        message: "What is the first name of the employee?", //question 
        name: "first_name",
    },
    {
        type: "input",
        message: "What is the last name of the employee?", //question 
        name: "last_name",
    },
    {
        type: "input",
        message: "What is the employees role?", //question 
        name: "role_id",
    },
    {
        type: "input",
        message: "Who is the employees manager?", //question 
        name: "manager_id",
    }
];

const removeEmployee = [
    { 
        type: "list",
        message: "Which employee would you like to remove: ",
        name: "employeeRemoved",
        //choices = [teamMembers],

    }
];

const updateEmployee = [
    { 
        type: "input",
        message: "Which employee do you want to update: ",
        name: "employeeUpdate",
    },
    { 
        type: "input",
        message: "What is the new role of the employee: ",
        name: "employeeUpdateRole",
    }
];



//Functions
//===================================================================
function displayQuestionsList() {
    inquirer.prompt(startList)
    .then(function(response) {
      
        if (response.command === "View All Employees") {

            // connection.query("SELECT first_name, FROM employee", function(err, results, fields) {
            //     if(err) throw err;
            //     console.log(results);
            // });
        }
        else if (response.command === "View All Employees By Department") {

            // connection.query("SELECT * FROM department", function(err, results, fields) {
            //     if(err) throw err;
            //     console.log(results);
            // });
        }
        else if (response.command === "View All Employees By Manager") {
            //view al employees by manager
        }
        else if (response.command === "Add Employee") {
            addEmployeeFunction();
        }
        else if (response.command === "Remove Employee") {
            //remove employee
        }
        else if (response.command === "Update Employee Role") {
            //update employee role
        }
        else {
            //update employee manager
            console.log("testing")
        }  

    });
};


function addEmployeeFunction() {
    inquirer.prompt(addEmployee)
    .then(function({first_name, last_name, role_id, manager_id}) {

        // var employee = new employee(first_name, last_name, role_id, manager_id);

        // var sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('first_name', 'last_name', 'role_id', 'manager_id')"

        // connection.query(sql, function(err, result) {
        //     if (err) throw err;
        //     console.log("Inserted 1 employee");
        // });
 
        // displayQuestionsList()
    });
}


displayQuestionsList()


//PSEUDOCODE
//=====================================================================================

//Start the program and show user the 

// async function  view Employees () {
//     const employees  = await db.finalAllEmployees
// }


// switch (choice) (
//     case 'View_employees';
//     return viewEmployees();
// )

// function quit()

// const employeeChoices = employees.map(())

