

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(255),email VARCHAR(255),username VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "INSERT INTO users (username, password) VALUES ('tato', 'toto')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

function register(name,email,username,password) {
    var sql = "INSERT INTO users (username, password) VALUES ('"+name+"','"+email+"'"+username+"','"+password+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

