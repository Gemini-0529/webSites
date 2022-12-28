const mysql = require("mysql");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "12345678",
  database: "zwb_db",
});
db.connect((err) => {
  if (err) throw err;
  console.log("---db connect---");
});

module.exports =  db;
