/**
 * Created by Administrator on 2016/12/13.
 */
var express=require("express"),
        bodyParser=require("body-parser"),
        ejs=require("ejs"),
        path=require("path"),
       app=express();

//设置url的编码类型
app.use(bodyParser.urlencoded({extended:true}));
//设置模板引擎路径及后缀名
app.set(express.static("./public"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","html");
app.engine("html",ejs.__express);
var congif=require("./routes/config")(app); //调用配置文件



app.listen(7070,function(){
       console.log("this is the 7070 port");
})