/**
 * Created by Administrator on 2016/12/17.
 */
const express=require('express');
const mysql=require('../modules/mysql');

var router=express.Router();
router.post('/dopost',function(req,res){
    var user=req.body.user;
    mysql(user,function(err,datas){
        if(err) return console.error(err);
        //console.log(datas[0].name)
        if(datas){
            res.render('index',{data:datas[0]});
        }
    })
})
module.exports=router;