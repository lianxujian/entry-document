/**
 * Created by Administrator on 2016/12/14.
 */
const mysql=require('mysql');
var $config=require('../configs/config');

//方法一同步
/*module.exports=function(username,password,callback){
    var connection=mysql.createConnection($config);
    $query='select * from admin where user="'+username+'" and pwd="'+password+'"';
    connection.query($query,function(err,datas){
        callback(err,datas);
    })
    connection.end();
}*/

//方法二异步
module.exports = function (username, password,callback) {
    var pool = mysql.createPool($config);
    //var $query = 'select * from admin where user=\'' + username + '\' and pwd=\'' + password + '\'';
    var $query = "select * from admin where user='" + username + "'and pwd='" + password + "'";
    pool.getConnection(function (err, connection) {
        if (err) {
            return console.error(err)
        }
        //console.log($query);
        connection.query($query, function (err, result) {
            callback(err,result);
            //断开连接池
            connection.release();
        });
    });
};

