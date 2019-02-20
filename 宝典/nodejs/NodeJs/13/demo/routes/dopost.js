/**
 * Created by Administrator on 2016/12/14.
 */
var express = require('express');
var login = require('../modules/login');
var router = express.Router();
/* GET users listing. */
router.post('/dopost', function (req, res) {
    //res.send(req.body);
    var username = req.body.username,
        password = req.body.password;
    login(username, password, function (err, datas) {
        if (err)return console.error(err);
        if (datas.length) {
            res.send('success');
        } else {
            req.flash('err','你错了');
            res.redirect('/user');
        }
    });
});

module.exports = router;