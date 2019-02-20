/**
 * Created by Administrator on 2016/12/17.
 */
var router = require("express").Router();
var mysql = require("mysql");
var client = require("../modules/query")(mysql);
router.post("/change", function (req, res) {
    var name = req.body.name,
        pwd = req.body.pwd,
        sex = req.body.sex,
        age = req.body.age,
        address = req.body.address,
        perId = req.body.perId;

    //console.log(name + " " + pwd + "" + sex + "" + age + "" + address + "" + perId);
    client.query("update users set userName=?,uPwd=?,sex=?,age=?,address=? where uId=?", [name, pwd, sex, age, address, perId], function (err, data) {
        if(err) return console.log(err);
        if(data.affectedRows){
          res.send("ok");
        }else{
            console.log("faile");
        }
    })
});
module.exports = router;