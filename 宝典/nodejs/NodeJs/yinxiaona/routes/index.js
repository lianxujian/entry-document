/**
 * Created by Administrator on 2016/12/16.
 */
var register=require("./register");
var user=require("./user");
var login=require("./login");
var show=require("./show");
var deleteInfo=require("./delete");
var showInfo=require("./showInfo");

module.exports=function(app){
    app.get("/register",register);
    app.get("/login",login);
    app.get("/showInfo",showInfo);
    app.get("/delete",deleteInfo);
    app.post("/user",user);
    app.post("/show",show);

}