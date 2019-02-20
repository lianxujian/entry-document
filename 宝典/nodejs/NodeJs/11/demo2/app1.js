/**
 * Created by Administrator on 2016/12/12.
 */
const express=require('express');
const path=require('path');
const ejs=require('ejs');
var app=express();

app.use(express.static(path.join(__dirname,'public')));

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//渲染引擎，view engine默认的视图(view)引擎的名字，不包含扩展名；
//app.engine('html',ejs.__express);

app.use('/users',function(req,res,next){
    console.log('中间件方法二');
    next();
})          //必须放到路由的上边

app.all('*',function(req,res,next){
    console.log('匹配全部');
    next();
})

var routes=require('./routes')(app);

app.listen(3000,function(){
    console.log('listen 3000...')
})