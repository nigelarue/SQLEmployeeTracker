const { prompt } = require('inquirer');
const mysql = require('mysql');
const db = require('./db');
require('console.table');

init();

function init() {
 console.log('Welcome! Please answer questions when prompted.');
 initializePrompts();
}

function initializePrompts() {
  prompt([
   {
    type: 'list',
    name: 'choices',
    message: 'What is your designated role? Please choose from the list:',
    choices: [
     {
      name: 'View Current Employees',
      value:'VIEW_EMPLOYEES'
     },
     {
      name: 'View Current Employees By Department',
      value: 'VIEW_EMPLOYEES_DEPARTMENT'
     },
     {
      name: 'View Current Employees By Manager',
      value: 'VIEW_EMPLOYEES_MANAGER'
     },
     {
      name: 'Add Employee',
      value: 'ADD_EMPLOYEE'
     },
     {
      name: 'Remove Employee',
      value: 'REMOVE_EMPLOYEE'
     },
     {
      name: 'Update Employee Role',
      value: 'UPDATE_EMPLOYEE_ROLE'
     },
     {
      name: 'Update Employee Manager',
      value: 'UPDATE_EMPLOYEE_MANAGER'
     },
     {
      name: 'View Current Roles',
      value: 'VIEW_ROLES'
     },
     {
      name: 'Add Role',
      value: 'ADD-ROLE'
     },
     {
      name: 'Remove Role',
      value: 'REMOVE_ROLE'
     },
     {
      name: 'View Current Departments',
      value: 'VIEW_DEPARTMENTS'
     },
     {
      name: 'Add Department',
      value: 'ADD_DEPARTMENT'
     },
     {
      name: 'Remove Department',
      value: 'REMOVE_DEPARTMENT'
     },
     {
      name: 'Exit',
      value: 'EXIT'
     }
    ]
   }
  ]).then(res => {
   let choices = res.choices;
   switch (choices) {
    case 'VIEW_EMPLOYEES':
     viewEmployees();
     break;
    case 'VIEW_EMPLOYEES_DEPARTMENT':
     viewEmployeesDepartment();
     break;
    case 'VIEW_EMPLOYEES_MANAGER':
     viewEmployeesManager();
     break;
    case 'ADD_EMPLOYEE':
     addEmployee();
     break;
    case 'REMOVE_EMPLOYEE':
     removeEmployee();
     break;
    case 'UPDATE_EMPLOYEE_ROLE':
     updateEmployeeRole();
     break;
    case 'UPDATE_EMPLOYEE_MANAGER':
     updateEmployeeManager();
     break;
    case 'VIEW_DEPARTMENTS':
     viewDepartments();
     break;
    case 'ADD_DEPARTMENT':
     addDepartment();
     break;
    case 'REMOVE_DEPARTMENT':
     removeDepartment();
     break;
    case 'VIEW_ROLES':
     viewRoles();
     break;
    case 'ADD_ROLE':
     addRole();
     break;
    case 'REMOVE_ROLE':
     removeRole();
     break;
    default:
     exit();
   }
  }
  )
}

// functions for above calls below to pull databased employees, roles, departments, and managers.

// EMPLOYEE functions
// see all databased employees
function viewEmployees() {
 db.databasedEmployees()
   .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
   })
   .then(() => initializePrompts());
}
// adding employee
function addEmployee() {
 prompt([
  {
   name: 'forename',
   message: 'Please provide employee first name:'
  },
  {
   name: 'surname',
   message: 'Please provide employee surname:'
  },
 ])
  .then(res => {
   let firstName = res.forename;
   let lastName = res.surname;

   db.databasedRoles()
     .then(([rows]) => {
      let roles = rows;
      const roleOptions = roles.map(({ id, title }) => (
       {
        name: title,
        value: id
       }));
       prompt({
        type: 'list',
        name: 'roleId',
        message: 'Please provide employee role:',
        choices: roleOptions
       })
         .then(res => {
           let roleId = res.roleId;
           db.databasedEmployees()
             .then(([rows]) => {
              let employees = rows;
              const managerOptions = employees.map(({ id, surname, forename }) => (
               {
                name: `${surname}, ${forename}`,
                value: id
               }));

               managerOptions.unshift({ name: 'None', value: null });

               prompt({
                type: 'list',
                name: 'managerId',
                message: 'Please provide the name of the manager:',
                choices: managerOptions
               })
                 .then(res => {
                  let employee = {
                   manager_id: res.managerId,
                   role_id: roleId,
                   surname: lastName,
                   forename: firstName
                  }
                  db.createEmployee(employee);
                 })
                 .then(() => console.log(`Added ${lastName} ${firstName} to the database`)).then(() => initializePrompts())
             })
         })
     })
  })
}
// remove employee
function removeEmployee() {
 db.databasedEmployees()
   .then(([rows]) => {
    let employees = rows;
    const employeeList = employees.map(({ id, surname,forename }) => ({
     name: `${surname}, ${forename}`,
     value: id
    }));
    prompt([{
     type: 'list',
     name: 'employeeId',
     message: 'Please select from the list:',
     choices: employeeList
    }])
       .then(res => db.removeEmployee(res.employeeId))
       .then(() => console.log('Employee removed from database.'))
       .then(() => initializePrompts)
   })
}
// update employee role & manager
function updateEmployeeRole() {
 db.databasedEmployees()
   .then(([rows]) => {
    let employees = rows;
    const employeeList = employees.map(({ id, surname, forename }) => ({
     name: `${surname}, ${forename}`,
     value: id
    }));
    prompt([{
     type: 'list',
     name: 'employeeId',
     message: 'Please select employee from the list:',
     choices: employeeList
    }]).then(res => {
     let employeeId = res.employeeId;
     db.databasedRoles()
       .then(([rows]) => {
        let roles = rows;
        const roleList = roles.map(({ id, title }) => ({
         name: title,
         value: id
        }));
        prompt([
         {
          type: 'list',
          name: 'roleId',
          message: 'Please select role update from the list:',
          choices: roleList
         }
        ])
         .then(res => db.updateEmployeeRole(employeeId, res.roleId))
         .then(() => console.log('Employee role updated.'))
         .then(() => initializePrompts())
       });
    });
   })
}
function updateEmployeeManager() {
 db.databasedEmployees()
   .then(([rows]) => {
    let employees = rows;
    const employeeList = employees.map(({ id, surname, forename }) => ({
     name: `${surname}, ${forename}`,
     value: id
    }));
    prompt([
      {
       type: 'list',
       name: 'employeeId',
       message: 'Please select manager update from the list:',
       choices: employeeList
      }
    ])
      .then(res => {
       let employeeId = res.employeeId
       db.databasedManagers(employeeId)
         .then(([rows]) => {
          let managers = rows;
          const managerList = managers.map(({ id, surname, forename }) => ({
           name: `${surname}, ${forename}`,
           value: id
          }));
          prompt([
           {
            type: 'list',
            name: 'managerId',
            message: 'Please select new manager from the list:',
            choices: managerList
           }
          ])
            .then(res => db.updateEmployeeManager(employeeId, res.managerId))
            .then(() => console.log('Employee manager updated.'))
            .then(() => initializePrompts)
         })
      })
   })
}

