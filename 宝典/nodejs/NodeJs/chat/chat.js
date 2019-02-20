/**
 * Created by Administrator on 2016/12/15.
 */
var express=require("express");
var http=require("http");
var io=require("socket.io");
var app=express();
app.use(express.static("./public"));
var server=http.createServer(app);
var io1=io.listen(server);
io1.on("connection",function(socket){
    var user='';
    socket.on("chat",function(data){
        if(user==''){
            socket.emit("res","欢迎"+data+"进入聊天室");
            socket.broadcast.emit("res","欢迎"+data+"进入聊天室");//向页面发送响应数据
            user=data;
        }else{
            socket.emit("res",user+"说"+data+"<br>");
            socket.broadcast.emit("res",user+"说"+data+"<br>");//向页面发送响应数据
        }

    })
})
    server.listen(8080,function(){
        console.log("this is the 8080 port");
    })