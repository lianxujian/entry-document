/**
 * Created by Administrator on 2016/12/19.
 */
var cluster = require("cluster");
var child_process = require("child_process");
if (cluster.isMaster) {
	cluster.fork();
    cluster.on("exit",function () {
        cluster.fork();
        //console.log('aa')
    })
} else {
   // child_process.spawn("node", ["mysql.js"]);
   // child_process.spawn("node", ["server.js"]);
   require('./mysql');
   require('./server')
}