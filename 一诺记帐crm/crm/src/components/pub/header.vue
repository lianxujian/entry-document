<template>
  <div>
    <div class="header">
      <div class="left">
        <div class="logo" style="width: 80px;height: 20px;float:left;display:inline-block;"><img src="../../img/logo.png" style="width:80%;float:right;margin-top:-15px;" alt=""></div>
        <h2 style="font-family:Microsoft JhengHei Light;">一诺记账</h2>
      </div>
      <div class="right">
        <div class="left-item">
          <!--to="/customerLeftMenu/myCustomer"-->
          <router-link @click.native="goCus" to="/"><p class="w-desk"><img src="../../img/w-desk.png" alt=""></p></router-link>
          <!--[if IE]><router-link @click.native="goCus" to="/"><p class="w-desk">222</p></router-link><![endif]-->
        </div>
        <div class="right-item">
          <el-dropdown trigger="click" >
          <span class="el-dropdown-link" style="color:#fff;">
              <img style="width:40px;height:40px;margin-bottom:-13px;" src="../../img/user.png" alt=""><span style="margin-left:10px;font-family: Microsoft JhengHei Light;font-size:18px;">{{username}}</span>
          </span>
            <el-dropdown-menu slot="dropdown" v-if="aa">
              <div @click="quik">
                <el-dropdown-item>退出</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../font/iconfont.css';
  export default {
    data() {
      return {
        username: '未登录',
        aa:false
      };
    },
    props: {
      propuser: String
    },
    methods: {
      goCus(){
        if(sessionStorage.getItem('token')){
          this.$router.push({path:'/customerLeftMenu/myCustomer'});
        }
      },
        quik(){
          this.username = '未登录';
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userInfo');
          this.$router.push({path: '/loginView'})
      }
    },
    created() {
        if(sessionStorage.getItem('userInfo')){
            if(JSON.parse(sessionStorage.getItem('userInfo')).realName){
              this.username=JSON.parse(sessionStorage.getItem('userInfo')).realName;
            }else{
              this.username =JSON.parse(sessionStorage.getItem('userInfo'));
            }
        }
      if(sessionStorage.getItem('token')){
        this.aa=true;
      }else {
        this.aa=false;
      }
    }
  };
</script>
<style>
.w-desk{
    width: 28px;
    height: 28px;
    margin-left: 20px;
    margin-top:5px;
  }
  .w-desk img{
    width:100%;
    height:100%;
  }
  .header {
    height: 60px;
    background: #2F3847;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }

  .header a {
    color: #fff;
    text-decoration: none;
  }

  .left {
    padding-left: 40px;
    color: #fff;
    flex: 0 0 190px;
    width: 100px;
    border-right: 1px solid #fff;
  }

  .right {
    color: #fff;
    flex: 1;
    padding-left: 10px;
    font-weight: bold;
  }

  .left-item {
    float: left;
    position:relative;
  }

  .right-item {
    float: right;
    margin-right: 30px;
  }
@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none) {
  .w-desk{
    margin-left:60px;
  }
  .left {
    padding-left: 110px;
    padding-right:10px;
  }
  .right{
    margin-top:-40px;
  }
  .logo img{
     margin-top: 0px !important; margin-left: -60px !important; float: left !important;
  }
  .left h2{
    margin-bottom:5px;
  }
}
</style>
