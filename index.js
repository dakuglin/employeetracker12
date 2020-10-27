//Required In Information
//==================================================================
const inquirer = require("inquirer");
const consoleTalbe = require("console.table"); 
const connection = require("./db/employeeDBConnection");
const db = require("./db"); //looks for index.js
const { connect } = require("./db/employeeDBConnection");


//Variables
//===================================================================

const startList = [
{
    type: "list",
    message: "What would you like to do?", //question 
    name: "command",
    choices: [
        {
            name: "View All Employees", 
            value: "viewAllEmployees",
        },
        {
            name: "View All Employees By Department",
            value: "viewAllEmployeesByDepartment",
        },
        {
            name:  "View All Employees By Manager", 
            value: "viewAllEmployeesByManager",
        },
        {
            name:  "Add Employee", 
            value: "addEmployee",
        },
        {
            name:  "Remove Employee", 
            value: "removeEmployee",
        },
        {
            name:  "Update Employee Role", 
            value: "updateEmployeeRole",
        },
        {
            name:  "Update Employee Manager",
            value: "updateEmployeeManager",
        },
        {
            name:  "Remove Department",
            value: "removeDepartment",
        },     
        {
            name:  "Add Department",
            value: "addDepartment",
        },    
    ]  
}];

const addEmployee = [
    {
        type: "input",
        message: "What is the first name of the employee?", //question 
        name: "firstName",
    },
    {
        type: "input",
        message: "What is the last name of the employee?", //question 
        name: "lastName",
    },
    {
        type: "input",
        message: "What is the employees role?", //question 
        name: "roleId",
    },
    {
        type: "input",
        message: "Who is the employees manager?", //question 
        name: "managerId",
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
// const removeDepartment = [
//     { 
//         type: "input",
//         message: "Which department would you like to remove: ",
//         name: "removeDepartment",
//     },
// ];

//Functions
//===================================================================

function displayQuestionsList() {
    inquirer.prompt(startList)
    .then(function(response) {

        switch (response.command) {
            case "viewAllEmployees":
                //console.log("selected view all employees");
                viewAllEmployeesFunction();
                break;   
            case "viewAllEmployeesByDepartment" :
                console.log("selected view all employees by department");
                break;
            case "viewAllEmployeesByManager" :
                console.log("bye manager");  
                break; 
            case "addEmployee" :
                console.log("add employee");  
                addEmployeeFunction();
                break;  
            case "removeEmployee" :
                console.log("remove employee");  
                break;  
            case "updateEmployeeRole" :
                console.log("updated employee");  
                break; 
            case "updateEmployeeManager" :
                console.log("updated employee manager");  
                break; 
           case "removeDepartment" :
               console.log("removed deaprtment");
               removeDepartment();
                break;
            case "addDepartment" :
                console.log("add department");
                break;    
            default : 
                //end quiz
        }
        
    }) 
};    

function viewAllEmployeesFunction() {

    //console.log("success")

}




// function addEmployeeFunction() {
//     inquirer.prompt(addEmployee)
//     .then(function({firstName, lastName, roleId, managerId}) {
//          //console.log({firstName})
//          //console.log(firstName)
//          //var employee = new Employee(firstName, lastName, roleId, managerId);
//        // console.log(employee)
//          //const newEmployee = db.addEmployee()

//         var sql = "INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES ('firstName', 'lastName', 'roleId', 'managerId')"

//         connection.query(sql, function(err, result) {
//             if (err) throw err;
//             console.log("Inserted 1 employee");
//             console.table(result);
//             connection.end()
//         });

    
//         // displayQuestionsList()
//     });
// }

const removeDepartment = () => {
    console.log("IN REMOVE DEPARTMETN FNX")
    departmentNames = 'SELECT * FROM department';  //select from talbe name
    
    connection.query(departmentNames, function(err, results) {
        // connection.end()
       // if (err) throw err;
   
        inquirer.prompt([
            { 
                type: "list",
                message: "Which department would you like to remove: ",
                name: "department",
                choices: function() {
                    var choicesArr = results.map(choice => choice.name)
                    return choicesArr
                }
            },
        ]).then(function(response) {
            
            connection.query('DELETE FROM department WHERE ?', {name: response.department})
            console.log("deleted")
            displayQuestionsList()
            // connection.end()

        })
        
    })

}

function addDepartment() {
    console.log("IN ADD DEPARTMETN FNX");
    var addDepartment = ''
}


// async function addEmployeeFunction() {
//     //const newEmployee = await db.addEmployee();

//     inquirer.prompt(addEmployee)
//     .then(function({firstName, lastName, roleId, managerId}) {
        

//         console.log({firstName, lastName, roleId, managerId})
//             // var sql = "INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES ('firstName', 'lastName', 'roleId', 'managerId')"

//             // connection.query(sql, function(err, result) {
//             //     if (err) throw err;
//             //     console.log("Inserted 1 employee");
//             //     console.table(result);
//             //   });
//     })
// }

displayQuestionsList()














        // if (employee.command === "View All Employees") {

        //     // connection.query("SELECT firstName, FROM employee", function(err, results, fields) {
        //     //     if(err) throw err;
        //     //     console.log(results);
        //     // });
        // }
        // else if (employee.command === "View All Employees By Department") {

        //     // connection.query("SELECT * FROM department", function(err, results, fields) {
        //     //     if(err) throw err;
        //     //     console.log(results);
        //     // });
        // }
        // else if (employee.command === "View All Employees By Manager") {
        //     //view al employees by manager
        // }
        // else if (employee.command === "Add Employee") {
        //     addEmployeeFunction();
        // }
        // else if (employee.command === "Remove Employee") {
        //     //remove employee
        // }
        // else if (employee.command === "Update Employee Role") {
        //     //update employee role
        // }
        // else {
        //     //update employee manager
        //     console.log("testing")
        // }  

  
//PSEUDOCODE
//=====================================================================================

//Start the program and show user the 

// async function  view Employees () {
//     const employees  = await db.finalAllEmployees
// }




// function quit()

// const employeeChoices = employees.map(())

