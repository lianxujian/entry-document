/**
 * Created by Administrator on 2016/12/6.
 */

//使用xcopy终端命令来复制文件夹
//xcopy sourceDirectory targetDirectory

//process.title
//输入cmd终端的路径

//process.version   notejs版本号
   // console.log(process.version)

//console.log(process.argv)   //返回一个数组，可以往里面追加元素
//console.log(process.arch)     返回 x64

//引入子进程模块
var child_process=require('child_process');
//process.stdout.write()
//process.stderr 标准输出错误
//process.stderr.write()

//process.pid进程的id 每次创建一个进程id都是不固定的

//标准输入
/*process.stdin.on('data',function(data){
 console.log('this is stdin data:'+data)
 //process.emit('end');  //抛出end事件
 //杀死进程
 process.kill();
 })
 process.on('exit',function(){
    console.log('process is exit')
 })*/

//process.cwd()== __dirname

//exit(code)退出进程方法，默认为0;还可以传1.  0位正常退出，1为非正常退出

/*
process.stdin.on('data',function(data){
    console.log('this is stdin data:'+data)
    process.exit();
})
process.on('exit',function(code){
    if(code){
        console.log('has error');
        process.stderr.write('has error')
    }else{
        console.log('has no error');
        process.stderr.write('has no error')
    }
})*/

var util=require('util');
var cmd=util.format('node','server');
//通过exec创建一个子进程
//child_process.exec(cmd);
//通过spawn创建一个子进程
//child_process.spawn('node',['server.js']);
//child_process.exec('xcopy a b');

/*var path=require('path');
console.log(path.parse('C:\\Users\\Administrator\\Desktop\\1412B\\NodeJs2\\7\\a.txt'));*/
/*{ root:'C:\\',
    dir:'C:\\Users\\Administrator\\Desktop\\1412B\\NodeJs2\\7',
    base:'a.txt',
    ext:'.txt',
    name: 'a'
 }*/


