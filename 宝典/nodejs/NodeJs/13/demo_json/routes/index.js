var dopost=require('./dopost');
var user=require('./user');

module.exports=function(app){

    app.get('/',function(req,res){
      res.send('index');
    })
    app.get('/user',user);
    app.get('/dopost',dopost)
}
