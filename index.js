//Required In Information
//==================================================================
const inquirer = require("inquirer");
const consoleTalbe = require("console.table"); 
const connection = require("./db/employeeDBConnection");
const db = require("./db"); //looks for index.js
//const { connect, query } = require("./db/employeeDBConnection");


//Variables
//===================================================================

const startList = [
{
    type: "list",
    message: "What would you like to do?", //question 
    name: "command",
    choices: [
        // {
        //     name: "View All Employees", 
        //     value: "viewAllEmployees",
        // },
        // {
        //     name: "View All Employees By Department",
        //     value: "viewAllEmployeesByDepartment",
        // },
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
        {
            name:  "Update Employee Role", 
            value: "updateEmployeeRole",
        },
        // {
        //     name:  "Update Employee Manager",
        //     value: "updateEmployeeManager",
        // },
        // {
        //     name:  "Remove Department",
        //     value: "removeDepartment",
        // },     
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
        name: "first_name",
    },
    {
        type: "input",
        message: "What is the last name of the employee?", //question 
        name: "last_name",
    },
    // {
    //     type: "input",
    //     message: "What is the employees role?", //question 
    //     name: "role_id",
    // },
    // {
    //     type: "input",
    //     message: "Who is the employees manager?", //question 
    //     name: "manager_id",
    // }
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
            // case "viewAllEmployees":
            //     console.log("selected view all employees");
            //     //viewAllEmployeesFunction();
            //     //queryEmployees();
            //     break;   
            // case "viewAllEmployeesByDepartment" :
            //     console.log("selected view all employees by department");
            //     break;
        //     case "viewAllEmployeesByManager" :
        //         console.log("bye manager");  
        //         break; 
            case "addEmployee" :
                addEmployeeFunction();
                break;  
        //     case "removeEmployee" :
        //         console.log("remove employee");  
        //         break;  
            case "updateEmployeeRole" :
                console.log("updated employee");
                updateEmployeeRoleFunction()  
                break; 
        //     case "updateEmployeeManager" :
        //         console.log("updated employee manager");  
        //         break; 
        //    case "removeDepartment" :
        //        console.log("removed deaprtment");
        //        removeDepartmentFunction();
        //         break;
            case "addDepartment" :
                addDepartmentFunction();
                break;    
            default : 
                endQuiz();
        }
        
    }) 
};    

//Add Employee _________________________________________________________________________________
function addEmployeeFunction() {
        inquirer.prompt(addEmployee)
        .then(function(employeeName) {
           // console.log(data);
            var departments = [];
            connection.query("SELECT * FROM department", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    var department = res[i].department_name;
                    var id = res[i].id;
                    
                    var departmentObj = {
                        name: department,
                        id: id,
                    }
                    departments.push(departmentObj)
                }  
                var allDeaprtment = [   
                {
                    type: "list",
                    message: "What is the employees role?",
                    name: "departmentList",
                    choices: departments
                    
                }]
                inquirer.prompt(allDeaprtment)
                .then(function(responseDeaprtment) {
                    console.log(responseDeaprtment);
                }) 
                
            //____________________________________________________
            var managers = [];
            connection.query("SELECT * FROM employee", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    var manager = res[i].manager_id;
                    var id = res[i].id;
                    
                    var managerObj = {
                        name: manager,
                        id: id,
                    }
                    managers.push(managerObj)
                }  
                var allManagers = [   
                {
                    type: "list",
                    message: "Who is the employees manager?",
                    name: "managerList",
                    choices: managers
                    
                }]
                inquirer.prompt(allManagers)
                .then(function(responseManagers) {
                    console.log(responseManagers);
                }) 
                              
            });        
                      
        });
    })
}; 

// var query = connection.query("INSERT INTO employee SET ?", data,

            //     function(err, res) {
            //         if (err) throw err;
            //         displayQuestionsList();
            //         connection.end();
            //     }
            
        
            // );

 
//---------------------------------------------------------------------------------------------------
function queryEmployees() {
   var employees = [];
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        var employeeName = res[i].first_name //finds all names in employee table
        var employeeId  = res[i].role_id; //finds all role id's in employee table
    
        var employeeObj = {
        name: employeeName,
        id: employeeId,
        }

        employees.push(employeeObj)
        console.log(employees)

       
    }
    
        var allEmployees = [
        {
            type: "list",
            message: "HERE IS MY QUESTION",
            name: "listOFCurrentNames",
            choices: employees
            
        }]
     
      
    
    
        inquirer.prompt(allEmployees)
        .then(function(response) {
            console.log(response);
        })
    
    //   connection.end();
    });
  }

//Remove Departments _________________________________________________________________________________
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


//Add Department___________________________________________________________________________
function addDepartmentFunction() {
    console.log("IN ADD DEPARTMETN FNX");

    var viewdepartments = 'SELECT department_name AS "Department" FROM department';
    connection.query(viewdepartments, function(err,result) {
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

function updateEmployeeRoleFunction() {
    console.log("WE ARE IN UPDATE EMPLOYEE ROLE FNX")
    var employees = [];
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var employee = res[i].first_name;
            var id = res[i].id;
            
            var employeeObj = {
                name: employee,
                id: id,
            }
            employees.push(employeeObj)
            
        //connection.end()
        }  
        var allEmployees = [   
        {
            type: "list",
            message: "Select which employee's role you wnat to update: ",
            name: "employeeUpdate",
            choices: employees
            
        }]
        inquirer.prompt(allEmployees)
        .then(function(response) {
            console.log(response);
        }) 

        connection.end()
    });
    //_____________________________________
    var roles = [];
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var role = res[i].role_id;
            var id = res[i].id;
            
            var roleObj = {
                name: role,
                id: id,
            }
            roles.push(roleObj)
        }  
        var allRoles = [   
        {
            type: "list",
            message: "Select which role you want to assign to the employee: ",
            name: "roleUpdate",
            choices: employees
            
        }]
        inquirer.prompt(allRoles)
        .then(function(response) {
            console.log(response);
        }) 
    });

}


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
