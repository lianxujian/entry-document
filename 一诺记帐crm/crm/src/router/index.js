import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import customerLeftMenu from '../components/customer/customerLeftMenu.vue'
import header from '../components/pub/header.vue'
import myCustomer from '../components/customer/myCustomer.vue'
import customerDetails from '../components/customer/customerDetails.vue'

import userMgt from '../components/company/userMag.vue'
import userInfo from '../components/company/basicInfo.vue'
import smsTemplate from '../components/company/smsTemplate.vue'
import accountInformation from '../components/company/accountInformation.vue'

import loginView from '../components/login/loginView.vue'
import regView from '../components/login/regView.vue'

import inviteReq from '../components/systemMag/inviteReq.vue'
import rechargeManage from '../components/systemMag/rechargeManage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/loginView',
      component:loginView,
    },
    {
    	path:'/regView',
    	component:regView
    },
    {
    	path: '/customerLeftMenu',
      component: customerLeftMenu,
      name:'listMenu',
      children:[
        {
          //我的客户户列表
          path:'myCustomer',
          component:myCustomer
        },
        {
          //客户详情
          path:'cusDetaile/:id',
          component:customerDetails,
          name:'cusd'
        },
        //注册邀请
        {
          path:'inviteReq',
          component:inviteReq,
        },
        //用户管理
        {
          path:'userMag',
          component:userMgt
        },
        //基本信息
        {
          path:'basicInfo',
          component:userInfo
        },
        //手机充值
        {
          path:'rechargeManage',
          component:rechargeManage
        },
        //短信模版
        {
          path:'smsTemplate',
          component:smsTemplate
        },
        //账户信息
        {
          path:'accountInformation',
          component:accountInformation
        }
      ]
    },


    { path: '*', redirect: '/loginView' }
  ]
})
