/**
 * Created by Administrator on 2017/6/2.
 */
import axios from 'axios';
export default{
  request (method, url, data, headerConfig = {withCredentials: true}) {
    if (!method) {
      console.error('requires method argument')
      return
    }
    if (!url) {
      console.error('requires uri argument')
      return
    }
    return axios({ method, url, data, ...headerConfig })
  },
  /**
   * 获取外勤 记账等等对应的对象数组
   * @param type 要获取的类型包括acc记账人员 leg外勤人员 biz
   * @param objArr一个对象数组
   * @returns {Array}
     */
  getAllocateArr(type,objArr){
    var temArr=[];
    objArr.forEach(function(el){
      if(el.roles.indexOf(type)>=0){
        temArr.push(el);
      }
    })
    return temArr;
  },

  formatDate(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
},
  formatDate2(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  return y +''+ m;
},
   addmulMonth(dtstr, n)
{
  var s = dtstr.split("-");
  var yy = parseInt(s[0]);
  var mm = parseInt(s[1])-1 ;
  var dd = parseInt(s[2]);
  var dt = new Date(yy, mm, dd);
  dt.setMonth(dt.getMonth() + n);
  var month = parseInt(dt.getMonth()) + 1;
  return dt.getFullYear() + "-" + month  + "-" + dd;
},
  swithPayType(type){
    switch (type){
      case'12M':{return '年结'};break;
      case'1T':{return '一次性结清'};break;
      case'1M':{return '月结'};break;
      case'3M':{return '三月结'};break;
      case'6M':{return '半年结'};break;
    }
  }

}
