<template>
  <div style="color:red;border:1px solid #ccc;width: 500px;margin:0 auto;">
    <p>我是Hello1.vue</p>
    <button @click="changeMsg">点我改变数据</button>
    <p>gettersMsg数据目前是: {{ gettersMsg }}</p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';


export default {
    name:'Hello1',
    data:function () {
    return {}
  },
  computed: {
    //...mapGetters(['gettersMsg'])
    gettersMsg(){
     return this.$store.getters.gettersMsg;
    }
  },
  //对应getters.技术中的gettersMsg
  methods: {
    //...mapActions(['changeMsg'])
    changeMsg(){
      this.$store.dispatch('changeMsg',{msg:'lianxujian'})
    }
  },
  mounted(){
    console.log(this.$store.getters)
  }
  //对应 Actions中changeMsg方法|| 映射this.changeMsg() 为 this.$store.dispatch('changeMsg')
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
</style>
