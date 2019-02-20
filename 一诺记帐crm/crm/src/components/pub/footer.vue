<template>
  <div>
  <div class="footer">
        <p> @2014-2017 一诺记账</p>
  </div>
  </div>
</template>
<script>
  export default {
    props: {
    },
    data() {
      return {

      };
    },
    methods: {

    }
  };
</script>
<style>
  .footer{
    height:120px;
    background: #eee;
    width: 100%;
    /*display:-webkit-flex;*/
    position: relative;
    margin:-64px auto 0 auto;
    overflow: hidden;
  }
  .footer p{
    width:100%;
    text-align:center;
    margin-top:50px;
    color:#aaa;
  }
</style>
