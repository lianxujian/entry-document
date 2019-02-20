/**
 * Created by Administrator on 2016/12/13.
 */
const mysql=require('mysql');
var options={
    host:'127.0.1.1',
    user:'root',
    password:'root',
    database:'cms'
}
var connection=mysql.createConnection(options);

connection.connect();

connection.query('select * from admin',function(err,datas){
    if(err) throw err;
    if(datas.length){
        module.exports.userlogin=function(){
            return datas[0];
        };
    }else{
        module.exports.userlogin=function(){
            return {
                msg:'error'
            }
        };
    }
})

connection.end();