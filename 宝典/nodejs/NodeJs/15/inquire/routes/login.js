/**
 * Created by Administrator on 2016/12/17.
 */
const express=require('express');
var router=express.Router();
router.get('/login',function(req,res){
    res.render('login',{data:''});
})
module.exports=router;