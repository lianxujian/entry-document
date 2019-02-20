/**
 * Created by Administrator on 2016/11/29.
 */
function Myfruit(name,fruit){
    this.name=name;
    this.fruit=fruit;
}
Myfruit.prototype.info=function(){
    console.log("我是"+this.name+",我爱吃"+this.fruit+"水果.")
}
module.exports=Myfruit;