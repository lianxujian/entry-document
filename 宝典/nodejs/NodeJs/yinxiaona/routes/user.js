/**
 * Created by Administrator on 2016/12/16.
 */
/**
 * Created by Administrator on 2016/12/16.
 */
    var query=require("../modules/query");
    var mysql=require("mysql");
var router=require("express").Router();
router.post("/user",function(req,res){
    var name=req.body.name,
        pwd=req.body.pwd;
    query(name,pwd,mysql,function(err,data){
        if(err){
            return console.log(err);
        }
        if(data.affectedRows){
            var data={
                code:0,
                data:data[0]
            }

        }else{
            var data={
                code:1,
                errMsg:'error'
            }
        }
        res.json(data);
    })
})

module.exports=router;