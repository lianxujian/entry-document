/**
 * Created by Administrator on 2016/12/14.
 */
var express = require('express');
var login=require('../modules/login');
var router = express.Router();
/* GET users listing. */
router.post('/dopost', function(req, res) {
    //res.send(req.body);
    var username=req.query.user,
        password=req.query.pwd;
    console.log(username+" "+password)
    login(username,password,function(err,datas){
        if(err)return console.error(err);
        if(datas.length){
            console.log('success');
            res.json('success');
        }else{
            console.log('error');
            res.json('error');
        }
    });
});

module.exports = router;