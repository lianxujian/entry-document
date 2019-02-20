<template>
  <div class="recharge">
    <h3 style="font-size:20px;margin-bottom:30px;">充值管理</h3>
    <!--<div class="right-tab">-->
      <!--&lt;!&ndash;输入框&ndash;&gt;-->
      <!--<el-input placeholder="请输入" icon="search" v-model="searchInner" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick"></el-input>-->
    <!--</div>-->
    <!--信息-->
    <div class="table">
      <el-table align="center"
                :data="rechargeData"
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
          label="服务费基准"
          min-width="">
          <template scope="scope">
              <span v-if="scope.row.normalPrice">{{scope.row.normalPrice}}&nbsp;,&nbsp;{{scope.row.smallPrice}}</span>
              <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="discount"
          label="折扣"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sum"
          label="充值总金额"
          min-width="">
        </el-table-column>
        <el-table-column
          align="center"
          prop="yue"
          label="余额"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="300"
        >
          <template scope="scope">
            <el-button type="text" style="width:40px;" @click="recharge(scope.$index, scope.row.id)">充值</el-button>
            <el-button type="text" style="width:40px;" @click="rechargeRecord(scope.$index, scope.row.id)">充值记录</el-button>
            <el-button type="text" style="width:40px;margin-left:30px;" @click="expenseSetting(scope.$index, scope.row.id)">费用设置</el-button>
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
                     :page-size="this.limit"
                     :total="totalData">
      </el-pagination>
    </div>
    <!--充值记录模态框-->
    <div v-show="isRecShow" class="detail">
      <div class="detail-wr" style="">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">充值记录</h2>
        <el-button type="text" @click="recordCancle" style="color:#000;position: absolute;right: 20px;top: 30px;font-size: 20px;" class="el-icon-close"></el-button>
        <div class="detail-main" style="margin-left: 15px;margin-bottom: 80px;margin-top: 30px;">
          <el-table align="center"
                    :data="recordList"
          >
            <el-table-column
              align="center"
              prop="money"
              label="充值金额"
              min-width="150">
            </el-table-column>
            <el-table-column
              align="center"
              prop="payee"
              label="操作人"
              min-width="150">
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              label="备注"
              min-width="150">
            </el-table-column>
            <el-table-column
              align="center"
              label="时间"
              min-width="150">
                <template scope="scope">
                  <span>{{scope.row.updatedAt}}</span>
                </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <!--<div class="page">-->
            <!--<el-pagination style="float: right;"-->
                           <!--@current-change="handleRecPageChange"-->
                           <!--layout="total, prev, pager, next"-->
                           <!--:page-size="this.limitRec"-->
                           <!--:total="this.totalRec">-->
            <!--</el-pagination>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!--新增区域模态框-->
    <div v-show="isShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">充值</h2>
        <p></p>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="80px" :model="formData" ref="formData" :rules="rules"> <!--ref必须写-->
            <el-form-item label="金额" prop="chargeMoney">
              <el-input v-model.number="formData.chargeMoney" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="经手人" prop="chargePerson">
              <el-input v-model="formData.chargePerson" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :rows="5" v-model="formData.remark"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 100px;">
              <el-button type="primary" @click="handlerCharge('formData')">提交</el-button>
              <el-button @click="handlerCancle('formData')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--费用设置模态框-->
    <div v-show="isSettingShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">费用设置</h2>
        <p></p>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="92px" :model="formSettingData" ref="formSettingData"> <!--ref必须写-->
            <p style="margin:10px 5px 15px 53px;font-size:14px;color:#48576a;">服务费基准</p>
            <el-form-item label="一般纳税人" style="margin-left:70px;" prop="normalPrice" :rules="{ required: true,validator:normalPrice,trigger: 'blur'}">
              <el-input v-model.number="formSettingData.normalPrice" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="小规模" style="margin-left:70px;" prop="smallPrice" :rules="{ required: true,validator:smallPrice,trigger: 'blur'}">
              <el-input v-model="formSettingData.smallPrice" style="width: 350px"></el-input>
            </el-form-item>
            <!--<el-checkbox-group v-model="formSettingData.roles" style="margin-bottom:20px;margin-left:120px;">
              <span style="margin:0 25px 15px -77px;font-size:12px;">折扣</span>
              <el-checkbox label="acc">0.1</el-checkbox>
              <el-checkbox label="leg">0.12</el-checkbox>
              <el-checkbox label="biz">0.15</el-checkbox>
            </el-checkbox-group>-->
            <el-form-item label="折扣 ">
              <el-radio-group v-model="formSettingData.discount">
                <el-radio :label="0.1"></el-radio>
                <el-radio :label="0.12"></el-radio>
                <el-radio :label="0.15"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="5" v-model="formSettingData.remark"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 100px;">
              <el-button type="primary" @click="handlerSetting('formSettingData')">保存</el-button>
              <el-button @click="handlerSettingCancle('formSettingData')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import util from '../../config/util'
  export default{
    data(){
      return{
        rules:{
          chargeMoney:[
          { required: true, message: '请输入金额'},
          { type: 'number', message: '合同期限必须为数字值'}
        ],
          chargePerson:[
            { required: true, message: '经手人不能为空'}
          ]
        },
        isShow:false,
        isSettingShow:false,
        isRecShow:false,
        offset:0,
        limit:10,
        totalData:0,
        currentPage:1,
        corpId:'',
//        列表数据
        rechargeData:[],
        recordList:[],
//        表单绑定数据
        formData:{
          chargeMoney:'',
          chargePerson:'',
          remark:''
        },
        //费用设置
        formSettingData:{}
      }
    },
    methods:{
      normalPrice(rule, value, callback){
        if (!value) {
          return callback(new Error('请输入基准'));
        }
        if(!(/^\d*$/.test(value))){
          callback(new Error("一般纳税人基准必须为整数值"));
        }else{
          callback();
        }
      },
      smallPrice(rule, value, callback){
        if (!value) {
          return callback(new Error('请输入基准'));
        }
        if(!(/^\d*$/.test(value))){
          callback(new Error("小规模基准必须为整数值"));
        }else{
          callback();
        }
      },
      //分页
      handleCurrentChange(val){
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST+'corp/recharge/sum', {
            params: {
              offset:(val-1)*self.limit,
              limit:self.limit
            }
          })
          .then(function (response) {
            if(response.data.success==true){
              self.rechargeData=response.data.data;
              self.currentPage=val;
            }
          })
          .catch(function (error) {
            console.log(error,"获取列表失败");
          });
      },
      recharge(a,corpId){
          if(this.rechargeData[a].active){
            this.isShow=true;
            this.corpId=corpId;
          }else{
            this.$alert('该公司未注册暂不能充值', '充值管理', {
              confirmButtonText: '确定'
            });
          }
      },
      rechargeRecord(a,corpId){
        this.corpId=corpId;
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST+'corp/recharge/list/'+this.corpId)
          .then(function (response) {
            if(response.data.success==true){
              self.recordList=response.data.data.rows;
              self.totalRec=response.data.data.count;
              self.isRecShow=true;
              self.recordList.forEach(function (ele) {
                ele.updatedAt=util.formatDate(new Date(ele.updatedAt));
              })
            }
          })
          .catch(function (error) {
            console.log(error,"获取列表失败");
          });
      },
      handlerCancle(formName){
        this.isShow=false;
        this.$refs[formName].resetFields();
      },
      recordCancle(){
        this.isRecShow=false;
      },
      handlerCharge(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var postData={
              "money":parseInt(this.formData.chargeMoney),
              "payee":this.formData.chargePerson,
              "remark":this.formData.remark
            }
            var self=this;
            var get_token=sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {'x-access-token':get_token
                ,'Content-Type':'application/json'}
            });
            instance.post(process.env.API_HOST+'corp/recharge/add/'+this.corpId,postData)
              .then(function (response) {
                if(response.data.success){
                  self.$message('充值成功');
                  instance.get(process.env.API_HOST+'corp/recharge/sum', {
                      params: {
                        offset:(self.currentPage-1)*self.limit,
                        limit:self.limit
                      }
                    })
                    .then(function (response) {
                      if(response.data.success==true){
                        self.rechargeData=response.data.data;
                      }
                    })
                    .catch(function (error) {
                      console.log(error,"获取列表失败");
                    });
                }else{
                  self.$message('充值失败');
                }
                self.isShow=false;
                self.$refs[formName].resetFields();
              })
              .catch(function (error){
                self.$message('充值失败');
              });
          }
        });
      },
      //费用设置弹框显示
      expenseSetting(index,id){
        this.corpId=id;
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'Content-Type':'application/json','x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/chargeset/'+id)
          .then(function (response) {
              if(response.data.success){
                self.isSettingShow=true;
                self.formSettingData=response.data.data;
                console.log(self.formSettingData)
              }else{
                self.$alert('该公司未注册暂不能设置费用', '充值管理', {
                  confirmButtonText: '确定'
                });
              }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      handlerSetting(formName){
        this.formSettingData.smallPrice=this.formSettingData.smallPrice+'';
        this.formSettingData.normalPrice=this.formSettingData.normalPrice+'';
        this.formSettingData.discount=this.formSettingData.discount+'';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var self=this;
            var get_token=sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {'Content-Type':'application/json','x-access-token':get_token}
            });
            instance.post(process.env.API_HOST+'corp/chargeset/update/'+this.corpId,this.formSettingData)
              .then(function (response) {
                if(response.data.success){
                  self.isSettingShow=false;
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
      handlerSettingCancle(formName){
        //this.$refs[formName].resetFields();
        this.isSettingShow=false;
      }
    },//0549b0f7-dd06-45c9-a722-9151ff9f08c1
    mounted(){
      if(sessionStorage.getItem('token')){
        var self=this;
        var get_token=sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST+'corp/recharge/sum', {
            params: {
              offset:self.offset,
              limit:self.limit
            }
          })
          .then(function (response) {
            if(response.data.success==true){
                //console.log(response.data.data)
              self.rechargeData=response.data.data;
//              没有返回总条数
              self.totalData=response.data.count;
              self.currentPage=1;
            }
          })
          .catch(function (error) {
            console.log(error,"获取列表失败");
          });
      }else{
        this.$router.push({path:'/loginView'})
      }
    }
  }
</script>
