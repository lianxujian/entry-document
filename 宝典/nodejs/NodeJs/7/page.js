const http=require("http");
const url=require("url");
const fs=require("fs");
const path=require("path");
const querystring=require("querystring");

var server=http.createServer(function(req,res){
	var pathname;
	var param=url.parse(req.url,true).query;
	var pathname1=url.parse(req.url,true).pathname;

	if(pathname1=="/stu"){				//get提交
		res.writeHead(200,{"content-type":"text/html;charset='utf-8'"});
		res.write("现在是第"+param.no+"页")
	}else if(pathname1=="/dopost"){ 	//post提交
		var str="";
		req.on("data",function(chunk){
			str+=chunk;
			//console.log(chunk.toString())
		})
		req.on("end",function(){
			var obj=querystring.parse(str); //转为对象
			res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
			res.write("您好"+obj.username+"您的邮箱地址是"+obj.email);
		})

	}else{
		if(req.url=="/"){
			pathname="./public/a.html";
		}else{
			pathname=path.join("./public",req.url);
		}
		var extname=path.extname(pathname);
		fs.readFile(pathname,function(err,data){
			if(err){
				console.log(err)
			}else{
				var mine=getMine(extname);
				res.writeHead(200,{"content-type":mine});
				res.write(data);
			}
		})
	}
})

server.listen(3000);
console.log("listen 3000...")
function getMine(name){
	switch(name){
		case ".html":
		return "text/html;charset='utf-8'";
		break;
		case ".jpg":
		return "image/jpg";
		break;
		case ".png":
		return "image/png";
		break;
	}	
}