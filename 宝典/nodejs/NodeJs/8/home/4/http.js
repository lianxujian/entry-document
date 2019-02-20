/**
 * Created by Administrator on 2016/12/8.
 */
const url=require('url');
const http=require('http');
const querystring=require('querystring');
http.createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    res.end('url and querystring practice')

    var obj=url.parse(req.url,true).query,
        pathname=url.parse(req.url).pathname;
    var str=querystring.stringify(obj);
    console.log(obj)
    console.log(pathname)
    console.log(str);
    console.log(querystring.parse(str));
}).listen(3000);