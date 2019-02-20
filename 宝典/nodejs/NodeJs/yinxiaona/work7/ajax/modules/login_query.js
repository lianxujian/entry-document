/**
 * Created by Administrator on 2016/12/13.
 */
var mysql=require("mysql");

var connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'465619',
    database:'1501d'
});
queryString='select * from user';
connection.query(queryString,function(err,data){
    if(err) return console.log(err);
    if(data.length){
    module.exports.info=function(){
        return {code:1,data:data[0]};
    }
    }else{
        module.exports.info=function(){
            return {code:0}
        }
    }
})

