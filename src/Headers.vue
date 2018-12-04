<template>
  <el-row type="flex" class="headers">
    <el-col :span="6" :offset="3" class="logo">程序员的单词本</el-col>
    <el-col :span="1" :offset="13" class="setting">
      <!-- <i class="fa fa-bell" aria-hidden="true"></i>  -->
      <span @click="logout">{{userInfo.username}}</span>
    </el-col>
  </el-row>
</template>

<script>

export default {
  components:{},
  data:function(){
    return {
      host:this.$store.state.host
    };
  },
  computed:{
    userInfo:function(){
      return this.$store.state.userInfo;
    }
  },
  created:function(){
    var vm = this;

    this.$bus.$on('changeMenu',function (tab) {
      
    });
  },
  beforeMount:function(){
      
  },
  mounted:function(){
    
  },
  methods:{
    

    // 退出
    logout:function(){
      this.$http.get(this.host+'logout').then(result=>{
        this.$router.push('/Login');
      });
    }
  }
}
</script>

<style>
.headers {
  height:40px;
  line-height:40px;
  background: #1daff9;
  color:white;
}
.headers .logo{font-size:24px;}
.headers .setting{text-align:center;}
.headers .setting:hover{background:#0093DD;cursor:pointer;}
</style>