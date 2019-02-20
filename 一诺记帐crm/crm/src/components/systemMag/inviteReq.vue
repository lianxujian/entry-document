<template>
	<div class="inviteMaintain">
    <h3 style="font-size:20px;margin-bottom:15px;">注册邀请</h3>
    <div style="margin-bottom: 20px;margin-top: 5px;float:left;"><el-button size="small" @click="handleAdd('formData')" type="primary" icon="plus">新增</el-button></div>
    <div class="right-tab">
      <!--输入框-->
      <el-input placeholder="请输入" icon="search" v-model="searchInner" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick"></el-input>
    </div>
    <!--邀请信息-->
    <div class="table">
      <el-table align="center"
                :data="inviteData"
                style="">
        <el-table-column
          align="center"
          label="单位编码"
          prop="code"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="单位名称"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号码"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="manager"
          label="姓名"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="地区"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="inviteCode"
          label="邀请码"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="active"
          label="状态"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="180"
        >
          <template scope="scope">
            <el-button type="text" style="width:60px;margin-right:0;" v-show="scope.row.active=='未注册'" @click="reSend(scope.$index, scope.row)">重新发送</el-button>
            <el-button type="text" style="width:40px;" v-show="scope.row.active=='未注册'" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination style="float: right;"
                     @current-change="handleCurrentChange"
                     layout="total, prev, pager, next"
                     :current-page.sync="currentPage"
                     :page-size="10"
                     :total="total">
      </el-pagination>
    </div>

    <!--新增区域模态框-->
    <div v-show="inviteShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">注册邀请</h2>
        <p></p>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="80px" :model="formData" ref="formData"> <!--ref必须写-->
            <el-form-item label="单位编号" prop="code" :rules="{required: true,validator:checkNumber,trigger: 'blur'}">
              <el-input v-model="formData.code" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" prop="name" :rules="{ required: true, message: '请输入单位名称', trigger: 'blur' }">
              <el-input v-model="formData.name" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="manager" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
              <el-input v-model="formData.manager" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone" :rules="{required: true,validator:checkPhone,trigger: 'blur'}">
              <el-input v-model="formData.phone" style="width: 350px"></el-input>
            </el-form-item>
            <p class="invite-is-exist" v-show="isExist">手机号码已经注册</p>
            <el-form-item label="地区" size="large">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <p class="invite-is-exist" v-show="isAreaExist">请选择地区</p>
            <el-form-item style="margin-left: 100px;">
              <el-button type="primary" @click="submitinvite('formData')">提交</el-button>
              <el-button @click="handlerAddAera('formData')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        options:[],
        inviteData:[],
        inviteShow:false,
        total:0,
        formData:{
          code:'',
          name:'',
          manager:'',
          phone:'',
          province:'',
          city:'',
          email:'',
          area:''
        },
        selectedOptions:[],
        isExist:false,
        isAreaExist:false,
        searchInner:"",
        offset:0,
        limit:10,
        currentPage:1
      }
    },
    methods:{
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
      checkNumber(rule, value, callback){
        if (!value) {
          return callback(new Error('请输入单位编号'));
        }
        if(!(/^(\d|[a-z]|[A-Z]|-){5,8}$/.test(value))){
          callback(new Error("请输入5-8位字母数字横线的单位编号"));
        }else{
          callback();
        }
      },
      handlerAddAera(formName){
        //this.isExist=false;
        this.$refs[formName].resetFields();
        this.inviteShow=false;
      },
      //添加
      handleAdd(formName){
        this.inviteShow=true;
        this.isExist=false;
        this.isAreaExist=false;
        this.selectedOptions=[];
        //this.$refs[formName].resetFields();
        this.formData={
          code:'',
          name: '',
          manager: '',
          phone: '',
          province: '',
          city: '',
          email: '',
          area:''
        }
        //console.log(this.formData)
      },
      //删除
      handleDelete(ind,row){
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
              var id=row.id;
              var self = this;
              var get_token = sessionStorage.getItem('token');
              var instance = this.$axios.create({
                headers: {"Content-Type":"application/json",'x-access-token':get_token}
              });
              instance.post(process.env.API_HOST+'corp/del/'+id)
                .then(function (response) {
                  if(response.data.success){
                    /*self.inviteData.splice(ind,1);
                    self.total--;*/
                      instance.get(process.env.API_HOST+'corp/list?offset='+(self.currentPage-1+'0')*1+'&limit='+self.limit)
                        .then(function (response) {
                          var dataArr=response.data.data.rows;
                          for(var item of dataArr){
                            item.area=item.province+" "+item.city;
                            switch(item.active){
                              case true:
                                item.active='已注册';
                                break;
                              case false:
                                item.active="未注册";
                                break;
                            }
                          }
                          self.inviteData=dataArr;
                          self.total=response.data.data.count;
                          console.log(response.data.data)
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
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
      //添加提交
      submitinvite(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(!this.formData.city){
                  this.isAreaExist=true;
                  return false;
              }
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {"Content-Type":"application/json",'x-access-token':get_token}
            });
            //新增区域
            instance.post(process.env.API_HOST+'corp/invite',self.formData)
              .then(function (response) {
                //console.log(response)
                if(response.data.success){
                  self.inviteShow=false;
                  self.currentPage=1;
                  self.searchInner="";
                    instance.get(process.env.API_HOST+'corp/list?offset='+self.offset+'&limit='+self.limit)
                      .then(function (response) {
                        var dataArr=response.data.data.rows;
                        for(var item of dataArr){
                          item.area=item.province+" "+item.city;
                          switch(item.active){
                            case true:
                              item.active='已注册';
                              break;
                            case false:
                              item.active="未注册";
                              break;
                          }
                        }
                        self.inviteData=dataArr;
                        self.total=response.data.data.count;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                }else{
                  self.isExist=true;
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
      //地区select
      handleChange(value) {
        this.formData.province=value[0];
        this.formData.city=value[1];
        //console.log(this.selectedOptions)
        for(var province of this.options){
            for(var city of province.children){
                if(city.label==value[1]){
                    this.formData.area=city.code
                }
            }
        }
      },
      //重新发送
      reSend(ind,row){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {"Content-Type":"application/json",'x-access-token':get_token}
        });
        instance.post(process.env.API_HOST+'corp/send/invite/'+row.id)
          .then(function (response) {
            if(response.data.success){
              self.$alert('重新发送成功', '注册邀请', {
                confirmButtonText: '确定'
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //分页
      handleCurrentChange(val){
        this.currentPage=val;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {"Content-Type":"application/json",'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/list?keyword='+this.searchInner+'&offset='+(val-1+'0')*1+'&limit='+this.limit)
          .then(function (response) {
            //console.log(response)
            var dataArr=response.data.data.rows;
            for(var item of dataArr){
              item.area=item.province+" "+item.city;
              switch(item.active){
                case true:
                  item.active='已注册';
                  break;
                case false:
                  item.active="未注册";
                  break;
              }
            }
            self.inviteData=dataArr;
            self.total=response.data.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //关键字查找
      handleIconClick(){
          //console.log(this.searchInner)
        this.currentPage=1;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {"Content-Type":"application/json",'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/list?keyword='+this.searchInner+'&offset='+self.offset+'&limit='+self.limit)
          .then(function (response) {
            //console.log(response)
            var dataArr=response.data.data.rows;
            //console.log(dataArr)
            for(var item of dataArr){
              item.area=item.province+" "+item.city;
              switch(item.active){
                case true:
                  item.active='已注册';
                  break;
                case false:
                  item.active="未注册";
                  break;
              }
            }
            self.inviteData=dataArr;
            self.total=response.data.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      if(sessionStorage.getItem('token')){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {"Content-Type":"application/json",'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/list?offset='+this.offset+'&limit='+this.limit)
          .then(function (response) {
            //console.log(response)
            var dataArr=response.data.data.rows;
            for(var item of dataArr){
              item.area=item.province+" "+item.city;
              switch(item.active){
                case true:
                  item.active='已注册';
                  break;
                case false:
                  item.active="未注册";
                  break;
              }
            }
            self.inviteData=dataArr;
            self.total=response.data.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取select省市地区
        instance.get(process.env.API_HOST+'meta/areas')
          .then(function (response) {
            //console.log(response.data.data)
            var dataArea=response.data.data;
            var stringArea=JSON.stringify(dataArea).replace(/name/g,'value').replace(/childs/g,'children');
            var objArea=JSON.parse(stringArea);
            for(var item of objArea){
              item.label=item.value;
              for(var city of item.children){
                city.label=city.value;
              }
            }
            self.options=objArea;
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        this.$router.push({path:'/loginView'})
      }
    }
  }

</script>
<style>
  .el-table__row .el-table_1_column_3 .cell {
    width: 100%;
    margin-left: 0px;
  }
  .invite-is-exist{
    margin-top: -5px;
    margin-left: 80px;
    margin-bottom: 10px;
    color: #ff4949;
    font-size: 12px;
  }
  .page{
    margin-top:100px;
  }
  .el-cascader-menu{
    height:370px;
  }
</style>
