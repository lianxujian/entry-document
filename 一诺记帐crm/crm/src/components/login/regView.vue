<template>
	<div>
    <v-header></v-header>
		<div id="header">
  		<el-row :gutter="10">
  			<el-col :xs="6" :sm="6" :md="6" :lg="6"><div class="grid-content login-header-left"><span>注册</span></div></el-col>
  			<el-col :xs="6" :sm="6" :md="6" :lg="6"><div class="grid-content"></div></el-col>
  			<el-col :xs="6" :sm="6" :md="6" :lg="6"><div class="grid-content"></div></el-col>
  			<el-col :xs="6" :sm="6" :md="6" :lg="6"><div class="grid-content login-header-right">
  				<span>已注册，<router-link to="/loginView">
    					<span>立即登录</span>
    				</router-link></span></div>
  			</el-col>
			</el-row>
			<div class="hr"></div>
			<div id="main">
				<el-form ref="form" :model="form" label-width="80px">
				  <el-form-item label="邀请手机号" prop="invite.phone" :rules="{ validator:checkPhone,trigger: 'blur'}">
    				<el-input v-model="form.invite.phone" auto-complete="off"></el-input>
  				</el-form-item>
  				<el-form-item label="邀请码" prop="invite.inviteCode" :rules="{ validator:checkInvitecode,trigger: 'blur'}">
    				<el-input v-model="form.invite.inviteCode"></el-input>
  				</el-form-item>
  				<el-form-item prop="invite.validateCode">
    				<el-input id="checkCode" v-model="form.invite.validateCode" placeholder="验证码"></el-input>
    				<el-button id="getCheckCode" style="width:auto;" type="primary" @click="getCheckCode" :disabled="isClick">{{getCode}}</el-button>
  				</el-form-item>
          <p class="is-exist-conform" v-show="isShowPhone">手机验证码错误</p>
          <p class="is-exist-conform" v-show="inviteError">{{inviteMessage}}</p>
  				<div style="margin: 10px 0px 20px 0px;">
  					<hr style="width: 240px;margin-left: 80px;" />
  					<p style="margin-top: -15px;margin-left: 160px;background-color: white;width: 80px;">管理员信息</p>
  				</div>
  				<el-form-item label="用户名" prop="admin.userName" :rules="{ validator:checkUser,trigger: 'blur'}">
    				<el-input v-model="form.admin.userName"></el-input>
  				</el-form-item>
  				<el-form-item label="密码" prop="admin.password" :rules="{ validator:validatePass,trigger: 'blur'}">
    				<el-input type="password" v-model="form.admin.password"></el-input>
  				</el-form-item>
  				<el-form-item label="姓名" prop="admin.realName" :rules="{ validator:checkName,trigger: 'blur'}">
    				<el-input v-model="form.admin.realName"></el-input>
  				</el-form-item>
  				<el-form-item label="手机号码" prop="admin.phone" :rules="{ validator:checkPhone,trigger: 'blur'}">
    				<el-input v-model="form.admin.phone"></el-input>
  				</el-form-item>
          <p class="is-exist" v-show="isShow">用户名或手机号码已存在</p>
          <p class="is-exist" v-show="phoneOrInvite">手机号码或邀请码错误</p>
				<el-form-item>
    					<el-button id="regBtn" type="primary" @click="onSubmit('form')">提交</el-button>
  				</el-form-item>
				</el-form>
			</div>
  	</div>

		<!--<router-link to="/regView">
    		<div>注册</div>
    	</router-link>-->
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
      return {
				form: {
          "invite":{
            "phone":"",
            "inviteCode":"",
            "validateCode":""
          },
          "admin":{
            "userName":"",
            "password":"",
            "realName":"",
            "phone":"",
            "roles":"",
            "email":"",
            "title":""
          }
        },
				value: '',
        isShow:false,
        isShowPhone:false,
        getCode:"获取验证码",
        isClick:false,
        inviteError:false,
        phoneOrInvite:false,
        inviteMessage:''
			}
		},
    mounted(){
      if (sessionStorage.getItem('token')) {
        //alert("登陆成功！");
        this.$router.push({name: 'listMenu'})
      }
    },
		methods: {
      checkPhone(rule, value, callback) {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
          if(!(/^1[34578][0-9]{9}$/.test(value))){
            callback(new Error("手机号码格式不正确"));
          }else{
            callback();
          }
      },
      checkUser(rule, value, callback){
        //console.log(value)
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
          if(!(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/.test(value))){
            callback(new Error("用户名格式为以字母开头的4位以上有效字符"));
          }else{
            callback();
          }
      },
      validatePass(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        }
          if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/.test(value))){
            callback(new Error("输入8到16位两种以上字符"));
          }else{
            callback();
          }
      },
      checkName(rule, value, callback){
        if (!value) {
          return callback(new Error('名字不能为空'));
        }
          if(!(/^[\u4E00-\u9FA5]{2,4}$/.test(value))){
            callback(new Error("请输入2至4位汉字"));
          }else{
            callback();
          }
      },
      checkInvitecode(rule, value, callback){
    if (!value) {
      return callback(new Error('邀请码不能为空'));
    }
      if(!(/^\d{6}$/.test(value))){
        callback(new Error("邀请码不正确"));
      }else{
        callback();
      }
  },
      checkValidatecode(rule, value, callback){
    if (!value) {
      return callback(new Error('验证码不能为空'));
    }
      if(!(/^\d{6}$/.test(value))){
        callback(new Error("请输入6位数字"));
      }else{
        callback();
      }
  },
      //注册用户
			onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var self=this;
            var get_token='application/json';
            var instance = this.$axios.create({
              headers: {'Content-Type': get_token}
            });
            instance.post(process.env.API_HOST+'user/reg',this.form)
              .then(function (response) {
                //console.log(response.data.message)
                self.phoneOrInvite=false;
                self.isShowPhone=false;
                self.isShow=false;
                if(response.data.message=="手机号码或邀请码错误"){
                    self.phoneOrInvite=true;
                }else if(response.data.message=="手机验证码错误"){
                  self.isShowPhone=true;
                } else if(response.data.message!=""){
                  self.isShow=true;
                }else{
                  sessionStorage.setItem('token', response.data.data.token);
                  sessionStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
                  if (sessionStorage.getItem('token')) {
                    //alert("注册成功！");
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
      //获取验证码
      getCheckCode(){
        //获取验证码;
        var invitePhone=this.form.invite.phone;
        this.inviteError=false;
        if(!this.form.invite.inviteCode || !invitePhone){
            this.inviteError=true;
            this.inviteMessage='请输入邀请手机号和邀请码';
            return false;
        }
        var self = this;
        var instance = this.$axios.create({
          headers: {'Content-Type': 'application/json'}
        });
        instance.post(process.env.API_HOST+'corp/send/validate/'+invitePhone)
          .then(function (response) {
            if(response.data.success){
              self.isClick=true;
              var time=60;
              var timer=setInterval(function(){
                time--;
                self.getCode=time+'s后重新获取';
                if(time==0){
                  clearInterval(timer);
                  self.getCode='获取验证码';
                  self.isClick=false;
                }
              },1000)
            }else{
                console.log(response.data.message)
              self.inviteError=true;
              self.inviteMessage=response.data.message;
            }
            /*if(response.data.success){
              self.form.invite.validateCode=response.data.data.sms+'';
            }else{
              alert(response.data.message)
            }*/
          })
          .catch(function (error) {
            console.log(error);
          });
      }
		}
	};
</script>
<style>
	#header {
		width: 960px;
		border: 1px solid #ccc;
    border-radius:10px;
		padding: 20px 20px 50px 20px;
		margin: 0 auto;
		margin-top: 60px;
	}
  .is-exist{
    margin-top: 15px;
    margin-left: 80px;
    margin-bottom: -20px;
    color: #ff4949;
    font-size: 12px;
  }
  .is-exist-conform{
    margin-top:-20px;
    margin-left: 80px;
    margin-bottom: 0px;
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

	#regBtn {
		width: 240px;
		margin-top: 10px;
	}

	.el-form-item__label {
		padding-right: 10px;
	}
  #forgetPwd {
    margin-left: 80px;
  }

  #forgetPwd p {
    font-size: 12px;
    color: darkgray;
  }
</style>
