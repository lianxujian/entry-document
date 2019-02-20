
var mysql=require("mysql");
var option={
    host:'127.0.0.1',
    user:'root',
    password:'465619',
    database:'1501d'
}
var pool=mysql.createPool(option);

    module.exports=function(uName,uPwd,res){
        var $query='select * from user where userName="'+uName+'" and uPwd="'+uPwd+'"';
        pool.getConnection(function(err,connection){
            if(err) return console.log(err);
            connection.query($query,function(err,data){
                if(err) return console.log(err);
                if(data.length){
                    var data = {code: '0', data: data[0]};
                    //res.redirect("index");
                    res.json(data);
                }else{
                    var data = {code: '1', msg: 'error'};
                    res.json(data);

                }
            })
            connection.release();
        })
    }