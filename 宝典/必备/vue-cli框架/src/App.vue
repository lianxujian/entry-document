<template>
  <div id="app">
   <div class="nav">
     <router-link to="/home">主页</router-link>
     <router-link to="/news">新闻</router-link>
   </div>
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    } 
  }
}
</script>

<style lang="scss">
  #app{
    .nav{
      background:lightblue;
    }
  }
</style>
