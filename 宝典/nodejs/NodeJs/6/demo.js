/**
 * Created by Administrator on 2016/12/3.
 */
/*
const http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.end('hello world')
}).listen(3000)*/


const http=require('http');
const url=require('url');
const querystring=require('querystring');
/*http.createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    res.end('男');
    console.log(url.parse('http://www.baidu.com/?usename="lianxujian"'))
}).listen(2000);*/           //返回url对象   与url.format()相反

var obj={
    name:'zhangsan',
    age:18
    },
    str=querystring.stringify(obj);
console.log(querystring.parse(str));
