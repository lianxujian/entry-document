var users=require('./users');
var dopost=require('./dopost');

module.exports=function(app){
    app.get('/',function(req,res){
      res.send('index');
    })
    app.get('/user',users);
    app.post('/dopost',dopost)
}
