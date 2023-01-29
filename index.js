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