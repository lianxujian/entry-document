/**
 * Created by Administrator on 2016/12/1.
 */
const fs=require('fs');
fs.readFile('a.js','utf8',function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

fs.exists('./b',function(exits){
    console.log(exits)
})              //判断文件或文件夹是否存在

/*
fs.writeFileSync('b.txt','嗯嗯嗯')         //修改
fs.writeFile('b.txt','耶耶耶');            //修改
fs.appendFileSync('b.txt','哦哦哦')*/      //追加

//console.log(fs.readFile('b.txt'))                   //有回调函数
//console.log(fs.readFileSync('b.txt'))               //无回调函数

//复制小文件
//fs.writeFileSync('bcopy.txt',fs.readFileSync('b.txt'));        //同步
/*fs.readFile('b.txt',function(err,data){                        //异步
   // console.log(data)
    fs.writeFile('bcopy.txt',data,'utf8',function(err){
        console.log(err)
    })
})*/

//创建目录
/*
fs.mkdir('./file',function(err){
    console.log("seccess create directory")
})*/

//fs.stat('演员.mp3',function(err,state){
//    console.log(state.size)
//})                //输出文件大小

//复制大文件
//var reader=fs.createReadStream('演员.mp3');
//var writer=fs.createWriteStream('演员2.mp3');
/*
//  1、
reader.on('data',function(chunk){
    //console.log(chunk.length)
    writer.write(chunk)
})
//  2、
reader.pipe(writer);
*/
