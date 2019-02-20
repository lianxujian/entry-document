/**
 * Created by Administrator on 2016/12/13.
 */
var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");
var ejs=require("ejs");
var app=express();


//����ģ��Ŀ¼��ģ�������׺��
app.set("views",path.join(__dirname,"views"));
app.use(express.static("./public"));
app.set("view engine","html");
app.engine("html",ejs.__express);
//����url��������
app.use(bodyParser.urlencoded({extended:false}));

var config=require("./routes/config")(app);

app.listen(6060,function(){
    console.log("this is the 6060 port");
})