/**
 * Created by Administrator on 2016/12/19.
 */
//var mysql = require("mysql");

var option = {
    localhost: "127.0.0.1",
    user: "root",
    password: "root",
    database: "cmsm_1501d"
}
var pool = mysql.createPool(option);

pool.getConnection(function (err, connection) {
    if (err) return console.error(err);
    connection.query("select * from user", function (err, file) {
        if (err) return console.error(err);
        console.log(file);
    })
    connection.end();
})
