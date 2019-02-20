/**
 * Created by Administrator on 2016/12/12.
 */
const fs = require('fs');
const cluster = require('cluster');
const http = require('http');

/*
 if(cluster.isMaster){
 fs.readdir('./file',function(err,files){
 if(err)return console.error(err);
 var str='';
 files.forEach(function(file){
 fs.readFile('./file/'+file,function(err,data){
 if(err)return console.error(err);
 str+=data.toString();
 var child=cluster.fork();
 child.send(str);
 })
 })
 })
 }else{
 process.on('message',function(data){
 http.createServer(function(req,res){
 res.writeHead(200,{'content-type':'text/html;charset=utf8'});
 res.end(data);
 }).listen(3000,function(){
 console.log('listen 3000..')
 })
 })
 }*/
if (cluster.isMaster) {
    var child = cluster.fork();
    fs.readdir('./file', function (err, files) {
        if (err)return console.error(err);
        files.forEach(function (file) {
            fs.readFile('./file/' + file, function (err, data) {
                if (err)return console.error(err);
                child.send(data.toString());
            })
        })
    })
} else {
        var arr=[];
        (function(arr){
            process.on('message', function (data){
                arr[arr.length]=data;
            })
            console.log(arr)
           // return arr.toString();
        })(arr)

        http.createServer(function (req, res) {
           res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
           res.end(arr.toString());
       }).listen(3000, function () {
           console.log('listen 3000..')
       })
}
