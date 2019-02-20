<template>
  <div>
    <v-header></v-header>
    <div id="header">
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="grid-content login-header-left"><span>登录</span></div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="grid-content"></div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="grid-content"></div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="grid-content login-header-right">
  				<span>没有账号，<router-link to="/regView">
    					<span>单位注册</span>
    				</router-link></span></div>
        </el-col>
      </el-row>
      <div class="hr"></div>
      <div id="main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules2">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" @keyup.enter.native="onSubmit('form')"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" @keyup.enter.native="onSubmit('form')"></el-input>
          </el-form-item>
          <!--<el-form-item>
            <el-input id="checkCode" v-model="form.checkCode" placeholder="验证码"></el-input>
            <el-button id="getCheckCode" type="primary" @click="getCheckCode" ref="lalala">图片验证码</el-button>
          </el-form-item>-->
          <p class="is-exist-login" v-show="isShowLogin">用户名或密码错误</p>
          <el-form-item>
            <el-button id="loginBtn" type="primary" @click="onSubmit('form')">登录</el-button>
          </el-form-item>
        </el-form>
        <div id="forgetPwd">
          <a href="#">忘记密码？</a>
          <p>管理员可以通过手机找回密码</p>
          <p>普通用户需要管理员进行密码重设</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import header from '../pub/header.vue';
  export default {
    components: {
      'v-header': header,
    },
    name: 'app',
    data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
          if (!(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/.test(value))) {
            callback(new Error("用户名格式不正确"));
          } else {
            callback();
          }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
          if (!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/.test(value))) {
            callback(new Error("输入8到16位两种以上字符"));
          } else {
            callback();
          }
      }
      return {
        form: {
          userName: "",
          password: ""
        },
        rules2: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          userName: [
            {validator: checkUser, trigger: 'blur'}
          ]
        },
        isShowLogin:false
      }
    },
    mounted(){
        //console.log(process.env.API_HOST)
      if (sessionStorage.getItem('token')) {
        //alert("登陆成功！");
        this.$router.push({name: 'listMenu'})
      }
    },
    methods: {
      onSubmit(formName) {
          //alert(1)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var self = this;
            var get_token = 'application/json';
            var instance = this.$axios.create({
              headers: {'Content-Type': get_token}
            });
            /*if(process.env.NODE_ENV=='production'){
             window._url='http://47.92.107.107:3002/'
             }else{
             window._url='/api/'
             }*/
            instance.post(process.env.API_HOST+'user/login', this.form)
              .then(function (response) {
                //console.log(771);
                if (response.data.message != "") {
                  self.isShowLogin=true;
                } else {
                  self.isShowLogin=false;
                  sessionStorage.setItem('token', response.data.data.token);
                  sessionStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
                  if (sessionStorage.getItem('token')) {
                    self.$router.push({name: 'listMenu'})
                  }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCheckCode() {
        //console.log(event.currentTarget);
        //console.log(event.target.innerHTML);
        //console.log(this.$refs.lalala);
      }
    }
  }
</script>

<style>
  #header {
    width: 960px;
    border: 1px solid black;
    padding: 10px;
    margin: 0 auto;
    margin-top: 30px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .hr{
    border-bottom:1px solid #ccc;
  }
  .el-form{
    margin-left:-20px;
  }
  .is-exist-login{
    margin-top: -10px;
    margin-left: 80px;
    margin-bottom: 10px;
    color: #ff4949;
    font-size: 12px;
  }
  .login-header-left span {
    margin-left: 10px;
    font-size: 20px;
  }

  .login-header-right span {
    float: right;
    margin-right: 10px;
  }

  .login-header-right span a {
    text-decoration: none;
    color: blue;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  #main {
    width: 320px;
    margin: 0 auto;
    margin-top: 30px;
  }

  #pwd {
    margin: 20px 0 20px 0;
  }

  #username input {
    margin-left: 20px;
  }

  #pwd input {
    margin-left: 35px;
  }

  #checkCode {
    width: 130px;
  }

  #getCheckCode {
    background-color: gainsboro;
    color: black;
    border: none;
    overflow: hidden;
    position: relative;
  }

  #loginBtn {
    width: 240px;
  }

  #forgetPwd {
    margin-left: 60px;
  }

  #forgetPwd p {
    font-size: 12px;
    color: darkgray;
  }
</style>

