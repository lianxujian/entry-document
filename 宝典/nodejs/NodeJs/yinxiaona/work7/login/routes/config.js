/**
 * Created by Administrator on 2016/12/13.
 */
var login=require("./login"),
    list=require("./list"),
    userlogin=require("./userlogin"),
    index=require("./index");

    module.exports=function(app){
        app.get("/",index);
        app.get("/login",login);
        app.get("/list",list);
        app.post("/userlogin",userlogin);
    }
