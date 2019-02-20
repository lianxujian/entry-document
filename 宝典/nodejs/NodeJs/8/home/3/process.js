/**
 * Created by Administrator on 2016/12/8.
 */
//标准输出
process.stdout.write('lianxujian\n');
//标准输入
process.stdin.on('data',function(data){
    console.log(data.toString())
    process.stdin.emit('end');
})
process.stdin.on('end',function(){
    process.stdout.write('process is exit');
})