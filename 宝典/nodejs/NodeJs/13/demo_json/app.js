const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const ejs=require('ejs');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',ejs.__express);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

var routes=require('./routes')(app);
app.listen(3000,function(){
  console.log('listen 3000..');
})



