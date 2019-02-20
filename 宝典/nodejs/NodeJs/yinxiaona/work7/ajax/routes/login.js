/**
 * Created by Administrator on 2016/12/13.
 */
var router=require("express").Router();

router.get("/login",function(req,res){
    res.render("login");
})

module.exports=router;