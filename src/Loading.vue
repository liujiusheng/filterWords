<template>
<div v-if="loading" :style="{'left':left+'px'}" class="loading" title="加载中...">
    <img class="loadingimg" src="../images/loading.gif">
</div>  
</template>
<script>
export default {
  data() {
      return {
        left:window.innerWidth/2
      };
    },
    computed:{
      loading:function(){
        return this.$store.state.loading;
      }
    },
    methods:{
      
    }
}
</script>
<style>
  .loading{position:fixed;top:45%;width:100px;height:80px;line-height:80px;font-size:12px;color:white;text-align:center;border-radius:5px;background:rgba(0,0,0,0.3);}
  .loading .loadingimg{width:60px;height:60px;margin-top:10px;}
</style>
