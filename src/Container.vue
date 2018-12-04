<template>
  <el-row type="flex" class="container">
    <el-col :span="3" :offset="3" class="logo">
      <el-menu default-active="1">
        <el-menu-item index="1" @click="changePart('review')"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 记单词</el-menu-item>
        <el-menu-item index="3" @click="changePart('dictionary')"><i class="fa fa-database" aria-hidden="true"></i> 单词本</el-menu-item>
        <el-menu-item index="4" @click="changePart('source')"><i class="fa fa-link" aria-hidden="true"></i> 数据源</el-menu-item>
        <el-menu-item v-if="userInfo.usertype===1" index="2" @click="changePart('word')"><i class="fa fa-list" aria-hidden="true"></i> 词库管理</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="15" class="content">
      <Review v-show="part == 'review'"></Review>
      <Sources v-show="part=='source'"></Sources>
      <Dictionary v-show="part=='dictionary'"></Dictionary>
      <Word v-show="part=='word'"></Word>
    </el-col>
  </el-row>
</template>

<script>
import Sources from './Sources.vue';
import Dictionary from './Dictionary.vue';
import Review from './Review.vue';
import Word from './Word.vue';
export default {
  components:{Sources, Dictionary, Review, Word},
  data:function(){
    return {
      host:this.$store.state.host,
      part:'review'
    };
  },
  created:function(){
    var vm = this;

    this.$bus.$on('changeMenu',function (tab) {
      
    });
  },
  beforeMount:function(){
      let userInfo = sessionStorage.getItem('userInfo');
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        this.$store.commit('saveUserInfo',userInfo); 
      }else{
        // this.$store.commit('saveUserInfo', {}); 
        this.$router.push('/Login');
      }
  },
  mounted:function(){
    this.changePart('review');
  },
  computed:{
    userInfo:function() {
      return this.$store.state.userInfo;
    }
  },
  methods:{
  
  
    //切换模块
    changePart:function(value){
      this.part = value;
      this.$bus.$emit('changeMenu', value);
    }
  }
}
</script>

<style>
.container {
  
}
.container .content{background:rgba(238,238,238,0.6);min-height:700px;}
</style>