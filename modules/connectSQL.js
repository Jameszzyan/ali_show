// 引入mysql模块
var mysql = require("mysql");
// 创建与数据库的连接
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zhanziyan123",
  database: "ali_show",
  dateStrings: true
});
module.exports = connection;
