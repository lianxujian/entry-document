/**
 * Created by Administrator on 2016/12/16.
 */
var router=require("express").Router();
var mysql=require("mysql");
var client=require("../modules/query_info")(mysql);
router.post("/show",function(req,res){
    var name=req.body.user,
        pwd=req.body.pwd;
    console.log(typeof name);
    console.log(typeof pwd);
    var $query='select userName,uPwd from user where userName="'+name+'"and uPwd="'+pwd+'"';
    client.query($query,function(err,data){
            if(err) return console.log(err);
        console.log(data);
        if(data.length){
            res.redirect("/showInfo");
        }else{
            req.flash("err",'用户名或者错了');
         res.redirect("/login");
        }
    })
})

module.exports=router;