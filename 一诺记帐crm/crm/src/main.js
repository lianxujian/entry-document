// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios';
import "babel-polyfill";
Vue.prototype.$axios=axios;
Vue.config.productionTip = false
Vue.use(ElementUI)

import routes from './router'
new Vue({
  el: '#app',
  router:routes,
  template: '<App/>',
  components: { App }
})
