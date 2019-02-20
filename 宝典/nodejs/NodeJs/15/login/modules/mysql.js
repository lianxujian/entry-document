/**
 * Created by Administrator on 2016/12/17.
 */
const mysql=require('mysql');
const $config=require('../configs/config');
module.exports=function(user,pwd,callback){
    var connection=mysql.createConnection($config);
    var $query='select * from users where userName="'+user+'" and uPwd="'+pwd+'"';
    //var $query='insert into users (userName,uPwd) values("'+user+'","'+pwd+'")';
    connection.query($query,function(err,datas){
        callback(err,datas);
    })
    connection.end();
}