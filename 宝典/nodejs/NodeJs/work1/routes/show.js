/**
 * Created by Administrator on 2016/12/17.
 */
var router=require("express").Router();
var mysql=require("mysql");
var client=require("../modules/query")(mysql);

router.post("/show",function(req,res){
    var name=req.body.user,
        pwd=req.body.pwd;
    console.log(name+""+pwd);
    client.query("select * from users where userName=? and uPwd=?",[name,pwd],function(err,data){
        if(err) return console.log(err);
        if(data.length){
           res.render("showInfo",{
               data:data[0]
           })
        }else{
            req.flash("err","用户名或者密码错误");
            res.redirect("/login");
        }
    })

});
module.exports=router;