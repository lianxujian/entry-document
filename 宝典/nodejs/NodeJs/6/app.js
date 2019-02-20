/**
 * Created by Administrator on 2016/12/5.
 */
const fs=require('fs');
const  zlib=require('zlib');

//压缩文件
/*var gzip=zlib.createGzip();
var readStream=fs.createReadStream('./readme.txt');
var writeStream=fs.createWriteStream('./readme.txt.gz');
readStream.pipe(gzip).pipe(writeStream)*/

//解压文件
var gunzip=zlib.createGunzip();
var readtream=fs.createReadStream('./readme.txt.gz');
var writetream=fs.createWriteStream('./a/readme.txt');
readtream.pipe(gunzip).pipe(writetream)

//读取压缩文件
/*
fs.readFile('./readme.txt.gz',function(err,data){
    if(err)return console.error(err);
    zlib.gunzip(data, function (err,data) {
        console.log(data.toString())
    })
})*/

var input='23432423rsdkfhjsdk234';
zlib.deflate(input,function(err,buffer){
    if(!err){
        console.log(buffer.toString('base64'))
        zlib.inflate(buffer,function(err,buf){
            console.log(buf.toString())
        })
    }
})