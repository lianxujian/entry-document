/**
 * Created by Administrator on 2016/12/17.
 */
const mysql=require('mysql');
const $config=require('../configs/config');
module.exports=function(user,callback){
    var connection=mysql.createConnection($config);
    var $query='select * from user where name like"%'+user+'%"';
    connection.query($query,function(err,datas){
        callback(err,datas);
    })
    connection.end();
}