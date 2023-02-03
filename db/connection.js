const mysql = require("mysql2");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
 {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'employees_db'
 },
 console.log(`Connected to the employees_db.`)
);

connection.connect(function (err) {
 if (err) throw err;
});

module.exports = connection;