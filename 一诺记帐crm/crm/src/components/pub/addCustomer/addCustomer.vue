<template>
  <div v-show="detailShow" class="detail">
    <div class="detail-wr">
      <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px;box-sizing: border-box;">{{promptInfo.title}}</h2>
      <div class="detail-main">
        <el-form label-width="80px" :model="formCustomer" :rules="rules" ref="formCustomer">
          <p class="detail-title">客户信息</p>
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="formCustomer.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人"  prop="boss">
            <el-input v-model="formCustomer.boss"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"  prop="phone">
            <el-input v-model="formCustomer.phone"></el-input>
          </el-form-item>
          <el-form-item label="报税类别" prop="op_tax">
            <el-select v-model="formCustomer.op_tax">
              <el-option v-for="(item,key) in typeArrObj.TAX" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!--右边-->
          <div style="position: absolute; right: 30px; top:85px;">
            <p class="detail-title">业务信息</p>
            <el-form-item label="所属行业" prop="industry">
              <el-input v-model="formCustomer.industry"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="area">
              <el-input v-model="formCustomer.area"></el-input>
            </el-form-item>
            <!--以下传code值还是value-->
            <el-form-item label="业务类型" prop="op_biz">
              <el-select v-model="formCustomer.op_biz">
                <el-option v-for="(item,key) in typeArrObj.BIZ" :label="item.value" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="取票方式" prop="op_bill">
              <el-select v-model="formCustomer.op_bill">
                <el-option v-for="(item,key) in typeArrObj.BILL" :label="item.value" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item style="position: relative; left: 160px;">
            <el-button style="margin-right: 10px; width: 80px" type="primary" @click="onSubmit('formCustomer')">{{promptInfo.btnTitle}}</el-button>
            <el-button @click="close(false,'formCustomer')">取消</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      var validateTel = (rule, value, callback) => {
//        var reg=/^1[3|4|5|7|8][0-9]\d{4,8}$/;
        var reg=/^1[34578][0-9]{9}$/;
        if(value===''){
          callback(new Error('请输入联系电话'));
        }
        else if (!reg.test(value)) {
          callback(new Error('请输入正确格式的电话'));
        } else {
          callback();
        }
      };
      return {
        rules:{
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          boss: [
            { required: true, message: '请输入联系人',trigger: 'blur' }
          ],
          phone: [
            {required: true,validator: validateTel, trigger: 'blur' }
          ],
          op_tax:[
              { required: true, message: '请选择报税类别',trigger: 'blur'}
          ]
        }
      }
    },
    props:{
      formCustomer: {
        type: Object
      },
      promptInfo:{
        type:Object
      },
      typeArrObj:{
        type:Object
      },
      detailShow:{
        type:Boolean
      },
    },
    methods:{
      close(flag,formName){
        this.$emit('closeAdd',flag);
        this.$refs[formName].resetFields();
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            若校验成功则向父组件发送数据
            this.$emit('addInfo',this.formCustomer);
          }
        });
      }
    }
  }
</script>

<style>
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
    padding: 30px 30px 0 40px!important;
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
</style>
