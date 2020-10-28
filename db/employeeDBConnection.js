const util = require("util"); //permisify 
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeeTracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  //connection.end();
});

// connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;