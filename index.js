var inquirer = require("inquirer");

const teamMembers =[];
console.log(teamMembers)

const startList= [
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
        name: "role",
    },
    {
        type: "input",
        message: "Who is the employees manager?", //question 
        name: "manager",
    }
];

const removeEmployee = [
    { 
        type: "list",
        message: "Which employee would you like to remove: ",
        name: "employeeRemoved",
        choices = [teamMembers],

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


function displayQuestionsList() {
    inquirer.prompt(startList)
    .then(function(response) {
      
        if (response.command === "View All Employees") {
            //view all employees
            console.log("success")
        }
        else if (response.command === "View All Employees By Department") {
            //view employees by department
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
    .then(function(response) {
        console.log(response.firstName)
        var employeeName = response.firstName;
        
        teamMembers.push(employeeName);
        console.log(teamMembers)

        displayQuestionsList()
    });
}


displayQuestionsList()



//PSEUDOCODE
//=====================================================================================

//Start the program and show user the 