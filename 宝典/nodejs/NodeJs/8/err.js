/**
 * Created by Administrator on 2016/12/7.
 */
console.log('before err');
function syncErr(){
    throw new Error('syncError');
}
function asyncErr(){
    setTimeout(function(){
        throw new Error('asyncError');
    },0)
}

try{
    syncErr();
    // asyncErr();
}catch(err){
    console.log('error:'+err)
}/*
//捕捉异步的两种方法
//（1）
asyncErr();
process.on('uncaughtException',function(err){
    console.log('error:'+err)
})*/

//（2）
const domain=require('domain');
var d=domain.create();
d.run(asyncErr);
d.on('error',function(err){
    console.log('err:'+err)
})
console.log('after err');