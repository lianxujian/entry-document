/**
 * Created by Administrator on 2016/12/6.
 */

//作业 1
const child_process=require('child_process');
const fs=require('fs');
fs.exists('./b',function(exit){
    if(exit){
        child_process.exec('xcopy a b');
    }else{
        fs.mkdir('./b',function(err){
            if(err)return console.error(err);
            child_process.exec('xcopy a b');
        })
    }
})

//作业 2
child_process.spawn('node',['server.js']);