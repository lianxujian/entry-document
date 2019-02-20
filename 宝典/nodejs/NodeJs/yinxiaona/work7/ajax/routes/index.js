/**
 * Created by Administrator on 2016/12/13.
 */
/**
 * Created by Administrator on 2016/12/13.
 */
var router=require("express").Router();

router.get("/index",function(req,res){
    res.render("index");
})

module.exports=router;