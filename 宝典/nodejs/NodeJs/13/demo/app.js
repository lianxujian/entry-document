const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const ejs=require('ejs');
//flash
const session=require('express-session');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',ejs.__express);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
//flash
app.use(cookieParser('error message'));
app.use(session({cookie:{maxAge:60000}}));
app.use(flash());
app.use('/user',function(req,res,next){
  res.locals.error=req.flash('err');
  next();
})

var routes=require('./routes')(app);
app.listen(3000,function(){
  console.log('listen 3000..');
})



