var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('about');
});

module.exports = router;

//方法2
//抛出一个方法，让express实例化后的对象app去匹配
/*module.exports=function(req,res){
  res.send('this is about');
}*/
