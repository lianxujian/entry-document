<template>
  <div v-show="detailShow" class="detail">
    <div class="detail-wr">
      <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">任务分配</h2>
      <div class="detail-main" style="margin-left: 60px;padding-left: 50px">
        <el-form label-width="80px" :model="alloArr" ref="alloArr">
          <el-form-item label="服务专员" prop="biz">
            <el-select v-model="alloArr.biz" style="width: 300px">
              <el-option v-for="(item,key) in bizar" :label="item.realName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="记账会计" prop="acc">
            <el-select v-model="alloArr.acc" style="width: 300px">
              <el-option v-for="(item,key) in accar" :label="item.realName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外勤会计" prop="leg">
            <el-select v-model="alloArr.leg" style="width: 300px">
              <el-option v-for="(item,key) in legar" :label="item.realName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 70px;">
            <el-button style="margin-right: 10px;" type="primary" @click="onSubmit('alloArr')">提交</el-button>
            <el-button @click="closeTask(false,'alloArr')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../../config/util.js'
  export default {
    data () {
      return {
      }
    },
    props:{
      detailShow:{
        type:Boolean
      },
      allocateArrObj:{
        type:Array
      },
      alloArr:{
        type:Object
      }
    },
    computed:{
      legar:function(){
        return util.getAllocateArr('leg',this.allocateArrObj);
      },
      accar:function(){
        return util.getAllocateArr('acc',this.allocateArrObj);
      },
      bizar:function(){
        return util.getAllocateArr('biz',this.allocateArrObj);
      }
    },
    methods:{
      closeTask(flag,formName){
        this.$emit('closeTask',flag);
        this.$refs[formName].resetFields();
      },
      onSubmit(formName){
        //console.log(this.alloArr)
        this.$emit('addAlloInfo',this.alloArr);
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
