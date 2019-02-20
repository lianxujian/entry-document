/**
 * Created by Administrator on 2016/12/8.
 */
const fs=require('fs');
const path=require('path');
var arr=['a','b'];

for(var i=0;i<arr.length;i++){
    (function(i){
        setTimeout(function(){
            fs.readdir(arr[i],function(err,files){
                files.forEach(function(file){
                    var pathname=path.join(arr[i],file);
                    fs.stat(pathname,function(err,state){
                        if(state.isFile()){
                            fs.readFile(pathname,function(err,data){
                                console.log(data.toString())
                            })
                        }
                    })
                })
            })
        })
    })(i)

}