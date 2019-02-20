/**
 * Created by Administrator on 2016/12/13.
 */
module.exports=function(mysql) {
    var client=mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '465619',
        database: '1501d'
    });
    client.connect();
    return client;
}


