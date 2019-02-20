/**
 * Created by Administrator on 2016/12/19.
 */
var http=require("http");
http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"})
    res.end("hello world");
}).listen(8088,function(){
    console.log("listen 8088 is success");
})