<template>
  <div>
    <v-header></v-header>
    <div style="display: flex;min-height: 833px">
      <el-menu :default-active="dActive" theme="dark" style="width:232px;min-height: 833px;">
        <el-submenu index="1" v-show="ususlPermission">
        <!--<el-submenu index="1" v-show="isNotAdmin">-->
          <template slot="title">客户管理</template>
          <router-link to='/customerLeftMenu/myCustomer'><el-menu-item index="1-1">我的客户</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="2" v-show="managePermission">
          <template slot="title">单位管理</template>
          <router-link to='/customerLeftMenu/basicInfo'><el-menu-item index="2-1">单位信息</el-menu-item></router-link>
          <router-link to='/customerLeftMenu/userMag'><el-menu-item index="2-2">用户管理</el-menu-item></router-link>
          <router-link to='/customerLeftMenu/accountInformation'><el-menu-item index="2-3">账户信息</el-menu-item></router-link>
          <router-link to='/customerLeftMenu/smsTemplate' v-show="false"><el-menu-item index="2-4">短信模版</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="3" v-show="adminPermission">
          <template slot="title">系统管理</template>
          <router-link to='/customerLeftMenu/inviteReq'><el-menu-item index="3-1">注册邀请</el-menu-item></router-link>
          <router-link to='/customerLeftMenu/rechargeManage'><el-menu-item index="3-2">充值管理</el-menu-item></router-link>
        </el-submenu>

      </el-menu>

      <div id="content">
        <!--子路由对应的模板要显示的区域 并为leftmenu下的子模板传参-->
        <router-view :typeArrObj="typeArrObj" :propuser="userRealname"></router-view>
        <!--:allocateArrObj="allocateArrObj"-->
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import header from '../pub/header.vue';
  import footer from '../pub/footer.vue';
  import htt from '../../config/util.js';
  export default {
    data(){
      return {
        typeArrObj:{},
        allocateArrObj:[],
        role:'',
        userRealname:'',
        dActive:''
      }
    },
    props: {},
    components: {
      'v-header': header,
      'v-footer': footer
    },
    computed:{
     managePermission: function () {
          if(this.role.indexOf('admin')!=-1){return true;}
        else {return false;}
      },
      ususlPermission: function () {
          if(this.role.indexOf('admin')!=-1||this.role.indexOf('biz')!=-1||this.role.indexOf('acc')!=-1||this.role.indexOf('leg')!=-1){return true;}
        else {return false;}
      },
      adminPermission: function () {
        if(this.role.indexOf('superAdmin')!=-1){return true;}
        else {return false;}
      }
    },
    created(){
      var _tempPer=sessionStorage.getItem('userInfo');
      if(_tempPer){
        if(!JSON.parse(_tempPer).realName){
          this.role=['superAdmin'];
        }else{
          this.role=JSON.parse(_tempPer).roles;
          this.userRealname=JSON.parse(_tempPer).realName;
        }

      }
    },
    mounted(){
      if(sessionStorage.getItem('userInfo')){
        if(JSON.parse(sessionStorage.getItem('userInfo')).realName){
          var _this=this;
          setTimeout(function(){
            _this.$router.push({path: '/customerLeftMenu/myCustomer'})
          },100)
          this.dActive='1-1';
        }else{
            var _this=this;
          setTimeout(function(){
            _this.$router.push({path: '/customerLeftMenu/inviteReq'});
          },100)
          this.dActive='3-1';
        }
      }
      var self = this;
      var instance = this.$axios.create();
      instance.get(process.env.API_HOST+'meta/v1')
        .then(function (response) {
          response = response.data;
          if (response.success == true) {
            self.typeArrObj = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
</script>
<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  #title {
    font-size: 20px;
    border-bottom: 1px solid #ccc;
    width: 70%;
    margin-left: 30px;
    padding: 20px 0 20px 0;
  }

  .menu-item {
    margin-left: 0px !important;
    font-size: 17px !important;
  }

  #content {
    width: 80%;
    padding: 1.5% 4%;
    padding-bottom: 150px;
  }

</style>
