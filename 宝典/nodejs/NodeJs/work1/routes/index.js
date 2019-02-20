/**
 * Created by Administrator on 2016/12/16.
 */

var login=require("./login");
var show=require("./show");
var showperson=require("./showperson");
var modify=require("./modify");
var change=require("./change");
var user=require("./user");
var register=require("./register");
var showInfo=require("./showInfo");
module.exports=function(app){
   app.get("/login",login);
   app.get("/showInfo",showInfo);
   app.get("/modify",modify);
   app.get("/register",register);
   app.post("/show",show);
   app.post("/user",user);
   app.get("/showperson",showperson);
   app.post("/change",change);

}