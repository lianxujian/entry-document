/**
 * Created by Administrator on 2016/12/17.
 */
const express=require('express');
const path=require('path');
const bodyParse=require('body-parser');
const ejs=require('ejs');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',ejs.__express);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParse.urlencoded({extended:false}));

var routes=require('./routes')(app);

app.listen(8080,function(){
    console.log('listen 8080...');
})