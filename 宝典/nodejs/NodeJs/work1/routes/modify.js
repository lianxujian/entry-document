/**
 * Created by Administrator on 2016/12/17.
 */
var router = require("express").Router(),
    mysql = require("mysql"),
    client = require("../modules/query")(mysql);

router.get("/modify", function (req, res) {
    var perId = req.query.perId;
    client.query("select * from users where uId=?", [perId], function (err, data) {
        if (err) return console.log(err);
        if (data.length) {
            res.render("modify", {
                info: data[0]
            });
        }

    })
});
module.exports = router;