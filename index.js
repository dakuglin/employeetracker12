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
                updateEmployeeRoleFunction()  
                break; 
            case "updateEmployeeManager" :
                    updateEmployeeManagerFunction();
                break; 
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
        connection.query("SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.department_name AS Department , role.salary AS Salary, CONCAT(manager.first_name, manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function(err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res)
            displayQuestionsList(); //function to call back original list of questions
        }  
    );
};

//View All Employees By Department_____________________________________________________________
function viewAllEmployeesByDeaprtmentFunction() {
    var departmentChoices = [];
    var query = connection.query('SELECT * FROM department' , function(err, res) {
        if (err) throw err;
        console.log(res);
        //return res
        for (var i=0; i < res.lenght; i++) {
            var id = res[i].id;
            console.log(id)
            var department = res[i].department_name;
            console.log(department)

            var newObj = {

                value: id,
                name: department
            }
            //console.log(newObj)
            departmentChoices.push(newObj)
            return departmentChoices
        }
        displayQuestionsList(); //function to call back original list of questions
       // console.log(departmentChoices)
    })
        console.log(departmentChoices)
        console.log(query)
    
};

// function queryEmployees() {

//     var employees = [];
//      connection.query("SELECT * FROM department", function(err, res) {
//        if (err) throw err;
//        for (var i = 0; i < res.length; i++) {
//          var employeeName = res[i].department_name //finds all names in employee table
//          //var employeeId  = res[i].role_id; //finds all role id's in employee table
 
//          var testObj = {
//          name: employeeName,
//          id: employeeId
//          }
 
//          console.log(testObj)
//          id: employeeId,
         
 
//          employees.push(employeeObj)
//          console.log(employees)
//         }
 
//      })

// }

// queryEmployees()
            // inquirer.prompt([{
            //     type: "list",
            //     message: "Please select what department you would like to view: ",
            //     name: "departmentList",
            //     choices: function() {
            //         var availableDepartments = res.map(e => e.department_name);
            //         return availableDepartments;
            //     }

            // }]).then(function(res) {
            //     console.log("\n");
            //     console.log(res);
           //PUT MY SELECT QUERY HERE
           //     connection.query(
            //     "SELECT employee.id, employee.first_name, employee.last_name, department.department_name AS department INNER JOIN department ON role.department_id = department.id", function(err, res) {
            //         if (err) throw err
            //         console.log("\n");
            //         console.table(res)
            //     }  
            // );
            //displayQuestionsList(); //function to call back original list of questions

        // }

//Add Employee _________________________________________________________________________________
function addEmployeeFunction() {
    var query = connection.query("SELECT employee.id, employee.first_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id",
    function(err, res) {
        if (err) throw err;
         //console.log(res)
        var roleTitle = [];
        var manager = [];
        for (var i=0; i < res.length; i++) {
            var employees = res[i].title;
            var id = res[i].id;
            var name = res[i].first_name;
            roleTitle.push(employees);
            manager.push(name);
            // console.log(roleTitle)
            // console.log(manager)

            roleObj  = {
                value: id,
                name: roleTitle
            }
           // console.log(roleObj)
            managerObj  = {
                value: id,
                name: manager
            }
            console.log(roleObj)
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
                choices: roleObj
            },
            {
                type: "list", 
                message: "Who is the employee's manager?", //question 
                name: "manager_id",
                choices: managerObj //NEEDS TO BE AN OBJECT
            }
        ]).then(function(response) {
            console.log(response)
            var query2 = connection.query("INSERT INTO employee SET ?",response,function(err,res) {
                if (err) throw err;
                console.log("Sucessfully added new employee.");
                displayQuestionsList(); //function to call back original list of questions
            })
        
        });
    })
};

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




//Remove Departments ____________________________________________________________________________
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
                displayQuestionsList(); //function to call back original list of questions
            }    
        ) 
    })
};

//Update Employee Role______________________________________________________________________
function updateEmployeeRoleFunction() {
    var employees = [];
    var roles = [];
    connection.query("SELECT employee.first_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", 
    function(err, res) {
        if (err) throw err;
        //console.log(res);
        for (var i = 0; i < res.length; i++) {
            var employee = res[i].first_name;
            var role = res[i].title;
            // console.log(employee)
            // console.log(id)
            employees.push(employee);
            roles.push(role);

            //console.log(employees)
            //console.log(role)
        };
  
        inquirer.prompt([
            { 
                type: "list",
                message: "Which employee do you want to update: ",
                name: "first_name",
                choices: employees
            },
            { 
                type: "list",
                message: "What is the new role of the employee: ",
                name: "role_id",
                choices: roles
            }
        ]).then(function(response) {
            console.log(response);
            var query2 = connection.query("INSERT INTO employee SET ?",function(err, res) {
                if (err) throw err;
                console.log(res)
                console.log("updated");
                displayQuestionsList(); //function to call back original list of questions
            })
        }) 
  
})
}

//Update Employee Manager___________________________________________________________________
function updateEmployeeManagerFunction() {
    console.log("we are in the function")

    inquirer.prompt([
        { 
            type: "list",
            message: "Which employee do you want to update with new manager: ",
            name: "first_name",
            //choices: employees
        },
        { 
            type: "list",
            message: "Who is the new manager: ",
            name: "manager_id",
            //choices: roles
        }
    ]).then(function(response) {
        console.log(response);
        var query2 = connection.query("INSERT INTO employee SET ?",function(err, res) {
            if (err) throw err;
            console.log(res)
            console.log("Sucessfully updated manager");
            displayQuestionsList(); //function to call back original list of questions
        })
    }) 

    
};

//End Quiz__________________________________________________________________________________
function endQuiz() {
    console.log("Ending questions")
    process.exit()
};

displayQuestionsList()
