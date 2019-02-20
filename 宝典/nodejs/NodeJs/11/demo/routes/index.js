/**
 * Created by Administrator on 2016/12/12.
 */
var about=require('./about');
var home=require('./home');
var users=require('./users');

module.exports=function(app){
    app.get('/',about);
    app.get('/home',home);
    app.get('/users',/*function(req,res,next){
        console.log('中间件方式一');
        next();
    },*/users);
}