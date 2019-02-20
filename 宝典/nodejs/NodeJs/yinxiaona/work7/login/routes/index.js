/**
 * Created by Administrator on 2016/12/13.
 */
var router=require("express").Router();

router.get("/",function(req,res){
    res.render("index",{
        title:'index'
    });
});

module.exports=router;