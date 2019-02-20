/**
 * Created by Administrator on 2016/12/13.
 */
var userlogin=require("./userlogin");
var login=require("./login");
var index=require("./index");


module.exports=function(app){
    app.post("/userlogin",userlogin);
    app.get("/index",index);
    app.get("/login",login);
}



