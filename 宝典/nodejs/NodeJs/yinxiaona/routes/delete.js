/**
 * Created by Administrator on 2016/12/16.
 */
/**
 * Created by Administrator on 2016/12/16.
 */
var router=require("express").Router();
var mysql=require("mysql");
var client=require("../modules/query_info")(mysql);
router.get("/delete",function(req,res){
    var id=req.query.id;
        console.log(id)
    client.query("delete from user where uId=?",[id],function(err,data){
        if(err) return console.log(err);
        if(data.affectedRows){
            res.send("ok")
        }else{
         res.send("error");
        }
    })
})

module.exports=router;