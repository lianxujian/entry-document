/**
 * Created by Administrator on 2016/12/16.
 */
var router=require("express").Router();
router.get("/register",function(req,res){
    res.render("register");
})

module.exports=router;