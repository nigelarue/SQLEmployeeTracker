const connection = require('./connection');

class DB {
 constructor(connection) {
  this.connection = connection;
 }
 // Pulls all employees with their associated roles, departments, salaries, and managers.
 databasedEmployees() {
  return this.connection.promise().query(
   'SELECT employee.id, employee.surname, employee.forename, role.title, department.name AS department, role.salary, CONCAT(manager.surname, " ", manager.forename) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
  );
 }
 databasedManagers(employeeId) {
  return this.connection.promise().query(
   'SELECT id, surname, forename FROM employee WHERE id != ?',
   employeeId
  );
 }
 createEmployee(employee) {
  return this.connection.promise().query(
   'INSERT INTO employee SET ?', 
   employee
  );
 }
 removeEmployee(employeeId) {
  return this.connection.promise().query(
   'DELETE FROM employee WHERE id = ?',
   employeeId
  );
 }
 updateEmployeeRole(employeeId, roleId) {
  return this.connection.promise().query(
   'UPDATE employee SET role_id = ? WHERE id = ?',
   [roleId, employeeId]
  );
 }
 databasedRoles() {
  return this.connection.promise().query(
   'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
  );
 }
 createRole(role) {
  return this.connection.promise().query(
   'INSERT INTO role SET ?', role
  );
 }
 removeRole(roleId) {
  return this.connection.promise().query(
   'DELETE FROM role WHERE id = ?',
   roleId
  );
 }
 databasedDepartments() {
  return this.connection.promise().query(
   'SELECT department.id, department.name FROM department;'
  );
 }
 createDepartment(department) {
  return this.connection.promise().query(
   'INSERT INTO department SET ?',
   department
  );
 }
 removeDepartment(departmentId) {
  return this.connection.promise().query(
   'DELETE FROM department WHERE id = ?',
   departmentId
  );
 }
}

module.exports = new DB(connection);