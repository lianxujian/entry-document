/**
 * Created by Administrator on 2016/12/6.
 */
http=require('http');
url=require('url');
http.createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    res.end('hello world....');

    //http://localhost:3000/a.html?name=lianxujian&age=23
    //console.log(req.url)     /a.html?name=lianxujian&&age=23

    //console.log(url.parse(req.url))
    /*
     Url {
     protocol: null,
     slashes: null,
     auth: null,
     host: null,
     port: null,
     hostname: null,
     hash: null,
     search: '?name=lianxujian&age=23',
     query: 'name=lianxujian&age=23',
     pathname: '/a.html',
     path: '/a.html?name=lianxujian&age=23',
     href: '/a.html?name=lianxujian&age=23' }
     */

    //console.log(url.parse(req.url,true).query) //{ name: 'lianxujian', age: '23' }
    //url.format()与url.parse()相反

}).listen(3000, function () {
    console.log('listen 3000')
})

//const net=require('net');
//console.log(net.Socket())