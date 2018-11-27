<template>
  <div id="EmailModels">
    <el-dialog title="新建邮件模板" :visible.sync="newDialogVisible" width="30%">
      <el-form :model="newEmailModel" ref="newEmailModel">
        <el-form-item prop="title" label="邮件标题">
          <el-input v-model="newEmailModel.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="邮件内容">
          <el-input type="textarea" :rows="6" v-model="newEmailModel.content"></el-input>
        </el-form-item>
        <el-form-item prop="brief" label="模板简介">
          <el-input v-model="newEmailModel.brief"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @clcik="newModel">确认</el-button>
          <el-button type="primary">放弃</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="title-email-models">
      <span>管理邮件模板</span>

    </div>

    <div class="cant-models">
      <div class="cant-title">
        <span class="the-title">预留邮件模板</span>
        <!--<el-button size="small" type="primary" style="display: inline-block;float: right">新建模板</el-button>-->
        <el-button size="small" type="primary" style="display: inline-block;float: right;" @click="resetModels">重置模板</el-button>
      </div>
      <div class="cant-table">
        <el-table :data="modelDataCant" stripe style="width: 80%" border>
          <el-table-column prop="modelName" label="模板名称" width="160"></el-table-column>
          <el-table-column prop="modelBrief" label="用途"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="modifyModel(scope.$index)">修改</el-button>
              <el-button type="text" style="" @click="deleteModel(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="ano-models">
      <div class="cant-title">
        <span class="the-title">自定义邮件模板</span>
        <el-button size="small" type="primary" style="display: inline-block;float: right " @click="newDialogVisible=true">新建模板</el-button>
        <el-button size="small" type="primary" style="display: inline-block;float: right;margin-right: 10px;">清空模板</el-button>
      </div>
      <div class="cant-table">
        <el-table :data="modelDataCant" stripe style="width: 80%" border>
          <el-table-column prop="modelName" label="模板名称" width="160"></el-table-column>
          <el-table-column prop="modelBrief" label="用途"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="modifyModel(scope.$index)">修改</el-button>
              <el-button type="text" style="" @click="deleteModel(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EmailModels",
      data(){
          return{
            newEmailModel:{
              title:'',
              content:'',
              brief:''
            },
            newDialogVisible:false,
            modelDataCant:[
              {
                modelName:'dwjidw',
                modelBrief:'入驻时'
              }
            ],
            modelData:[
              {
                modelName:''
              }
            ]
          }
      },
      methods:{
        modifyModel(index){

        },
        deleteModel(index){

        },
        newModel(){
          // this.$data.modelDataCant.
        },
        resetModels(){

        }
      }
    }
</script>

<style scoped>
  .cant-title{
    width: 80%;
  }
  .the-title{
    font-size: 20px;
    font-weight: bold;
  }
  .cant-models{
    margin-top: 30px;
    margin-left: 30px;
  }
  .ano-models{
    margin-top: 100px;
    margin-left: 30px;

  }
  .title-email-models{
    font-size: 25px;
    margin-left: 30px;
    font-weight: bold;
  }
  .cant-table{
    margin-top: 10px;
  }
  .line{
    margin-top: 12px;
    width: 40vw;
    height: 3px;
    background-color: cornflowerblue;
    margin-left: 30px;
  }

</style>
