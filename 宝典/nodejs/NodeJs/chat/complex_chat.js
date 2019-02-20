/**
 * Created by Administrator on 2016/12/16.
 */
var express=require("express");
var io=require("socket.io");
var http=require("http");
var io=require("socket.io");
var app=express();
var server=http.createServer(app);
var io1=io.listen(server);

app.use(express.static("./public"));

server.listen(9090,function(){
    console.log("this is the 9090 port");
})
var users=[];

io1.on("connection",function(socket){
    socket.on("login",function(user){
        if(users.indexOf(user)==-1){
            socket.userIndex=users.length;
            socket.userName=user;
            users.push(user);
            socket.emit("res","欢迎"+user);
            socket.emit("loginok");
            io1.emit("system",users.length);
        }else{
            socket.emit("exits","用户已经存在");
        }
    });

    socket.on("chat",function(data){
        socket.emit("res",socket.userName+"说:"+data);
        socket.broadcast.emit("res",socket.userName+"说:"+data);
    })

    socket.on("disconnect",function(){
        users.splice(socket.userIndex,1);
        io1.emit("system",users.length);
    })

})






