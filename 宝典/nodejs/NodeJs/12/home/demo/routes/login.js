/**
 * Created by Administrator on 2016/12/13.
 */
var express=require('express');
var router = express.Router();

router.get('/login',function(req,res){
    res.render('user')
})
module.exports=router;