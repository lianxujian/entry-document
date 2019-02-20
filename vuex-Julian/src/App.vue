<template>
  <div id="app">
    <img src="./assets/logo.png">
    <br>
    <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
    <br>
    <router-link to="/"><p style="color:orange;">点击进入hello首页</p></router-link>
    <router-link to="/hello1"><p style="color:red;">点击进入hello1</p></router-link>
    <router-view></router-view>
    <p> 我是App.vue中的p， gettersMsg 的值是----- {{gettersMsg}}</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
export default {
  name: 'app',
  computed:{...mapGetters(['gettersMsg'])}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  *{
    text-decoration: none;
  }
</style>
