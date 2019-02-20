import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'	//必须下载到当前目录 --save-dev
import config from './router.config.js'
import VueResource from 'vue-resource'
//import axios from 'axios'

Vue.use(VueRouter);
Vue.use(VueResource);
var router=new VueRouter(config)
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
