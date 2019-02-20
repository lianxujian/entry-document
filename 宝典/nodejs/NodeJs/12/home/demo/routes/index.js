
var login=require('./login');
var userlogin=require('./userlogin');

module.exports=function(app){
    app.get('/',function(req,res){
        res.end('this is index file');
    })
    app.get('/login',login);

    app.post('/userlogin',userlogin)
}
