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
            res.redirect("list");//�����֤�ɹ���ת��listҳ��

        }else{
            res.redirect("login"); //��֤�ض���loginҳ��
        }

    })


})

module.exports = router;