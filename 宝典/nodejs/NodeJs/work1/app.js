/**
 * Created by Administrator on 2016/12/16.
 */

var express=require("express");
var path=require("path");
var ejs=require("ejs");
var bodyParser=require("body-parser");
var session=require("express-session");
var cookieParser=require("cookie-parser");
var flash=require("connect-flash");
var app=express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs.__express);
//post方式
app.use(bodyParser.urlencoded({extended:true}));


//flash
app.use(cookieParser('error message'));
app.use(session({cookie:{maxAge:60000}}));
app.use(flash());
app.use('/login',function(req,res,next){
    res.locals.error=req.flash('err');
    next();
});

var config=require("./routes")(app);


app.listen(8080,function(){
    console.log("this is the 8080 port");
})





