/**
 * Created by Administrator on 2016/12/16.
 */
var config=require("./config/config");

module.exports=function(username,pwd,mysql,callback){
    //$query='select * from user where userName="'+username+'" and uPwd="'+pwd+'"';
    var pool=mysql.createPool(config);
    pool.getConnection(function(err,connect){
        if(err)return console.log(err);
        connect.query('insert into user (userName,uPwd) values(?,?)',[username,pwd],function(err,data){
            if(err)return callback(err);
            callback(null,data);
        })
    })
}