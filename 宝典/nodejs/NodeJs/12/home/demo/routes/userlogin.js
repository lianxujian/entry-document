/**
 * Created by Administrator on 2016/12/13.
 */
var express=require('express');
var user=require('./user');
var router = express.Router();

router.post('/userlogin',function(req,res){
    console.log(req.body)
    console.log(user.userlogin().user)
    console.log(user.userlogin().pwd)
    if(req.body.username==user.userlogin().user&&req.body.password==user.userlogin().pwd){
        res.end('login seccess');
    }else{
        res.end('login error');
    }
    //res.json({name:'lianxujian',password:'123'});
    //res.end("{name:'lianxujian',password:'123'}");
})
module.exports=router;