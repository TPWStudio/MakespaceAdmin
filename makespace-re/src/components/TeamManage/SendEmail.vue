<template>
    <div id="SendEmail">
      <div class="title4email">
        <span>发送邮件</span>
      </div>
      <div class="chooseTeams">
        <span style="font-weight: bold">选择发送的团队：</span>
        <div class="transfer">
          <el-transfer v-model="value1"
                     :data="value2"
                     :titles="['团队列表', '发送列表']"></el-transfer>
        </div>
      </div>
      <div class="writeEmails">
        <div class="chooseModels">
          <span>选择模板：</span>
          <el-select v-model="choseModels" placeholder="请选择" @change="changeModel">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.modelName"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="emailTitle">
          <span>邮件标题：</span>
          <el-input v-model="sendTitle"></el-input>
        </div>
        <div class="emailContent">
          <span>邮件内容：</span>
          <el-input type="textarea" :rows="10" v-model="sendContent"></el-input>
        </div>
      </div>
      <div class="buttonPlains">
        <el-button type="danger">确认发送</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SendEmail",
      data(){
          return {
            choseModels:'',
            models:[
              {
                title:'亲爱的创客空间的朋友',
                content:'您好！我们预定于XXXX举办XXXX'
              },
              {
                title:'多好玩杜瓦的虎娃',
                content:'dwjidhauwufawhuaowdjawodjwad\ndwagdygawdya'
              }
            ],
            options:[
              {
                modelName:'模板一',
                value:0
              },
              {
                modelName:'模板二',
                value:1
              }
            ],
            value2:[{
              key:2,
              label:'231',
              value:2
            },
              {
                key:3,
                label:'232',
                value:3
              }],
            value1: [],
            sendTitle:'',
            sendContent:''
          };
      },
      methods:{
          changeModel(value){
            this.$data.sendTitle=this.$data.models[value].title;
            this.$data.sendContent=this.$data.models[value].content;
          }
      }
    }
</script>

<style scoped>
  #SendEmail{
    margin-left:30px;
    /*width: ;*/
  }
  .chooseModels{
    /*font-size: 28px;*/
    font-weight: bold;
  }
  .chooseTeams{
    margin-top: 30px;
  }
  .title4email{
  font-size: 28px;
  font-weight: bold;
  }
  .writeEmails{
    margin-top: 30px;
  }
  .emailContent{
    margin-top: 20px;
    font-weight: bold;
    width: 600px;
  }
  .buttonPlains{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .transfer{
    margin-top: 10px;

  }
  .emailTitle{
    font-weight: bold;
    width:600px;
    margin-top: 30px;
  }
</style>
