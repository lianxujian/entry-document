<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.dialog{
    width:100%;
    height:100%;  
  }
  .mask{
    width:100%;
    height:100%;
    background:#000;
    position:absolute;
    left:0;
    top:0;
    opacity:.3;
    z-index:10;
  }
  .dialog-box{
    width:500px;
    height:320px;
    background:#fff;
    position:absolute;
    left:50%;
    top:50%;
    margin-top:-160px;
    margin-left:-250px;
    z-index:15;
  }
  .dialog-head{
    height:30px;
    line-height: 30px;
    padding-left:15px;
    background:#F3F3F3;
  }
  .dialog-head span{
    width:18px;
    height:18px;
    text-align:center;
    line-height:18px;
    border-radius:9px;
    border:1px solid #000;
    float:right;
    font-size:17px;
    margin:6px 15px;
    cursor: pointer;
  }
</style>
