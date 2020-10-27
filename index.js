//Required In Information
//==================================================================
const inquirer = require("inquirer");
const consoleTalbe = require("console.table"); 
const connection = require("./db/employeeDBConnection");
const db = require("./db"); //looks for index.js
//const { connect, query } = require("./db/employeeDBConnection");


//Variables
//===================================================================

// const cTable = [];
// console.table(cTable);

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
        // {
        //     name:  "View All Employees By Manager", 
        //     value: "viewAllEmployeesByManager",
        // },
        {
            name:  "Add Employee", 
            value: "addEmployee",
        },
        // {
        //     name:  "Remove Employee", 
        //     value: "removeEmployee",
        // },
        // {
        //     name:  "Update Employee Role", 
        //     value: "updateEmployeeRole",
        // },
        // {
        //     name:  "Update Employee Manager",
        //     value: "updateEmployeeManager",
        // },
        // {
        //     name:  "Remove Department",
        //     value: "removeDepartment",
        // },     
        // {
        //     name:  "Add Department",
        //     value: "addDepartment",
        // },    
    ]  
}];

console.log(startList)

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
                // viewAllEmployeesFunction();
                queryEmployees();
                break;   
            case "viewAllEmployeesByDepartment" :
                console.log("selected view all employees by department");
                break;
            // case "viewAllEmployeesByManager" :
            //     console.log("bye manager");  
            //     break; 
            case "addEmployee" :
                console.log("add employee");  
                addEmployeeFunction();
                break;  
            // case "removeEmployee" :
            //     console.log("remove employee");  
            //     break;  
            // case "updateEmployeeRole" :
            //     console.log("updated employee");  
            //     break; 
            // case "updateEmployeeManager" :
            //     console.log("updated employee manager");  
            //     break; 
        //    case "removeDepartment" :
        //        console.log("removed deaprtment");
        //        removeDepartmentFunction();
        //         break;
        //     case "addDepartment" :
        //         //console.log("add department");
        //         addDepartmentFunction();
        //         break;    
            default : 
                endQuiz();
        }
        
    }) 
};    

// function viewAllEmployeesFunction() {
//     //console.log("success")
// }

function addEmployeeFunction() {

    console.log("INSIDE THE ADD EMPLOYEE FUNCTION")

        inquirer.prompt(addEmployee)
        .then(function(data) {
            console.log(data);
            var query = connection.query("INSERT INTO employee SET ?", data,

            function(err, res) {
                if (err) throw err;
                displayQuestionsList();
                connection.end();
            }
            
        
        );
    });
};   

function queryEmployees() {
   
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
          
          var employeeName = res[i].first_name //finds all names in employee table
          var employeeId  = res[i].role_id; //finds all role id's in employee table
          var allEmployees = [
            {
                type: "list",
                message: "HERE IS MY QUESTION",
                name: "listOFCurrentNames",
                choices: [{
                    name: employeeName,
                    id: employeeId
                }]
            }]
          //console.log(allEmployees[0])
      }

        //    inquirer.prompt({
              
            
              
        //   }).then(function(response) {
        //       console.log(response);
        //   })

      //connection.end();
    });
  }

  //var employee = new Employee(firstName, lastName, roleId, managerId);
        // console.log(employee)
         //const newEmployee = db.addEmployee()

        // var sql = "INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES ('firstName', 'lastName', 'roleId', 'managerId')"

        // connection.query(sql, function(err, result) {
        //     if (err) throw err;
        //     console.log("Inserted 1 employee");
        //     console.table(result);
        //     connection.end()
        // });


//===================================================================================================
// function removeDepartmentFunction() {
//     console.log("IN REMOVE DEPARTMETN FNX")
//     departmentNames = 'SELECT * FROM department';  //select from talbe 
    
//     connection.query(departmentNames, function(err, result) {
//         // connection.end()
//        // if (err) throw err;
   
//         inquirer.prompt([
//             { 
//                 type: "list",
//                 message: "Which department would you like to remove: ",
//                 name: "department",
//                 choices: function() {
//                     var choicesArr = result.map(choice => choice.name)
//                     return choicesArr
//                 }
//             },
//         ]).then(function(response) {
            
//             connection.query('DELETE FROM department WHERE ?', {department_name: response.department})
//             console.log("deleted")
//             displayQuestionsList()
//             // connection.end()

//         })
        
//     })

// }

function addDepartmentFunction() {
    console.log("IN ADD DEPARTMETN FNX");

    var viewDepartments = 'SELECT department_name AS "Department" FROM department';
    connection.query(viewDepartments, function(err,result) {
        if (err) throw (err); 
    });

        inquirer.prompt({
            type: "input",
            message: "Please provide a department name to add: ",
            name: "department_name"
        }).then(function(data) {
            console.log(data)
            var query = connection.query("INSERT INTO department SET ?", data,

            function(err, res) {

                if (err) throw err;
                //console.table(res.department_name)
                //console.log(res)
                //console.log("success")
                displayQuestionsList()
                connection.end()
            }
            
        ) 
    })

};

// function addRoleFunction() {
//     console.log("WE ARE IN ADD ROLE FNX")
// }


function endQuiz() {
    console.log("Ending questions")
    process.exit()
};

displayQuestionsList()


//PSEUDOCODE
//=====================================================================================

//Start the program and show user the 

// async function  view Employees () {
//     const employees  = await db.finalAllEmployees
// }
