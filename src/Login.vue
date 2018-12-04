<template>
<div class="login" :style="{height:loginHeight}">
  <div style="background:rgba(0,0,0,0.5);width:100%;" :style="{height:loginHeight}">
  <div style="width:800px;height:240px;margin:0 auto;position: absolute;left: 50%;top: 50%;margin-top: -220px;margin-left: -300px;">
    <div class="banner">
    study hard and make progress every day.
    </div>
    <div style="float:left;width:220px;margin-left:40px;margin-top:40px;">
      <input v-model="ruleForm.name" type="text" class="input" placeholder="请输入用户名">
      <input v-model="ruleForm.pass" type="password" class="input" placeholder="请输入密码">
      <button @click="Login" class="submit">登 录</button>
    </div>
  </div>
  <div style="position:fixed;bottom:5px;left:0;width:100%;font-size:20px;color:white;text-align:right;">
    提取英文在线文档的单词，花最少的时间，学最有用的词。
  </div>
  </div>
</div>  
</template>
<script>
export default {
  data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'));
        } 
      };
      return {
        ruleForm: {
          pass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        },
        loginHeight:window.innerHeight +'px',
        host:this.$store.state.host,
      };
    },
    methods: {
      Login:function() {
          let vm = this
          let url = this.host+'login'
          let data = {
            username:this.ruleForm.name,
            password:this.ruleForm.pass
          };
          this.$http.post(url,data).then(function(result){
            if(result.data){
              const userInfo = result.data;
              sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
              vm.$router.push('/Main');
            }else{
              vm.$message({message: '用户名或密码错误！',type: 'error'});
            }
          });
      }
    }
}
</script>
<style>
    .login{width:100%;background:rgba(80,183,228,1);background:url('../images/background2.jpg') 100%; overflow:hidden;}/**/
    .login .banner{width:300px;color:white;font-size:40px;font-weight:bold;float:left;}
    .login .input{width:300px;height:35px;border:none;border-radius: 3px;padding:2px 5px;margin-bottom:15px;}
    .login .submit{width:300px;height:35px;border:none;border-radius: 3px;padding:2px 5px;background:#0093DD;color:white;font-size:15px;font-weight:bold;}
    .login .submit:hover{cursor:pointer;background:#0076BC;}
</style>
