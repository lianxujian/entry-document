/**
 * Created by Administrator on 2016/12/14.
 */
const express=require('express');
var router=express.Router();

router.post('/user',function(req,res){
    res.render('user');
})
module.exports=router;