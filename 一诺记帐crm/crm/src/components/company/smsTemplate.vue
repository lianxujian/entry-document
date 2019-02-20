<!--
<template>
  <div class="userMag">
    <p class="title">短信模版</p>
    <div class="tab">
      <div class="left-tab">
        &lt;!&ndash;按钮图标两种方式或者 class="el-icon-plus"&ndash;&gt;
        <el-button @click="addUser(true)" type="primary" icon="plus">新建</el-button>
        &lt;!&ndash;showAll: '全部',绑定showAll默认显示是全部&ndash;&gt;
        &lt;!&ndash;用的单选钮的自带change事件&ndash;&gt;
      </div>
      <div class="right-tab">
        &lt;!&ndash;输入框&ndash;&gt;
        <el-input placeholder="请输入" icon="search" v-model="searchInner" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick"></el-input>
      </div>
    </div>
    &lt;!&ndash;客户信息表格&ndash;&gt;
    <div class="table">
      <el-table align="center" :data="userData" style="width: 100%">
        <el-table-column align="center" prop="userName" label="用户名" width=""></el-table-column>
        <el-table-column align="center" prop="realName" label="姓名" width=""></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号码" width=""></el-table-column>
        <el-table-column align="center" prop="roles" label="角色" min-width=""></el-table-column>
        <el-table-column align="center" label="操作" min-width="">
          &lt;!&ndash;注意自定义的必须用模板渲染&ndash;&gt;
          <template scope="scope">
            <el-button type="text" @click="revise(true,scope.$index)">修改</el-button>
            <el-button type="text" @click="del(scope.$index)">删除</el-button>
            &lt;!&ndash;<el-button type="text">权限</el-button>&ndash;&gt;
          </template>
        </el-table-column>
      </el-table>
    </div>
    &lt;!&ndash;分页&ndash;&gt;

    <div class="page">
      <el-pagination style="float:right;" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, prev, pager, next" page-size="10" :total="total">
      </el-pagination>
    </div>

    &lt;!&ndash;创建和修改用户&ndash;&gt;
    <div v-show="detailShow" class="detail">
      <div class="companyCreate">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px;overflow: hidden;">{{createOrEdit}}用户<i @click="openOrClose('formUser')" style="float: right;margin-right: 20px;cursor: pointer;" class="el-icon-close"></i></h2>
        <div class="detail-main">
          <el-form label-width="80px" :model="formUser" ref="formUser">
            <el-form-item class="marginLeft" label="用户名" prop="userName" :rules="{ required: true,validator:checkUser,trigger: 'blur'}">
              <el-input v-model="formUser.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="marginLeft" v-if='isPassword' label="密码" prop="password" :rules="{ required: true,validator:validatePass,trigger: 'blur'}">
              <el-input type="password" v-model="formUser.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" style="margin-left:70px;" v-if='isPassword' prop="checkPass" :rules="{ required: true,validator:validatePass2,trigger: 'blur'}">
              <el-input type="password" v-model="formUser.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="marginLeft" label="姓名" prop="realName" :rules="{ required: true,validator:checkName,trigger: 'blur'}">
              <el-input v-model="formUser.realName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="marginLeft" label="手机号码" prop="phone" :rules="{required: true,validator:checkPhone,trigger: 'blur'}">
              <el-input v-model="formUser.phone" auto-complete="off"></el-input>
            </el-form-item>
            <p class="is-exist-edit" v-show="editShow">手机号码已存在</p>
            <el-checkbox-group v-model="formUser.roles" style="margin-bottom:20px;margin-left:120px;">
              <span style="margin:0 5px 15px -46px;font-size:12px;" v-bind:style="{color:toggleColor}">请选择角色</span>
              <el-checkbox label="acc">会计</el-checkbox>
              <el-checkbox label="leg">外勤</el-checkbox>
              <el-checkbox label="biz">行政</el-checkbox>
              <el-checkbox label="admin">管理员</el-checkbox>
            </el-checkbox-group>
            <el-form-item class="marginLeft" id="remarks" label="备注">
              <el-input id="textArea" type="textarea" :rows="3" v-model="formUser.title"></el-input>
            </el-form-item>
            <p class="is-exist-edit" v-show="addShow">用户名或手机号码已存在</p>
            <el-form-item style="position: relative; left: 110px;">
              <el-button style="margin-right: 10px;" type="primary" @click="onSubmit('formUser')">提交</el-button>
              <el-button @click="openOrClose('formUser')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        //模拟表格数据
        userData: [{
          userName: '',
          realName: '',
          phone: '',
          roles: ''
        }],
        createOrEdit:'',
        offset:0,   //参数
        limit:10,
        currentPage:1,
        radio3:'全部',
        searchInner: '',
        toggleColor:'#48576a',
        //是否显示
        taskAllocationShow: false,
        detailShow: false,
        addShow:false,
        editUser: false,
        id:'',
        index:'',
        total:0,//总用户数
        curPage:1,
        role:'',
        isPassword:true,
        editShow:false,
        //客户信息表格
        formUser: {
          userName:"",
          password:"",
          checkPass:"",
          realName:"",
          phone:"",
          roles:[],
          title:""
        }
      };
    },
    methods: {
      //表单验证
      checkUser(rule, value, callback){
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        if(!(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/.test(value))){
          callback(new Error("用户名格式不正确"));
        }else{
          callback();
        }
      },
      validatePass (rule, value, callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/.test(value))){
          callback(new Error("输入8到16位两种以上字符"));
        } else {
          if (this.formUser.checkPass !== '') {
            this.$refs.formUser.validateField('checkPass');
          }
          callback();
        }
      },
      validatePass2 (rule, value, callback){
        /*if (value === '') {
         callback(new Error('请输入密码'));
         }
         if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/.test(value))){
         callback(new Error("输入8到16位两种以上字符"));
         }else if (value !== this.formUser.pass) {
         callback(new Error('两次输入密码不一致!'));
         } else {
         callback();
         }*/
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }else if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/.test(value))){
          callback(new Error("输入8到16位两种以上字符"));
        } else if (value !== this.formUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      checkPhone(rule, value, callback){
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        if(!(/^1[34578][0-9]{9}$/.test(value))){
          callback(new Error("手机号码格式不正确"));
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
      handleSizeChange(val) {
        //alert(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //alert(`当前页: ${val}`);
        this.curPage=val;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'user/list',{
          params:{
            offset:(self.curPage*1-1+'0')*1,
            limit:10,
            role:self.role,
            keyword:self.searchInner
          }
        })
          .then(function (response) {
            self.userData=response.data.data.rows;
            for(var i of self.userData){
              i.roles=i.roles.replace(/acc/,"会计").replace(/leg/,'外勤').replace(/biz/,'行政').replace(/admin/,'管理员');
            }
            //console.log(self.userData)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //用户管理窗口打开或关闭
      addUser(flag) {
        //通过改变属性来确定是否显示
        //this.$router.push({path:'/customerLeftMenu/userMag'});
        this.detailShow = flag;
        this.createOrEdit="创建";
        this.editShow=false;
        this.addShow=false;
        this.formUser={
          userName:"",
          password:"",
          realName:"",
          phone:"",
          roles:[],
          title:""

        }
        this.isPassword=true;
      },
      openOrClose(formName){
        this.$refs[formName].resetFields();
        this.toggleColor='#48576a';
        this.detailShow = false;
      },
      revise(flag,index){
        this.detailShow = flag;
        this.addShow=false;
        this.createOrEdit="修改";
        this.isPassword=false;
        this.formUser.userName=this.userData[index].userName;
        this.formUser.phone=this.userData[index].phone;
        this.formUser.realName=this.userData[index].realName;
        this.formUser.title=this.userData[index].title;
        this.formUser.roles=this.userData[index].roles;
        var str=this.formUser.roles;
        str=str.replace(/会计/,"acc").replace(/外勤/,'leg').replace(/行政/,'biz').replace(/管理员/,'admin');
        str=str.split(',');
        this.formUser.roles=str;
        this.id=this.userData[index].id;
        this.index=index;
      },
      edit(flag) {
        this.editUser = flag;
        this.formUser={
          userName:"",
          password:"",
          checkPass:"",
          realName:"",
          phone:"",
          roles:[],
          title:""

        }
      },
      //删除用户列表项
      del(id){
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您确定要删除吗？'),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '';
              done();
              instance.confirmButtonLoading = false;
              //请求后台删除数据
              //console.log(this.userData[id].id)
              var key=this.userData[id].id;
              var self = this;
              var get_token = sessionStorage.getItem('token');
              var instance = this.$axios.create({
                headers: {'x-access-token':get_token}
              });
              instance.post(process.env.API_HOST+'user/del/'+key)
                .then(function (response) {
                  if(response.data.success){
                    //self.userData.splice(id,1);
                    //self.total&#45;&#45;;
                    setTimeout(function(){
                      instance.get(process.env.API_HOST+'user/list',{
                        params:{
                          offset:(self.curPage*1-1+'0')*1,
                          limit:10
                        }
                      })
                        .then(function (response) {
                          self.userData=response.data.data.rows;
                          for(var i of self.userData){
                            i.roles=i.roles.replace(/acc/,"会计").replace(/leg/,'外勤').replace(/biz/,'行政').replace(/admin/,'管理员');
                          }
                          //console.log(self.userData)
                          self.total=response.data.data.count;
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    })
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              done();
            }
          }
        })
      },
      //添加修改用户
      onSubmit(formName) {
        //表单验证
        //console.log(this.formUser)
        if(this.formUser.roles.length==0){
          this.toggleColor='#ff4949';
        }else{
          this.toggleColor='#48576a';
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var self = this;
            if(this.createOrEdit=="创建"){
              //创建用户
              var instance = this.$axios.create({
                headers: {'Content-Type': 'application/json','x-access-token':sessionStorage.getItem('token')}
              });
              instance.post(process.env.API_HOST+'user/add',self.formUser)
                .then(function (response) {
                  self.searchInner="";
                  self.currentPage=1;
                  self.radio3='全部';
                  if(response.data.message=='创建用户成功'){
                    self.detailShow = false;
                    instance.get(process.env.API_HOST+'user/list',{
                      params:{
                        offset:0,
                        limit:10,
                        keyword:"",
                        role:""
                      }
                    })
                      .then(function (response) {
                        self.userData=response.data.data.rows;
                        for(var i of self.userData){
                          i.roles=i.roles.replace(/acc/,"会计").replace(/leg/,'外勤').replace(/biz/,'行政').replace(/admin/,'管理员');
                        }
                        self.total=response.data.data.count;
                        //console.log(self.userData)
                        self.formUser={
                          userName:"",
                          password:"",
                          checkPass:"",
                          realName:"",
                          phone:"",
                          roles:[],
                          title:""
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }else{
                    self.addShow=true;
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }else{
              //修改用户
              var instance = this.$axios.create({
                headers: {'Content-Type': "application/json",'x-access-token':sessionStorage.getItem('token')}
              });
              instance.post(process.env.API_HOST+'user/'+self.id,self.formUser)
                .then(function (response) {
                  if(response.data.message=='更新用户成功'){
                    var temObj=JSON.parse(sessionStorage.getItem('userInfo'));
                    if(response.config.url.indexOf(temObj.id)>=0){
                      var temRole=JSON.parse(response.config.data).roles.join(',');
                      temObj.roles=temRole;
                      sessionStorage.removeItem('userInfo');
                      sessionStorage.setItem('userInfo',JSON.stringify(temObj));
                    }
                    self.detailShow = false;
                    self.userData[self.index]=JSON.parse(response.config.data);
                    self.userData[self.index].id=self.id;
                    self.userData=Array.prototype.slice.call(self.userData)
                    console.log(sessionStorage.getItem('userInfo'),2222);
                    var str=self.userData[self.index].roles.join(',');
                    str=str.replace(/acc/,"会计").replace(/leg/,'外勤').replace(/biz/,'行政').replace(/admin/,'管理员');
                    self.userData[self.index].roles=str;

                    self.formUser={
                      userName:"",
                      password:"",
                      checkPass:"",
                      realName:"",
                      phone:"",
                      roles:[],
                      title:""
                    }
                  }else{
                    self.editShow=true;
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //点击搜索框搜索
      handleIconClick() {
        this.currentPage=1;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'user/list',{
          params:{
            offset:0,
            limit:10,
            keyword:self.searchInner,
            role:self.role
          }
        })
          .then(function (response) {
            console.log(response.data.data.rows)
            self.userData=response.data.data.rows;
            for(var i of self.userData){
              i.roles=i.roles.replace(/acc/,"会计").replace(/leg/,'外勤').replace(/biz/,'行政').replace(/admin/,'管理员');
            }
            self.total=response.data.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });

        //alert(this.searchInner);
        //搜索完复为空占位字显示
        //this.searchInner = ''
      }
    },
    mounted(){
      if(sessionStorage.getItem('token')){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'user/list',{
          params:{
            offset:0,
            limit:10,
            keyword:self.searchInner,
            role:self.role
          }
        })
          .then(function (response) {
            //self.userData=response.data.data.rows;
            for(var i of self.userData){
              i.roles=i.roles.replace(/acc/,"会计").replace(/leg/,'外勤').replace(/biz/,'行政').replace(/admin/,'管理员');
            }
            //self.total=response.data.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        this.$router.push({path:'/loginView'})
      }
    }
  };
</script>
<style>
  .title {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .tab {
    margin-bottom: 30px;
  }

  .left-tab,
  .right-tab {
    display: inline-block;
  }

  .right-tab {
    float: right;
  }
  .detail{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background:rgba(7,17,27,0.7);
  }
  .companyCreate,
  .companyEdit{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -320px;
    margin-left: -350px;
    padding: 30px 40px;
    width: 570px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .detail-main{
    float: left;
  }
  .detail-status{
    display: inline-block;
    background:skyblue;
    padding-left: 3px;
    padding-right: 3px;
    margin-right:5px;
    border-radius: 4px;
  }
  .dd{
    background:#FFCC00 !important;
  }
  a{
    text-decoration: none;
    color:#20A0FF;
  }
  .detail-title{
    margin-bottom: 15px;
  }
  .userMag .page{
    width: 100%;
    border-top: 1px solid #ccc;
    margin-top: 100px;
  }
  .marginLeft {
    margin-left: 70px;
  }
  #remarks .el-input__inner{
    height: 80px;
  }
  #textArea textarea {
    resize: none;
  }
  .el-table__row .el-table_1_column_3 .cell{
    width: 127px;
    margin-left: -10px;
  }
  .is-exist-edit{
    margin-top: -20px;
    margin-left: 148px;
    margin-bottom: 10px;
    color: #ff4949;
    font-size: 12px;
  }
</style>
























-->
