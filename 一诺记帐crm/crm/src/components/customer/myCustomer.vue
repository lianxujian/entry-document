<template>
  <div class="myCus">
    <p class="title">我的客户</p>
    <div class="tab">
      <div class="left-tab">
        <!--按钮图标两种方式或者 class="el-icon-plus"-->
        <el-button @click="open(true)" type="primary" icon="plus">新建</el-button>
        <el-button type="primary" v-show="false" @click="smsGroup">短信群发</el-button>
        <!--radio3: '全部',绑定radio3默认显示是全部-->
        <!--用的单选钮的自带change事件-->
        <el-radio-group v-model="radio3" @change="select">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="小规模"></el-radio-button>
          <el-radio-button label="一般纳税人"></el-radio-button>
        </el-radio-group>

      </div>
      <div class="right-tab">
        <!--输入框-->
        <el-input
          placeholder="请输入"
          icon="search"
          v-model="input2"
          :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick">
        </el-input>
      </div>
    </div>
    <!--客户信息表格-->
    <div class="table">
      <el-table align="center"
                :data="customerData"
                style="width: 100%"
                current-row-key="3">
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="公司名称"
          min-width="178">
          <!--自定义模板渲染成一个超链接-->
          <!--注意这里传参写法 可以换成在方法里传参试试-->
          <template scope="scope"><el-tooltip :content="scope.row.name" placement="right"><el-button
            type="text"
            @click="getDet(scope.row.id)">
            {{scope.row.name}}
            <!--<router-link :to="{ name:'cusd',params:{id:scope.row.id}}"><p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p></router-link>-->
          </el-button></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="boss"
          label="联系人"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="电话"
          min-width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="合同"
          width="">
        </el-table-column>
        <el-table-column
          align="center"
          label="取票"
          min-width="">
          <template scope="scope">
            <span v-if="scope.row.process.bill==null" class="unPay"></span>
            <span v-else-if="scope.row.process.bill" class="finish">已取</span>
            <span v-else class="unPay">未取</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="记账"
          min-width="">
          <template scope="scope">
            <div type="text">
              <span v-if="scope.row.process.acc==null" class="unPay"></span>
              <span v-else-if="scope.row.process.acc" class="finish">已记</span>
              <span v-else class="unPay">未记</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报税"
          min-width="">
          <template scope="scope">
            <span v-if="scope.row.process.tax==null" class="unPay"></span>
            <span v-else-if="scope.row.process.tax" class="finish">已报</span>
            <span v-else class="unPay">未报</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="专员"
          width="80">
          <template scope="scope">
            <div style="cursor: pointer;color: #20a0ff;"
              :disabled="!managePermission"
              type="text"
              @click="handleTaskAllocation(scope.$index, scope.row)">
              <span v-if="scope.row.tasks">
              <span v-if="scope.row.tasks.biz">{{scope.row.tasks.biz.realName}}</span>
              <span v-else class="unfinish">未分配</span>
              </span>
              <span v-else class="unfinish">未分配</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="外勤"
          width="80">
          <template scope="scope">
            <div style="cursor: pointer;color: #20a0ff;"
              :disabled="!managePermission"
              type="text"
              @click="handleTaskAllocation(scope.$index, scope.row)">
              <span v-if="scope.row.tasks.leg">{{scope.row.tasks.leg.realName}}</span>
              <span v-else class="unfinish">未分配</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="会计"
          width="80">
          <template scope="scope">
            <div style="color: #20a0ff;cursor: pointer;"
              :disabled="!managePermission"
              type="text"
              @click="handleTaskAllocation(scope.$index, scope.row)">
              <span v-if="scope.row.tasks.acc">{{scope.row.tasks.acc.realName}}</span>
              <span v-else class="unfinish">未分配</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination style="float: right;"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-size="this.limit"
        :total="this.totalCustomerData">
      </el-pagination>
    </div>
    <!--增加客户弹框-->
    <add-customer :formCustomer="formCustomer" :promptInfo="promptInfo" :typeArrObj="typeArrObj" :detailShow="detailShow" @closeAdd="closeAddWind" @addInfo="addCusInfo"></add-customer>
    <!--短信群发弹框-->
    <div v-show="smsShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">短信群发</h2>
        <div class="wr-left">
          <div class="wr-sms" v-for="item in smsData" @click="selSms($event)">
            {{item.content}}
          </div>
        </div>
        <div class="wr-right">
          <div class="wr-content">
            <div style="margin:20px;">{{wxContent}}</div>
          </div>
          <el-button type="primary" @click="submitSms" style="margin-left:30px;float:left;">提交</el-button>
          <el-button @click="handlerSms" style="margin-right:30px;float:right;">取消</el-button>
        </div>
      </div>
    </div>
    <!--任务分配弹窗-->
    <task-allocation :alloArr="obj" :allocateArrObj="allocateArrObj" :detailShow="taskAllocationShow" @closeTask="closeTask" @addAlloInfo="addAlloInfo"></task-allocation>
  </div>
</template>
<script >
  import Qs from 'qs';
  import addCustomer from '../pub/addCustomer/addCustomer.vue'
  import taskAllocation from '../pub/taskAllocation/taskAllocation.vue'
  export default {
    components:{
      'add-customer':addCustomer,
      'task-allocation':taskAllocation
    },
    data () {
      return {
        //客户列表表格数据
        customerData:[],
        totalCustomerData:0,
        promptInfo:{
          title:'创建客户',
          btnTitle:'立即创建'
        },
        roles:'',
        input2:'',
        radio3: '全部',
        offset:0,
        limit:20,
        keyword:'',
        op_tax:'',
        customerId:'',
        cusIndex:0,
//          是否显示
        taskAllocationShow:false,
        detailShow: false,
        smsShow:false,
//          表单域标签的位置？
//        labelPosition: 'left',
//        客户信息表单信息
        obj:{
          acc:{realName:''},
          leg:{realName:''},
          biz:{realName:''}
        },
        formCustomer: {
          name: '',
          boss:'',
          phone:'',
          area:'',
          industry:'',
          op_biz:'',
          op_tax:'',
          op_bill:''
        },
        allocateArrObj:[],
        smsData:[
          {
              content:'怎经附近的康师傅肯定是的快速减肥的是否就的撒，的是个反倒是刚发的科技股份看见大哥是哪个副科级大概辅导机构。'
          },
          {
            content:'怎经附近的康师傅肯定是的快速减肥的，的是个反倒是刚发的科技股份看见大哥是哪个副科级大概辅导机构。'
          },
          {
            content:'怎经附近的康师傅肯定是的快速减肥的是否就的撒，的是个反倒是刚发的科技股份看见大哥是哪个副科级大概辅导机构。'
          },
          {
            content:'怎经附近的康师傅肯定是的快速减肥的是否就的撒，的是个反倒是刚发的科技股份看见大哥是哪个副科级大概辅导机构。'
          },
          {
            content:'怎经附近的康师傅肯定是的快速减肥的是否就的撒，的是个反倒是刚发的科技股份看见大哥是哪个副科级大概辅导机构。'
          }
        ],
        wxContent:''
      };
    },
    computed:{
      managePermission: function () {
        if(this.roles.indexOf('admin')!=-1){return true;}
        else {return false;}
      },
      accPermission: function () {
        if(this.roles.indexOf('acc')!=-1){return true;}
        else {return false;}
      }
    },
    props:{
      typeArrObj:{
        type:Object
      }
    },
    methods:{
      handleAcc(b){
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token
          }
        });
        instance.get(process.env.API_HOST+'customer/jz/'+ b.id)
          .then(function (response) {
            window.location.href = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getDet(id){
        this.$router.push({ name:'cusd',params:{id:id,allocateArrObj:this.allocateArrObj,roles:this.roles}})
      },
//      翻页
      handleCurrentChange(val) {
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token
          }
        });
        instance.get(process.env.API_HOST+'customer/list', {
            params: {
              offset:(val-1)*self.limit,
              limit:self.limit,
              keyword:self.keyword,
              op_tax:self.op_tax
            }
          })
          .then(function (response) {
            self.customerData=response.data.data.rows;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
//        处理显示任务分配模态框
      handleTaskAllocation(a,b){
          console.log(a,b)
        this.cusIndex=a;
        this.customerId= b.id;
        this.taskAllocationShow=true;
        this.obj={
          acc:'',
          //accId:'',
          leg:'',
          //legId:'',
          biz:''
          //bizId:''
        }
        if(b.tasks.acc){
          this.obj.acc= b.tasks.acc.userId;
          //this.obj.accId= b.tasks.acc.userId;
        }
        if(b.tasks.leg){
          this.obj.leg= b.tasks.leg.userId;
          //this.obj.legId= b.tasks.leg.userId;
        }
        if(b.tasks.biz){
          this.obj.biz= b.tasks.biz.userId;
          //this.obj.bizId= b.tasks.biz.userId;
        }
      },
      closeTask(flag){
        this.taskAllocationShow = flag;
      },
//      处理增加客户信息弹框
      open(flag){
        this.detailShow = flag;
      },
      closeAddWind(flag){
        this.detailShow = flag;
      },
//      创建客户
      addCusInfo(data){
        var obj=JSON.parse(sessionStorage.getItem('userInfo'));
        var arr=obj.roles.split(',');
        const _taskObj={};
        arr.forEach(function(val,index){
          if(val=='admin'){
            arr.splice(index,1)
          }
        })
        arr.forEach(function(val,index){
          _taskObj[val]=obj.id;
        })
        //console.log(_taskObj,441);
        var postDa=JSON.stringify(_taskObj);
        //console.log(postDa,2345);
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var postData=JSON.stringify(data);
        //console.log(postData)
            var instance = this.$axios.create({
              headers: {'x-access-token':get_token
                ,'Content-Type':'application/json'}
            });
            instance.post(process.env.API_HOST+'customer/add',postData)
              .then(function (response) {
                if(response.data.success){
                  const id=response.data.data.id;
                  instance.post(process.env.API_HOST+'task/'+id,postDa)
                    .then(function (response) {
                      if(response.data.success){
                        instance.get(process.env.API_HOST+'customer/list', {
                          params: {
                            offset: self.offset,
                            limit: self.limit
                          }
                        })
                          .then(function (response) {
                            response = response.data;
                            if (response.success == true) {
                              self.customerData = response.data.rows;
                              self.totalCustomerData = response.data.count;
                              self.radio3 = '全部'
                            }
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }
                    })
                    .catch(function (error) {
                      self.$message('设置失败');
                    });

                  data.name='';
                  data.boss='';
                  data.phone='';
                  data.area='';
                  data.industry='';
                  data.op_biz='';
                  data.op_tax='';
                  data.op_bill='';
                self.$message('创建成功');
                self.detailShow = false;
              }
              })
              .catch(function (error){
                self.$message('创建失败');
              });

      },
//      任务分配
      addAlloInfo(data){
          //console.log(data)
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var postDa=JSON.stringify(data);
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token
            ,'Content-Type':'application/json'}
        });
        instance.post(process.env.API_HOST+'task/'+this.customerId,postDa)
          .then(function (response) {

            if(response.data.success){
//              替换刷新列表
              self.customerData[self.cusIndex].tasks=response.data.data;
              self.taskAllocationShow=false;
              self.$message('任务分配成功');
            }
          })
          .catch(function (error) {
            self.$message('设置失败');
          });
      },
//        点击搜索框搜索
      handleIconClick(){
        var self=this;
        this.keyword=this.input2;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST+'customer/list', {
            params: {
              offset:0,
              limit:self.limit,
              keyword:self.keyword,
              op_tax:self.op_tax
            }
          })
          .then(function (response) {
            response=response.data;
            if(response.success==true){
              if(response.data.count<=0){
                self.$message('无结果');
              }else{
                self.customerData=response.data.rows;
                self.totalCustomerData=response.data.count;
//                搜索完之后不再是默认的tab选项卡全部，置为空
                //self.radio3=''
              }
              //self.input2='';
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      select(key){
          /*case '全部':{
            var get_token=sessionStorage.getItem('token');
            var self=this;
            var instance = this.$axios.create({
              headers: {'x-access-token':get_token
              }
            });
            instance.get(process.env.API_HOST+'customer/list', {
                params: {
                  offset:self.offset,
                  limit:self.limit
                }
              })
              .then(function (response) {
                self.customerData=response.data.data.rows;
                self.totalCustomerData=response.data.data.count;
//                搜索之后点击全部tab选项卡显示全部后点击页码时搜索内容置为空
                self.keyword=''
              })
              .catch(function (error) {
                console.log(error);
              });
          }break;
          case '小规模':{
            alert(1)
          } break;
          case '一般纳税人':{
            alert(2)
          }; break;*/
            if(key=='全部'){
              this.op_tax="";
            }else{
              this.op_tax=key;
            }
            var self=this;
            var get_token=sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {'x-access-token':get_token
              }
            });
            instance.get(process.env.API_HOST+'customer/list', {
              params: {
                offset:0,
                limit:self.limit,
                keyword:self.keyword,
                op_tax:self.op_tax
              }
            })
              .then(function (response) {
                console.log(response);
                self.customerData=response.data.data.rows;
                self.totalCustomerData=response.data.data.count;
              })
              .catch(function (error) {
                console.log(error);
              });
      },
      smsGroup(){
        this.smsShow=true;
      },
      handlerSms(){
          this.smsShow=false;
      },
      submitSms(){
          alert(1)
      },
      selSms(index){
          this.wxContent=index.target.innerText;
          //console.log(index.target.innerText)
      }














    },
    created(){
      var _tempPer=sessionStorage.getItem('userInfo');
      if(_tempPer){
        this.roles=JSON.parse(_tempPer).roles;
        this.roles=this.roles.split(',')
      }
    },
    mounted(){
      if(sessionStorage.getItem('token')){
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST+'customer/list', {
            params: {
              offset:self.offset,
              limit:self.limit,
              keyword:self.keyword,
              op_tax:self.op_tax
              }
          })
          .then(function (response) {
            console.log(response)
            response=response.data;
            if(response.success==true){
              self.customerData=response.data.rows;
              self.totalCustomerData=response.data.count;
//            self.radio3='全部'
            }
          })
          .catch(function (error) {
            console.log(error,"获取客户列表失败");
          });
//      获取任务分配列表
        instance.get(process.env.API_HOST+'user/list', {
            params: {
              offset:0,
              limit:1000
            }
          })
          .then(function (response) {
            self.allocateArrObj=response.data.data.rows;
            //console.log(self.allocateArrObj)
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
  .title{
    font-size: 20px;
    margin-bottom: 15px;
    font-weight:bold;
  }
  .tab{
    margin-bottom: 30px;
  }
  .left-tab,.right-tab{
    display: inline-block;

  }
  .right-tab{
    float: right;
  }
  /*模态框*/
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
  .detail-wr{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -320px;
    margin-left: -350px;
    padding: 30px 0 0 40px;
    width: 700px;
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
  a{
    text-decoration: none;
    color:#20A0FF;
  }
  .detail-title{
    margin-bottom: 15px;
  }
  .myCus .page{
    width: 100%;
    /*position: fixed !important;*/
    /*bottom: 50px !important;*/
    /*right: 170px !important;*/
    margin-top: 90px;
    border-top: 1px solid #ccc;
  }
  .unfinish{
    color: orange;
  }
  .unPay{
    color: firebrick;
  }
  .finish{
    color: forestgreen;
  }
  .wr-left{
    float:left;
    width:45%;
    height:450px;
    border:1px solid #ccc;
    margin-bottom:40px;
    overflow:auto;
  }
  .wr-right{
    float:right;
    width:45%;
    height:450px;
    border:1px solid #ccc;
    margin-bottom:40px;
  }
  .wr-sms{
    padding:10px 15px;
    border:1px solid #ccc;
  }
  .wr-content{
      width:90%;
    margin:80px 0 50px 5%;
    height:200px;
    border:1px solid #ccc;
    border-radius:10px;
  }
</style>
