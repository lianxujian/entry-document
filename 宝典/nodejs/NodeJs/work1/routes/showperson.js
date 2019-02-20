/**
 * Created by Administrator on 2016/12/17.
 */
var router=require("express").Router();
var mysql=require("mysql");
var client=require("../modules/query")(mysql);
router.get("/showperson",function(req,res){
    var perId=req.query.perId;
    client.query("select * from users where uId=?",[perId],function(err,data){
        if(err) return console.log(err);
        console.log(data);
        if(data.length){
            res.render("showperson",{
                data:data[0]
            })
        }
    })
})
module.exports=router;