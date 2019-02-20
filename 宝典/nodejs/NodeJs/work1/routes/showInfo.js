/**
 * Created by Administrator on 2016/12/17.
 */
var router=require("express").Router();

router.get("/showInfo",function(req,res){
    res.render("showInfo",{
        data:''
    })
});
module.exports=router;