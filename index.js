const { prompt } = require("inquirer");
const db = require("./db/");
require("console.table");

init();

function init() {
  console.log("Welcome! Please answer questions when prompted.");
  initializePrompts();
}

function initializePrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Please choose from the list:",
      choices: [
        {
          name: "View Current Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "View Current Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View Current Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Exit",
          value: "EXIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        exit();
    }
  });
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

// remove employee
function removeEmployee() {
  db.databasedEmployees().then(([rows]) => {
    let employees = rows;
    const employeeList = employees.map(({ id, last_name, first_name }) => ({
      name: `${last_name}, ${first_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Please select from the list:",
        choices: employeeList,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Employee removed from database."));
  })
  .then(() => initializePrompts);
}

// update employee role
function updateEmployeeRole() {
  db.databasedEmployees().then(([rows]) => {
    let employees = rows;
    const employeeList = employees.map(({ id, last_name, first_name }) => ({
      name: `${last_name}, ${first_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Please select employee from the list:",
        choices: employeeList,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.databasedRoles().then(([rows]) => {
        let roles = rows;
        const roleList = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Please select role update from the list:",
            choices: roleList,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Employee role updated."))
          .then(() => initializePrompts());
      });
    });
  });
}

// ROLE functions
// see all databased roles
function viewRoles() {
  db.databasedRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => initializePrompts());
}

// add role
function addRole() {
  db.databasedRoles().then(([rows]) => {
    let departments = rows;
    const departmentsList = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "Please provide role title:",
      },
      {
        name: "salary",
        message: "Please provide salary for this role:",
      },
      {
        type: "list",
        name: "department_id",
        message: "Please provide the department for the role:",
        choices: departmentsList,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() =>
          console.log(`${role.title} has been added to the database.`)
        )
        .then(() => initializePrompts());
    });
  });
}

// remove role
function removeRole() {
  db.databasedRoles().then(([rows]) => {
    let roles = rows;
    const roleList = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "roleId",
        message: "Please select desired role to remove from the list:",
        choices: roleList,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Role has been removed from database."))
      .then(() => initializePrompts())
  });
}

// DEPARTMENT functions
// see all databased departments
function viewDepartments() {
  db.databasedDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => initializePrompts());
}

// add department
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Please provide department name:",
    },
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to departments in database.`))
      .then(() => initializePrompts());
  });
}
// remove department
function removeDepartment() {
  db.databasedDepartments().then(([rows]) => {
    let departments = rows;
    const departmentsList = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message: "Please select which department to remove from list:",
      choices: departmentsList,
    })
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log(`Department removed from database.`))
      .then(() => initializePrompts())
  });
}

// adding employee
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Please provide employee first name:",
    },
    {
      name: "last_name",
      message: "Please provide employee last_name:",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.databasedRoles().then(([rows]) => {
      let roles = rows;
      const roleOptions = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "Please provide employee role:",
        choices: roleOptions,
      }).then((res) => {
        let roleId = res.roleId;

        db.databasedEmployees().then(([rows]) => {
          let employees = rows;
          const managerOptions = employees.map(
            ({ id, last_name, first_name }) => ({
              name: `${last_name}, ${first_name}`,
              value: id,
            })
          );

          managerOptions.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Please provide the name of the manager:",
            choices: managerOptions,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                last_name: lastName,
                first_name: firstName,
              };
              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${lastName}, ${firstName} to the database`)
            )
            .then(() => initializePrompts());
        });
      });
    });
  });
}

// EXIT function
function exit() {
  console.log("You have successfully exited the application.");
  process.exit();
}
