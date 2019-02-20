/**
 * Created by Administrator on 2016/12/13.
 */
var express=require("express"),
        bodyParser=require("body-parser"),
        ejs=require("ejs"),
        path=require("path"),
       app=express();

//����url�ı�������
app.use(bodyParser.urlencoded({extended:true}));
//����ģ������·������׺��
app.set(express.static("./public"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","html");
app.engine("html",ejs.__express);
var congif=require("./routes/config")(app); //���������ļ�



app.listen(7070,function(){
       console.log("this is the 7070 port");
})