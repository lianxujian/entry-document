/**
 * Created by Administrator on 2016/12/16.
 */
var mysql=require("mysql");
var client=require("../modules/query_info")(mysql);
var router=require("express").Router();
router.get("/showInfo",function(req,res){
   client.query("select * from user",function(err,data){
       if(err) return console.log(err);
       if(data.length){
           res.render("showInfo",{
               info:data
           })
       }
   })
})

module.exports=router;