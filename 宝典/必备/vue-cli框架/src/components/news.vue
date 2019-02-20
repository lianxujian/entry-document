<template>
  <div id="news">
   news页
   <ul>
   	<li><router-link to="/news/news1">新闻1</router-link></li>
   	<li><router-link to="/news/news2">新闻2</router-link></li>
   </ul>
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

</style>