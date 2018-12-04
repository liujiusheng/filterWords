<template>
  <div class="sources">
    <div v-if="tableData.length>0">
      <div style="font-size:20px;text-align:right;">第 <font color="red">{{currentWordIndex+1}}/{{tableData.length}}</font> 个</div>
      <div style="font-size:60px;text-align:center;height:200px;">{{tableData[currentWordIndex].word}}</div>
      <div  v-show="!showTranslate" style="text-align:center;height:100px;">
        <el-button @click="next()" type="success" round>显示释义 &nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></el-button>
      </div>
      <div v-show="showTranslate">
        <div style="height:100px;padding:5px 20px;text-align:center;background:white;margin:5px 50px;">
          {{tableData[currentWordIndex].translation}}
        </div>
        <div style="height:100px;text-align:center;">
          <el-button @click="remembered(tableData[currentWordIndex].id)" type="primary" round><i class="fa fa-check" aria-hidden="true"></i> 已记住</el-button>
          <el-button @click="forget(tableData[currentWordIndex].id)" type="danger" round><i class="fa fa-times" aria-hidden="true"></i> 已忘记</el-button>
        </div>
      </div>
    </div>
    <div v-else style="text-align:center;padding-top:20px;">
      还没有单词！
    </div>
  </div>
</template>

<script>

export default {
  components:{},
  data:function(){
    return {
      host:this.$store.state.host,
      tableData: [],
      showTranslate:false,
      currentWordIndex:0
    };
  },
  created:function(){
    this.$bus.$on('changeMenu', tab => {
      if(tab == 'review'){
        this.currentWordIndex = 0;
        this.showTranslate = false;
        this.loadWordsList();
      }
    });
  },
  beforeMount:function(){
      
  },
  mounted:function(){
    
  },
  methods:{


    // 加载单词列表
    loadWordsList:function(){
      this.$http.get(this.host+'loadWordsNeedRemember').then(result=>{
        this.tableData = result.data;
      });
    },


    // 已记住
    remembered:function(id){
      this.showTranslate = false;
      let data = {
        id:id
      };
      this.$http.post(this.host+'remembered',data).then(result=>{
        if(this.currentWordIndex+1==this.tableData.length){
          this.$message.error('没有更多单词了！');
          return;
        }
        this.currentWordIndex ++;
      });
    },


    // 已忘记
    forget:function(id){
      this.showTranslate = false;
      let data = {
        id:id
      };
      this.$http.post(this.host+'forget',data).then(result=>{
        if(this.currentWordIndex+1==this.tableData.length){
          this.$message.error('没有更多单词了！');
          return;
        }
        this.currentWordIndex ++;
      });
    },


    // 显示释义
    next:function(){
      this.showTranslate = true;
    }


  }
}
</script>

<style>
.sources {
  
}
/* .sources .page{text-align:center;margin:5px 0;} */
.mark{color:#f7ba2a;cursor:pointer;}
</style>