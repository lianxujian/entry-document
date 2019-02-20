/**
 * Created by Administrator on 2016/12/19.
 */
//const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'cmsm_1501d'
})
connection.query('select * from user',function(err,datas){
    if(err) return console.error(err);
    console.log(datas);

    //从数据库拿到数据后不让此进程退出
    /*process.stdin.on('data',function(data){
        console.log(data)
    })*/

})
connection.end();