<template>
  <div id="full">
      <Loading></Loading>
      <Headers></Headers>
      <Container></Container>
  </div>

</template>

<script>
import Loading from './Loading.vue'
import Headers from './Headers.vue'
import Container from './Container.vue'
export default {
  components:{Loading,Headers,Container},
  data:function(){
    return {
	
    };
  },
  created:function(){
  },
  mounted:function(){
    
    
  }
}
</script>

<style>
*{padding:0;margin:0;box-sizing:border-box}
</style>
