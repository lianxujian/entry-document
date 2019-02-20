/**
 * Created by Administrator on 2016/12/13.
 */
var router=require("express").Router();

router.get("/list",function(req,res){
    res.render("list",{
        title:'index'
    });
});

module.exports=router;/**
 * Created by Administrator on 2016/12/13.
 */
