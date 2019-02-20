/**
 * Created by Administrator on 2016/12/13.
 */
var express = require("express");
var mysql=require("mysql");
var router = express.Router();
var client = require("../modules/login_query")(mysql);
router.post("/userlogin", function (req, res) {
    client.query("select userName,uPwd from user where userName=? and uPwd=?", [req.body.username, req.body.password],function(err,result){
        if(result.length){
            res.redirect("list");//如果验证成功跳转到list页面

        }else{
            res.redirect("login"); //验证重定向到login页面
        }

    })


})

module.exports = router;