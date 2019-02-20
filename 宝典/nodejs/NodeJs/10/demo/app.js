/**
 * Created by Administrator on 2016/12/10.
 */
const express=require('express');
const index=require('./routes/index');
const user=require('./routes/users');
const path=require('path');

var app=express();

app.set('views', path.join(__dirname, 'views'));

app.use('/',index);
app.get('/user',user);
app.listen(3000,function(){
    console.log('listen 3000')
});
