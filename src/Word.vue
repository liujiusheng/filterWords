<template>
  <div class="sources">
    <div style="text-align:right;">
      <el-button @click="showAddPane()" type="primary" size="mini" circle>添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="word" label="单词"></el-table-column> 
      <el-table-column prop="count" label="总出现次数"></el-table-column> 
      <el-table-column prop="markNum" label="总标记次数"></el-table-column> 
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">加入词库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"
      :current-page="pageNum" :page-size="pageSize"></el-pagination>
    </div>
    <el-dialog title="添加单词" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="单词">
          <el-input v-model="form.word"></el-input>
        </el-form-item>
        <el-form-item label="释意">
          <el-input placeholder="请输入释意" v-model="form.translation" class="input-with-select">
            <el-button slot="append" icon="el-icon-search">获取释意</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  components:{},
  data:function(){
    return {
      host:this.$store.state.host,
      tableData: [],
      total:0,
      pageSize:10,
      pageNum:1,
      loading:{},
      dialogVisible:false,
      form:{
        word:'',
        translation:''
      }
    };
  },
  created:function(){
    this.$bus.$on('changeMenu', tab => {
      if(tab == 'word'){
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
      this.$http.get(this.host+'getNewWord?'+'pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(result=>{
        let list = result.data.list;
        this.tableData = list;
        this.total = result.data.total;
      });
    },


    // 翻页
    handleCurrentChange:function(e){
      this.pageNum = e;
      this.loadWordsList();
    },


    // 显示添加单词页面
    showAddPane:function(){
      this.dialogVisible = true;
    },


    // 保存单词
    add:function(){
      let url = this.host+'addWordToStardict';
      let data = {
        word:this.form.word,
        translation:this.form.translation,
        id:this.form.id
      };
      this.$http.post(url,data).then(result=>{
        if(result.data==true){
          this.$message({message: '添加成功！',type: 'success'});
          this.dialogVisible = false;
          this.form.word = '';
          this.form.translation = '';
          this.form.id = '';
          this.loadWordsList();
        }else{
          this.$message({message: '添加失败！',type: 'error'});
        }
      });
    },


    // 打开单词编辑框
    handleEdit:function(index, row){
      console.log(row);
      this.form.word = row.word;
      this.form.translation = row.translation;
      this.form.id = row.id;
      this.dialogVisible = true;
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