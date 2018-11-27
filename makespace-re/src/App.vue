<template>
  <div id="app">
    <div id="header" style="width: 100%;">
      <admin-header></admin-header>
    </div>
    <div style="width: 80%;margin: 0 auto;height: 100%;vertical-align: top;">
    <div v-bind:style="'display: inline-block;width: 15%;position:relative;height:'+(height+20)+'px'">
      <admin-menu></admin-menu>
    </div>
    <div style="display:inline-block;margin:0;width: 84%;height: 80%;">
       <router-view v-bind:style="'box-shadow: 5px 5px 5px #888888;background: #ffffff;margin-top:20px;overflow-y:auto;height:'+height+'px'" />
    </div>
  </div>
    <div style="width: 1200px;margin-right: auto;margin-left: auto">
    <el-dialog :show-close="false" :visible.sync="dialogVisible" style="width: 50%;margin-left: auto;margin-right: auto" title="管理员登录" center :close-on-click-modal="false">
      <el-form :model="formLogin" :rules="rulesLogin">
        <el-form-item prop="username" label="用户名：" label-width="80px">
          <el-input v-model="formLogin.username" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：" label-width="80px">
          <el-input v-model="formLogin.password" type="password" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="margin-right: auto;margin-left: auto;width: 100px;">
          <el-button type="primary" @click="Login">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import AdminMenu from './components/Menu/AdminMenu'
  import AdminHeader from '../src/components/AdminHeader'
export default {
    data() {
      return {
        rulesLogin:{
          username:[
            {required:true,message:'请输入用户名',trigger:'change'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'change'}
          ]
        },
        formLogin:{
          username:'',
          password:''
        },
        dialogVisible:true,
        height:'',
        isLogin:false,
      };
    },
    methods: {
      Login(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/adm/login',
          params:{
            username:this.$data.formLogin.username,
            password:this.$data.formLogin.password
          }
        }).then(function (response) {
          if(response.data!==-1){
            _this.$data.dialogVisible=false;
            _this.$message({
              type:'success',
              message:'登录成功！'
            })
            _this.$data.isLogin=true;
          }else{
            _this.$message({
              type:'error',
              message:'登录失败！'
            })
          }
        }).catch((err)=>{
          _this.$message({
            type:'error',
            message:'登录失败！'
          })
        })
      }

    },
  mounted(){
    let _this=this;
    _this.$data.height = window.innerHeight - 110;
    window.onresize = function temp() {
      _this.$data.height = window.innerHeight - 110;
      console.log(_this.$data.height)
    };

  if(this.$data.isLogin===true) {
    let _this = this
    this.$axios({
      method: 'get',
      url: 'http://59.77.7.25:8080/formalTeam/getSeatWithoutStu'
    }).then(function (response) {
      console.log(response);
    })
  }



  },
  components:{
      AdminMenu,
    AdminHeader
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
