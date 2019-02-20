/**
 * Created by Administrator on 2016/12/8.
 */
const cluster=require('cluster');

if(cluster.isMaster){
    cluster.fork();
    var a=0;
    cluster.on('exit',function(){
        if(a>2)return;
        cluster.fork();
        a++;
    })
}else{
    aa();
}