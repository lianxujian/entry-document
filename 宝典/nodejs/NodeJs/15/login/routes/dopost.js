/**
 * Created by Administrator on 2016/12/17.
 */
const express=require('express');
const mysql=require('../modules/mysql');

var router=express.Router();
router.post('/dopost',function(req,res){
    var user=req.body.user;
    var pwd=req.body.pwd;
    mysql(user,pwd,function(err,datas){
        if(err) return console.error(err);
        //console.log(datas[0].name)
        //console.log(datas.affectedRows)
        if(datas.length){
            res.render('index',{data:datas[0]});
            //res.send('aa');
        }else{
            req.flash('err','用户名或密码错误')
            res.redirect('/login');
        }
    })
})
module.exports=router;