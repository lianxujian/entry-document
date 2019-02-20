<template>
  <div class="userMag">
    <p class="title">账户信息</p>
    <div class="account">
      <p>账户余额:{{accountData.accountBalance}}元</p>
      <p>累计充值:{{accountData.rechargeSum}}元</p>
      <p>累计扣除:{{accountData.chargeSum}}元</p>
    </div>
    <!--客户信息表格-->
    <div class="redord">
      <p style="margin:40px 0 40px 0;font-size: 20px;font-weight: bold;">扣费记录</p>
      <div class="table">
        <el-table align="center" :data="costData" style="width: 100%">
          <el-table-column align="center" prop="name" label="客户名称" width=""></el-table-column>
          <el-table-column align="center" prop="code" label="合同编号" width=""></el-table-column>
          <el-table-column align="center" prop="period" label="合同年限" width=""></el-table-column>
          <el-table-column align="center" prop="price" label="基准服务费(年)" min-width=""></el-table-column>
          <el-table-column align="center" prop="discount" label="折扣" min-width=""></el-table-column>
          <el-table-column align="center" prop="money" label="费用" min-width=""></el-table-column>
          <el-table-column align="center" prop="createdAt" label="时间" min-width=""></el-table-column>
        </el-table>
      </div>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination style="float:right;" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, prev, pager, next" page-size="10" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //模拟表格数据
        costData: [],
        offset:0,   //参数
        limit:10,
        currentPage:1,
        //是否显示
        total:0,//总用户数
        curPage:1,
        accountData:{
          accountBalance:0,
          chargeSum:0,
          rechargeSum:0
        }
      };
    },
    methods: {
      handleSizeChange(val) {
      },
      //分页
      handleCurrentChange(val) {
        //alert(`当前页: ${val}`);
        this.curPage=val;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/charge/list',{
          params:{
            offset:(self.curPage*1-1+'0')*1,
            limit:10
          }
        })
          .then(function (response) {
            self.costData=response.data.data;
            self.costData.forEach(function(val,i){
              if(val.op_tax=='小规模'){
                val.price=val.smallPrice;
              }else{
                val.price=val.normalPrice;
              }
              val.period=(val.period/12).toFixed(2);
            })
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
          headers: {'x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/charge/state')
          .then(function (response) {
              if(response.data.success){
                self.accountData=response.data.data;
              }
          })
          .catch(function (error) {
            console.log(error);
          });

        var instance2 = this.$axios.create({
          headers: {'x-access-token':get_token}
        });
        instance2.get(process.env.API_HOST+'corp/charge/list',{
          params:{
            offset:0,
            limit:10
          }
        })
          .then(function (response) {
              console.log(response)
            self.costData=response.data.data;
            self.costData.forEach(function(val,i){
              if(val.op_tax=='小规模'){
                val.price=val.smallPrice;
              }else{
                val.price=val.normalPrice;
              }
              val.period=(val.period/12).toFixed(2);
            })
            self.total=response.data.count;
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
  .account{
    width:100%;
    height:120px;
    background:#eee;
  }
  .account p{
    float:left;
    width:30%;
    text-align:center;
    line-height:120px;
    font-size:18px;
    font-weight:bold;
  }
</style>
























