<template>
	<div id="companyInfo" >
		<h2>单位信息</h2>
		<ul>
			<li>单位序号：</li>
			<li>{{basicInfoData.code}}</li>
		</ul>
		<ul>
			<li>单位名称：</li>
			<li>{{basicInfoData.name}}</li>
		</ul>
		<ul>
			<li>所在地区：</li>
			<li><span>{{basicInfoData.province}}</span>&nbsp;&nbsp;&nbsp;<span>{{basicInfoData.city}}</span></li>
		</ul>
		<ul>
			<li>详细地址：</li>
			<li>{{basicInfoData.address}}</li>
			<!--<li>修改</li>-->
			<el-button class="modify" type="text" @click="editBasic(0)" style="margin-top:-5px;float:left">修改</el-button>
		</ul>
		<ul>
			<li>绑定邮箱：</li>
			<li>{{basicInfoData.email}}</li>
			<!--<li class="modify">修改</li>-->
			<el-button class="modify" type="text" @click="editBasic(1)" style="margin-top:-5px;float:left">修改</el-button>
		</ul>
		<ul>
			<li>绑定手机：</li>
			<li>{{basicInfoData.phone}}</li>
			<!--<li class="modify">修改</li>-->
			<el-button class="modify" type="text" @click="editBasic(2)" style="margin-top:-5px;float:left">修改</el-button>
		</ul>
		<ul>
			<li>负责人：</li>
			<li>{{basicInfoData.manager}}</li>
			<!--<li class="modify">修改</li>-->
			<el-button class="modify" type="text" @click="editBasic(3)" style="margin-top:-5px;float:left">修改</el-button>
		</ul>

		<!-- 修改 -->
		<div v-show="editIsShow" id="editAddr">
			<div id="editAddrDetail">
				<el-form  label-width="120px">
	         		<el-form-item label="">
                 <label style="margin-right:10px;margin-left:-20px;">{{editName}}</label>
	           			<el-input style="width: 60%" v-model="editForm.text"></el-input>
	         		</el-form-item>
              <p class="is-pass" v-if="valigateShow">{{valigateMessage}}</p>
	         		<el-form-item style="position: relative; left: 50px;">
	           			<el-button style="margin-right: 10px;" type="primary" @click="onBasicSubmit">提交</el-button>
	           			<el-button @click="editCancel(false)">取消</el-button>
	         		</el-form-item>
       			</el-form>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
    	return {
    		editIsShow: false,
    		basicInfoData:{},
        editForm:{
          text:''
        },
        editName:'',
        editItem:{},
        valigateMessage:'手机号格式不正确',
        valigateShow:false
    	}
   },
   methods: {
     //修改弹出框
     editBasic(ind) {
   			this.editIsShow = true;
        this.valigateShow=false;
   			switch(ind){
          case 0:
             this.editName='详细地址';
             this.editForm.text=this.basicInfoData.address;
             this.editItem.address=this.editForm.text;
             break;
          case 1:
            this.editName='绑定邮箱';
            this.editForm.text=this.basicInfoData.email;
            this.editItem.email=this.editForm.text;
            break;
          case 2:
            this.editName='绑定手机';
            this.editForm.text=this.basicInfoData.phone;
            this.editItem.phone=this.editForm.text;
            break;
          case 3:
            this.editName='负责人';
            this.editForm.text=this.basicInfoData.manager;
            this.editItem.manager=this.editForm.text;
            break;
        }
   		},
     //修改取消
     editCancel(flag){
       this.editIsShow = flag;
     },
     onBasicSubmit(){
       switch(this.editName){
         case '详细地址':
           this.editItem.address=this.editForm.text;
           break;
         case '绑定邮箱':
           this.editItem.email=this.editForm.text;
           break;
         case '绑定手机':
           this.editItem.phone=this.editForm.text;
           break;
         case '负责人':
           this.editItem.manager=this.editForm.text;
           break;
       }
       var key;
       for(var item in this.editItem){
           key=item;
       }
       var emailFilter  = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
       var phoneFilter=/^1[34578][0-9]{9}$/;
       if(key=='email'&& !emailFilter.test(this.editItem.email)){
           this.valigateMessage='邮箱格式不正确';
           this.valigateShow=true;
       }else if(key=='phone' && !phoneFilter.test(this.editItem.phone)){
           this.valigateMessage='手机号码格式不正确';
           this.valigateShow=true;
       }else{
         this.editIsShow = false;
         this.valigateShow=false;
         var self = this;
         var get_token =sessionStorage.getItem('token');
         var instance = this.$axios.create({
           headers: {'Content-Type':'application/json','x-access-token':get_token}
         });
         instance.post(process.env.API_HOST+'corp/',self.editItem)
           .then(function (response) {
             if(response.data.success){
               self.basicInfoData[key]=self.editItem[key];
             }
             self.editItem={};
           })
           .catch(function (error) {
             console.log(error);
           });
       }
     }
   },
    mounted(){
      if(sessionStorage.getItem('token')){
        var self = this;
        var get_token =sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'Content-Type':'application/json','x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/')
          .then(function (response) {
            self.basicInfoData=response.data.data;
            //console.log(self.basicInfoData.phone)
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
	#companyInfo ul{
		list-style: none;
		overflow: hidden;
		margin-left: 40px;
	}
	#companyInfo li{
		float: left;
		margin-bottom: 20px;
	}
	#companyInfo h2{
    font-size:20px;
		margin-bottom: 30px;
		font-family: "microsoft yahei";
	}
	#companyInfo .modify{
		margin-left: 20px;
		color: blue;
		cursor: pointer;
	}

	#editAddr,
	#editEmail,
	#editTel,
	#editPerson {
		position: fixed;
    	top: 0;
    	left: 0;
    	z-index: 100;
    	width: 100%;
    	height: 100%;
    	overflow: auto;
    	background:rgba(7,17,27,0.7);
	}
	#editAddrDetail,
	#editEmailDetail,
	#editTelDetail,
	#editPersonDetail {
		position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-top: -115px;
	    margin-left: -350px;
	    padding: 30px 0 0 40px;
	    width: 570px;
	    background-color: #fff;
	    box-sizing: border-box;
	}
  .is-pass{
    margin-top: -15px;
    margin-left: 170px;
    margin-bottom: 10px;
    color: #ff4949;
    font-size: 12px;
  }



</style>




































