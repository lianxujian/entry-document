var dopost=require('./dopost');

module.exports=function(app){

    app.get('/',function(req,res){
      res.send('index');
    })
    app.get('/dopost',dopost)
}
