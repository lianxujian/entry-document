/**
 * Created by Administrator on 2016/12/17.
 */
const login=require('./login');
const dopost=require('./dopost');
module.exports=function(app){
    app.get('/login',login)
    app.post('/dopost',dopost)
}