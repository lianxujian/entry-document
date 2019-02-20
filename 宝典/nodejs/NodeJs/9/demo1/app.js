/**
 * Created by Administrator on 2016/12/9.
 */
var express=require("express");
var http=require('http');
var index=require('./routes/index');
//post方式;
var bodyparser=require('body-parser');

var app=express();
app.use(express.static('./public'));
app.use(bodyparser.urlencoded({extended:false}));

//页面显示字符串内容
app.get('/',function(req,res){
    res.send('hello world 234');
});

app.get('/abc/:name/:sex',function(req,res){
    console.log(req.params)
    res.send('姓名：'+req.params.name+';性别：'+req.params.sex);
});

app.get('/index',index);

//页面显示文件内容
app.get('/first',function(req,res){
    res.sendfile(__dirname+'/a.html');
})

//post方式
app.post('/dopost',function(req,res){
    res.send('hello'+req.body.username)
})

app.listen(8000,function(){
    console.log('listen 8000...')
})