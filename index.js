//Required In Information
//==================================================================
const inquirer = require("inquirer");
const consoleTalbe = require("console.table"); 
const connection = require("./db/employeeDBConnection");
const db = require("./db"); //looks for index.js

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
        // {
        //     name:  "View All Employees By Manager", 
        //     value: "viewAllEmployeesByManager",
        // },
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
        // {
        //     name:  "Update Employee Manager",
        //     value: "updateEmployeeManager",
        // },
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

//Functions
//==========================================================================================

function displayQuestionsList() {
    inquirer.prompt(startList)
    .then(function(response) {

        switch (response.command) {
            case "viewAllEmployees":
                viewAllEmployeesFunction();
                //queryEmployees();
                break;   
            case "viewAllEmployeesByDepartment" :
                viewAllEmployeesByDeaprtmentFunction()
                break;
        //     case "viewAllEmployeesByManager" :
        //         console.log("bye manager");  
        //         break; 
            case "addEmployee" :
                addEmployeeFunction();
                break;  
            case "removeEmployee" :
                removeEmployeeFunction(); 
                break;  
            case "updateEmployeeRole" :
                console.log("updated employee");
                updateEmployeeRoleFunction()  
                break; 
        //     case "updateEmployeeManager" :
        //         console.log("updated employee manager");  
        //         break; 
           case "removeDepartment" :
               console.log("removed deaprtment");
               removeDepartmentFunction();
                break;
            case "addDepartment" :
                addDepartmentFunction();
                break;    
            default : 
                endQuiz();
        }
        
    }) 
};    

//View All Employees__________________________________________________________________________
 function viewAllEmployeesFunction() {
        connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id", function(err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res)
            displayQuestionsList(); //function to call back original list of questions
        }  
    );
};

//View All Employees By Department_____________________________________________________________
function viewAllEmployeesByDeaprtmentFunction() {
    var query = connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            message: "Please select what department you would like to view: ",
            name: "departmentList",
            choices: function() {
                var availableDepartments = res.map(e => e.department_name);
                return availableDepartments;
            }

        }]).then(function(res) {
            console.log("\n");
            console.log(res);
           //PUT MY SELECT QUERY HERE
           //     connection.query(
            //     "SELECT employee.id, employee.first_name, employee.last_name, department.department_name AS department INNER JOIN department ON role.department_id = department.id", function(err, res) {
            //         if (err) throw err
            //         console.log("\n");
            //         console.table(res)
            //     }  
            // );

        })
    })

    //displayQuestionsList(); //function to call back original list of questions

};

//Add Employee _________________________________________________________________________________
function addEmployeeFunction() {
    var query = connection.query("SELECT role.title, employee.manager_id FROM role INNER JOIN employee ON role.department_id = employee.role_id",function(err, res) {
        if (err) throw err;
        //console.log(res);
        var roleTitle = [];
        for (var i=0; i < res.length; i++) {
            var employees = res[i].title
            roleTitle.push(employees)
            console.log(roleTitle)
        }
        inquirer.prompt([
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
                type: "list",
                message: "What is the employee's role?", //question 
                name: "title",
                choices: roleTitle
            },
            // {
            //     type: "list",
            //     message: "Who is the employee's manager?", //question 
            //     name: "title",
            //     choices: "SOMETHING HERE"
            // }
        ]).then(function(response) {
            console.log(response)
            displayQuestionsList(); //function to call back original list of questions
            //push response back to data table
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

//Remove Employee _________________________________________________________________________________
function removeEmployeeFunction() {
    var query = connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        var employees = [];
        for (var i=0; i < res.length; i++) {
            var employee = res[i].first_name;
            employees.push(employee);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Select which employee you want to remove: ",
                name: "first_name",
                choices: employees  
            },
        ]).then(function(response) {
            console.log(response)
            var query2 = connection.query("DELETE FROM employee WHERE ?", response, function(err,res) {
                console.log("sucessfully removed employee");
                displayQuestionsList(); //function to call back original list of questions
            })   
        });
    })   
};




//Remove Departments _________________________________________________________________________________
function removeDepartmentFunction() {
    var query = connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        var departments = [];
        for (var i=0; i < res.length; i++) {
            var department = res[i].department_name;
            departments.push(department);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Select which department you want to remove: ",
                name: "department_name",
                choices: departments  
            },
        ]).then(function(response) {
            var query2=connection.query("DELETE FROM department WHERE ?",response,function(err,res){   
                console.log("Sucessfully removed chosen department.");
                displayQuestionsList(); //function to call back original list of questions
            })  
        });
    })
};

//Add Department___________________________________________________________________________
function addDepartmentFunction() {
    var viewdepartments = 'SELECT department_name AS "Department" FROM department';
    connection.query(viewdepartments, function(err,result) {
        if (err) throw (err); 
    });
        inquirer.prompt({
            type: "input",
            message: "Please provide a department name to add: ",
            name: "department_name"
        }).then(function(data) {
            var query = connection.query("INSERT INTO department SET ?", data, function(err, res) {
                if (err) throw err;
                displayQuestionsList()
            }    
        ) 
    })
};

//Update Employee Role______________________________________________________________________
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

//End Quiz____________________________________________________________________________
function endQuiz() {
    console.log("Ending questions")
    process.exit()
};

displayQuestionsList()

//---------------------------------------------------------------------------------------------------
// function queryEmployees() {
//    var employees = [];
//     connection.query("SELECT * FROM employee", function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         var employeeName = res[i].first_name //finds all names in employee table
//         var employeeId  = res[i].role_id; //finds all role id's in employee table
    
//         var employeeObj = {
//         name: employeeName,
//         id: employeeId,
//         }

//         employees.push(employeeObj)
//         console.log(employees)

       
//     }
    
//         var allEmployees = [
//         {
//             type: "list",
//             message: "HERE IS MY QUESTION",
//             name: "listOFCurrentNames",
//             choices: employees
            
//         }]
     
      
    
    
//         inquirer.prompt(allEmployees)
//         .then(function(response) {
//             console.log(response);
//         })
    
//     //   connection.end();
//     });
//   }
