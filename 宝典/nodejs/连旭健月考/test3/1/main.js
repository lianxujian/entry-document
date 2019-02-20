/**
 * Created by Administrator on 2016/12/19.
 */
const child_process=require('child_process');
var fork=child_process.fork;
var arr=['./mysql.js','./server.js'];

function protect_child(file){
    var child_fork=fork(file);
    child_fork.on('exit',function(code){
    	//“Ï≥£ÕÀ≥ˆ÷ÿ∆Ù
    	if(code==1){
    		child_fork.kill();
       		protect_child(file);
    	}
    })
}

for(var i=0;i<arr.length;i++){
    protect_child(arr[i]);
}