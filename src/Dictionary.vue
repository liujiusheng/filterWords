<template>
  <div class="sources">
    <div style="text-align:right;">
      <el-button @click="showAddPane()" type="primary" size="mini" circle>添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="word" label="单词"></el-table-column> 
      <el-table-column prop="translation" label="中文释意"></el-table-column> 
      <el-table-column prop="markNum" label="标记次数"></el-table-column> 
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-show="scope.row.state==1" @click="toogleState(scope.$index, scope.row)" title="点击移除单词学习计划" :class="{mark:scope.row.state==1}" class="star"><i class="fa fa-star" aria-hidden="true"></i></span>
          <span v-show="scope.row.state==0" @click="toogleState(scope.$index, scope.row)" title="点击加入单词学习计划" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></span>
        </template>  
      </el-table-column> 
      <el-table-column label="进度">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.rememberState"></el-progress>
        </template>  
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      if(tab == 'dictionary'){
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
      this.$http.get(this.host+'loadWordsList?'+'pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(result=>{
        let list = result.data.list;
        list.map(i=>{
          i.rememberState = parseInt((i.rememberNum-i.forgetNum)/24*100);
        });
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
      let url = this.host+'addWord';
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


    //删除单词
    handleDelete:function(index, row){
      this.$http.get(this.host+'deleteWord?id='+row.id).then(result=>{
        if(result.data === true) {
          const table = this.tableData;
          let newTable = [];
          for(const i in table) {
            if (table[i].id !== row.id) {
              newTable.push(table[i]);
            }
          }
          this.tableData = newTable;
        }
      });
    },


    // 打开单词编辑框
    handleEdit:function(index, row){
      this.form.word = row.word;
      this.form.translation = row.translation;
      this.form.id = row.id;
      this.dialogVisible = true;
    },


    // 切换单词加入记忆列表
    toogleState:function(index, row) {
      console.log(index, row);
      const newState = row.state===0?1:0;
      this.$http.get(this.host+'toogleState?id='+row.id+'&state='+newState).then(result=>{
        this.tableData[index].state = newState;
      });
    }

  }
}
</script>

<style>
.sources {
  
}
/* .sources .page{text-align:center;margin:5px 0;} */
.mark{color:#f7ba2a;}
.star{cursor:pointer;}
</style>