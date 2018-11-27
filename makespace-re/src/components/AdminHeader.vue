<template>
  <div id="Header">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="height: 80px;">
    <el-menu-item index="1" style="width: 450px;">
      <img src="../assets/logo.png" style="height: 80px;width: 400px"/>
    </el-menu-item>
  </el-menu>
  <div class="dialog">
    <!--登录对话框-->
    <el-dialog class="dialog4login"  :visible.sync="dialogVisible" width="25%" :lock-scroll="false" :append-to-body="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="title">
        <p style="font-size: 35px;font-weight: bold;">请登录您的账号</p>
      </div>
      <div style="height:20px"></div>
      <div class="form4login">
        <el-form :model="formLogin" ref="formLogin" :rules="rulesLogin">
          <el-form-item prop="username">
            <el-input v-model="formLogin.username" style="width: 78%" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item prop="password" >
            <el-input type="password" v-model="formLogin.password" style="width: 78%" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button @click="LogIn" class="button4login" style="font-weight: bold" round >登录<i style="font-weight: bold" class="el-icon-check"/></el-button>
            <el-button class="button4cancel" round style="font-weight: bold">找回密码<i style="font-weight: bold" class="el-icon-refresh"/></el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
    export default {
        name: "AdminHeader",
      data(){
          return{
            rulesLogin:{
              username:[
                {required:true,trigger:'blur',message:'请输入账号'}
              ],
              password:[
                {required:true,trigger:'change',message:'请输入密码'}
              ]
            },
            formLogin:{
              username:'',
              password:''
            },
            dialogVisible:false,
          }
      },
      methods:{
          LogIn(){

            let date=new Date();
            let year=date.getFullYear();
            let month=date.getMonth();
            let day=date.getDate();
            if(month>'0'&&month<='9'){
              month='0'+month
            }
            if(day>'0'&&day<='9'){
              day='0'+day
            }
            date=year+'-'+month+'-'+day;

            let _this=this;
            this.$axios({
              method:'get',
              url:'/adm/login',
              params:{
                account:this.$data.formLogin.username,
                code:this.$data.formLogin.password,
                date:date
              }
            }).then(function (response) {
              // if(response.data===10){
              console.log('111');
                _this.$data.dialogVisible=false;
                _this.$message({
                  type:'success',
                  message:'登录成功！'
                })
              // }else{
              //   _this.$message({
              //     type:'error',
              //     message:'登录失败！请检查密码'
              //   })
              // }
            })
          }
      }
    }
</script>

<style lang="less">

  #Header {

    .button4cancel {
      border-color: #182f63;
      background-color: white;
      border-width: 1.7px;
      width: 25%;
      color: #182f63;
      transition: all 0.7s;
    }
    .button4cancel:hover {
      border-color: #182f63;
      background-color: white;
      border-width: 1.7px;
      transform: scale(1.05);
      color: #182f63;
    }

    .button4login {
      border-color: #182f63;
      background-color: white;
      border-width: 1.7px;
      width: 20%;
      color: #182f63;
      transition: all 0.7s;
    }
    .button4login:hover {
      border-color: #182f63;
      background-color: white;
      font-weight: bold;
      transform: scale(1.05);
      color: #182f63;
    }

    .el-input__inner {
      font-size: 18px;
      height: 40px;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom-color: #182f63;
      border-bottom-width: 1.7px;
      transition: all 0.7s;
    }

    .el-input__inner:focus {
      border-bottom-color: #182f63;
      transform: scale(1.05);
    }
  }

</style>
