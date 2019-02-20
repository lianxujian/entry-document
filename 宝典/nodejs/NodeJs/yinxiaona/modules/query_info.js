/**
 * Created by Administrator on 2016/12/16.
 */
var config=require("./config/config");
module.exports=function(mysql){
    var client=mysql.createConnection(config);
    client.connect();
    return client;
}