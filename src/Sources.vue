<template>
  <div class="sources">
    <div style="text-align:right;">
      <el-button @click="showAddPane()" type="primary" size="mini" circle>添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="链接名称"></el-table-column> 
      <el-table-column prop="links" label="链接地址"><template slot-scope="scope"><a :href="scope.row.links" target="_blank">{{scope.row.links}}</a></template></el-table-column> 
      <el-table-column prop="createTime" label="最后提取日期">
        <template slot-scope="scope">
          {{scope.row.createTime.slice(0,10)}}  
        </template>  
      </el-table-column> 
      <el-table-column label="操作" width="310">
        <template slot-scope="scope">
          <!-- <div v-show="loading[scope.$index]" title="提取中..." style="width:15px;display:inline-block;"><i class="el-icon-loading"></i> </div> -->
          <!-- <el-button size="mini" type="info" @click="fetchSource(scope.$index,scope.row.links,1)">{{loading[scope.$index]?'提取中...':'整站提取'}}</el-button> -->
          <el-button size="mini" type="info" @click="fetchSource(scope.$index,scope.row.links,0)" :loading="loading[scope.$index]">{{loading[scope.$index]?'提取中...':'单页提取'}}</el-button>
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <!-- <el-button size="mini" type="info" @click="wordList(scope.$index, scope.row)" title="单词本"><i class="fa fa-file-text-o" aria-hidden="true"></i></el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"
      :current-page="pageNum" :page-size="pageSize"></el-pagination>
    </div>
    <el-dialog title="添加资源" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="链接名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="form.links"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="单词列表" :visible.sync="wordListdialogVisible" width="30%">
      <div style="text-align: center">
        <el-transfer v-model="wordListSelected" :titles="['所有单词', '保存到字典']" :data="wordList" style="text-align: left; display: inline-block;"></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wordListdialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="saveWord()">保 存</el-button>
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
        name:'',
        links:''
      },
      wordListdialogVisible:false,//单词列表显示
      wordListCache:[],// 单词缓存
      wordList:[],//所有单词
      wordListSelected:[],//选中单词
    };
  },
  created:function(){
    this.$bus.$on('changeMenu',tab => {
      if(tab == 'source'){
        this.loadSource();
      }
    });
  },
  beforeMount:function(){
      
  },
  mounted:function(){
    
  },
  methods:{


    // 加载资源列表
    loadSource:function(){
      this.$http.get(this.host+'loadSource?'+'pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(result=>{
        this.tableData = result.data.list;
        this.total = result.data.total;
      });
    },


    //提取数据
    fetchSource:function(index, links, fetchType){
      this.$set(this.loading, index, true);
      this.$http.get(this.host+'?url='+links+'&type='+fetchType).then(result=>{
          const data = result.data;
          this.wordListCache = data;
          let newData = [];
          for(let i in data){
            newData.push({
              key: i,
              label: i+'('+data[i]+'次)'
            });
          }
          this.wordList = newData;
          this.$set(this.loading, index, false);
          this.wordListdialogVisible = true;
      },error=>{
        this.$set(this.loading, index, false);
      });
    },


    //翻页
    handleCurrentChange:function(e){
      this.pageNum = e;
      this.loadSource();
    },


    //显示添加面板
    showAddPane:function(){
      this.dialogVisible = true;
    },


    // 打开编辑面板
    handleEdit: function(index, row) {
      this.form = row;
      this.dialogVisible = true;
    },


    //添加资源
    add:function(){
      if(this.form.id){
        this.$http.get(this.host+'updateSource?name='+this.form.name+'&links='+this.form.links+'&id='+this.form.id).then(result=>{
          this.dialogVisible = false;
          this.form.name = '';
          this.form.links = '';
          this.loadSource();
        });
      }else{
        this.$http.get(this.host+'addSource?name='+this.form.name+'&links='+this.form.links).then(result=>{
          this.dialogVisible = false;
          this.form.name = '';
          this.form.links = '';
          this.loadSource();
        });
      }
    },


    // 保存单词
    saveWord:function(){
      let newWords = {};
      for(const i in this.wordListSelected){
        newWords[this.wordListSelected[i]] = this.wordListCache[this.wordListSelected[i]];
      }
      this.$http.post(this.host+'saveWord',newWords).then(result=>{
        this.$message({
          message: '保存成功！',
          type: 'success'
        });
      });
    },


    // 获取单词列表
    handleDelete:function (index, row){
      this.$http.get(this.host+'deleteSource?id='+row.id).then(result=>{
        if(result.data === true) {
          const table = this.tableData;
          let newTable = [];
          for (const i in table) {
            if (table[i].id !== row.id) {
              newTable.push(table[i]);
            }
          }
          this.tableData = newTable;
        }
      });
    }
  }
}
</script>

<style>
.sources {
  
}
.sources .page{text-align:center;margin:5px 0;}
.sources .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }

.sources .el-transfer-panel {
  width: 500px;
}

.sources .el-transfer-panel__body {
  height: 500px;
}

.sources .el-transfer-panel__list.is-filterable {
  height: 468px;
}
</style>