/**
 * Created by Administrator on 2016/12/13.
 */
var router=require("express").Router();
var query_login=require("../modules/query_login1");
router.post("/userlogin",function(req,res){
    var name=req.body.name;
    var password=req.body.pwd;
query_login(name,password,res);

})

module.exports=router;