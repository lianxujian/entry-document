<template>
  <div id="home">
   	home页
  </div>
</template>

<script>

import axios from "axios"		//本项目必须子页面引

export default {
  name: 'app',
  data () {
    return {
      	
    }
  },
  mounted:function(){		//加载完成后执行
  	/*this.$http.get("./src/data/test.json").then(function(res){
  		console.log(res.body)
  	},function(err){
  		console.log(err)
  	})*/
  	axios.get("./src/data/test.json").then(function(res){
  		console.log(res.data)
  	},function(err){
  		console.log(err)
  	})
  }
}
</script>

<style lang="scss" scoped>

</style>