/**
 * Created by Administrator on 2016/12/7.
 */
const os=require('os');
const cluster=require('cluster');
const child_process=require('child_process');
const util=require('util');
//console.log(os.cpus().length);

//主进程与子进程通讯
/*if(cluster.isMaster){           //isWorker
    console.log('is master');
    var worker=cluster.fork();
    //主进程给子进程发消息
    worker.send({name:'lianxujian'});
    worker.on('message',function(data){
        console.log(data.name);
    })
}else{
    var cmd=util.format('node','server');
    var childProcess=child_process.exec(cmd);
    childProcess.stdout.on('data',function(data){
        console.log(data);
    })
    process.on('message',function(data){
        console.log(data.name)
        process.send({name:'hello'})
    })
}*/

//守护子进程

if(cluster.isMaster){
    var n=1;
    cluster.fork();
    cluster.on('exit',function(){
        if(n>3)return;
        cluster.fork();
        n++;
    })
}else{
    var http=require('http');
    http.createServer(function(req,res){
        res.writeHead(200,{'content-type':'text/html;charset=utf8'});
        res.end('hello world');
    }).listen(3000,function(){
        console.log('listen 3000...')
    });
    aaa();
}
