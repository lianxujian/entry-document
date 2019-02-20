const fs=require('fs');
const path=require('path');

//读取目录
fs.readdir('./a',function(err,files){
    if(err)return console.error(err);
    //console.log(files)
    //for循环遍历每个files;
    files.forEach(function(file){
        //转化为此文件里能读取到的路径
        var pathA=path.join('./a',file)
        var pathB=path.join('./b',file);
        fs.stat(pathA,function(err,state){
            if(err)return console.error(err);
            //获取每个文件的大小
            var size=(state.size)/(1024*1024);
            if(size>1){
                //复制大文件
                var reader=fs.createReadStream(pathA);
                var writer=fs.createWriteStream(pathB);
                reader.pipe(writer);
            }else{
                //复制小文件
                fs.readFile(pathA,function(err,data){
                    if(err)return console.error(err);
                    fs.writeFile(pathB,data)
                })
            }
        })
    })
})