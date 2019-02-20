/**
 * Created by Administrator on 2016/12/2.
 */
const fs=require('fs');
//创建目录
/*fs.exists('./file',function(flag){
    if(flag) return console.log('dir is exists');
    fs.mkdir('./file',function(err){
        if(err)return console.error(err);
    })
})*/
const path=require('path');
//console.log(__dirname);
//输出一个绝对路径  从哪儿到哪儿
var resolvepath=path.resolve(__dirname,'../demo');

//获取路径 文件 的后缀名
var extname=path.extname('file.js')         //.js

//获取路径 文件 后缀名前面的
var basename=path.basename('C:\\Users\\Administrator\\Desktop\\1412B\\NodeJs2\\5\\file.js','.js')
//console.log(basename)       //file

//  \
var str='foo\\bar\\baz';
//console.log(str.split(path.sep));

//返回当前文件的路径 || 返回一个路径的文件名
var dirname=path.dirname('C:\\Users\\Administrator\\Desktop\\1412B\\NodeJs2\\5\\file.js');
//console.log(dirname)    //C:\Users\Administrator\Desktop\1412B\NodeJs2\5

//将一个字符串路径转化成标准路径
var normalize=path.normalize('C:\\Users\\Administrator'+'/'+'Desktop\\1412B\\NodeJs2\\5\\file.js')
//console.log(normalize)

//返回拼接字符的一个标准路径
var joinpath=path.join(__dirname,'file.js');
//console.log(joinpath)

//fs.stat('file',function(err,stats){
//    if(err) return console.error(err)
//    console.log(stats.isDirectory())
//    console.log(stats.isFile())
//})

var sourceFire='file';
fs.readdir(sourceFire,function(err,files){
    if(err) return console.error(err);

    files.forEach(function(file){
        var filepath=path.join(sourceFire,file);
        fs.stat(filepath,function(err,stats){
            if(err) return console.error(err)
            if(stats.isDirectory()){
                console.log(filepath+' is directory')
            }else{
                console.log(filepath+' is file')
            }
        })
    })

    /*(function getFileSates(i,length){
        if(i<length){
            var filepath=path.join(sourceFire,files[i]);
            fs.stat(filepath,function(err,stats){
                if(err) return console.error(err)
                if(stats.isDirectory()){
                    console.log(filepath+' is directory')
                }else{
                    console.log(filepath+' is file')
                }
            })
            getFileSates(++i,length)
        }
    })(0,files.length)*/
})