require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.query("show tables", (err, result, fields) => {
  if (err) {
    console.log(err);
  }
  return console.log(result);
})

module.exports = connection;