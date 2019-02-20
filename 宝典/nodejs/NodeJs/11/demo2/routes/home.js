/**
 * Created by Administrator on 2016/12/12.
 */
module.exports=function(req,res){
    /*console.log(req.query)
    console.log(req.body)*/
    var datas={
        name:'lianxujian',
        age:23,
        sex:"man",
        job:"15k"
    }
    res.render('index',{title:'index page',userInfo:datas});
}