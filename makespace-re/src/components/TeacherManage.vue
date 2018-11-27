<template>
  <div id="TeacherManage">
    <div class="team4wow">
      <div class="team4now4title"><p style="text-align: left;font-size: 40px;font-weight: bold">导师管理</p></div>
      <div class="buttons">
        <el-button style="background-color: white;border: 1.7px solid #182F63;color: #182F63;font-weight: 500" @click="dialogVisible=true">新增</el-button>
      </div>
      <div class="searchInput" style="margin-top: 30px;width: 80%">
        <el-input class="input1" style="width: 70%;border-color: #182f63" v-model="searchName" placeholder="请输入导师"></el-input>
        <el-button style="width: 10%;color: white;background-color: #182f63">搜索</el-button>
      </div>
      <div style="height: 30px;"></div>
      <div class="team4now">
        <el-table :data="tableData" border stripe class="table4nowteam" style="width:80%">
          <el-table-column prop="teacherName" fixed label="导师姓名" width="200">
          </el-table-column>
          <el-table-column prop="teacherNo" label="导师工号" width="200">
          </el-table-column>
          <el-table-column prop="teacherTitle" label="职称" width="200">
          </el-table-column>
          <el-table-column prop="teacherSchool" label="所在学院" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button class="button4table" @click="delTeacher(scope.$index)">删除</el-button>
              <el-button class="button4table">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height: 20px;"></div>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="AddDialog">
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div class="title4dialog">
          <span style="font-size: 32px;font-weight: bold">添加导师</span>

          <el-form :model="formAddTeacher" style="margin-top: 40px;" :rules="rulesAddTeacher" ref="formAddTeacher">
            <el-form-item prop="teacherName">
              <el-input v-model="formAddTeacher.teacherName" style="width: 50%" placeholder="请输入导师姓名"></el-input>
            </el-form-item>
            <el-form-item prop="teacherNo" title="工号">
              <el-input v-model="formAddTeacher.teacherNo" style="width: 50%" placeholder="请输入工号"></el-input>
            </el-form-item>
            <el-form-item prop="teacherTitle" title="职称">
              <el-input v-model="formAddTeacher.teacherTitle" style="width: 50%" placeholder="请输入职称"></el-input>
            </el-form-item>
            <el-form-item prop="teacherSchool" title="所在学院">
              <el-input v-model="formAddTeacher.teacherSchool" style="width: 50%" placeholder="请输入所在学院"></el-input>
            </el-form-item>
            <el-form-item>
              <template slot-scope="scope">
                <el-button @click="addTeacher('formAddTeacher')" style="background-color: white;color: #182F63;border: 1.7px solid #182f63;width: 110px;">确定</el-button>
                <el-button @click="cancelAdd" style="background-color: white;color: #182F63;border: 1.7px solid #182f63;width:110px;">取消</el-button>
              </template>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TeacherManage",
    data(){
      return{
        dialogVisible:false,
        allNumber:15,
        tableData:[
          {
            id:'',
            teacherName:'张三',
            teacherNo:'10025',
            teacherTitle:'教授',
            teacherSchool:'软件学院 ',
          },
        ],
        formAddTeacher:{
          teacherName:'',
          teacherTitle:'',
          teacherNo:'',
          teacherSchool:''
        },
        rulesAddTeacher:{
          teacherName:[
            {required:true,message:'请输入导师姓名',trigger:'change'}
          ],
          teacherNo:[
            {required:true,message:'请输入工号',trigger:'change'}
          ],
          teacherTitle:[
            {required:true,message:'请输入职称',trigger:'change'}
          ],
          teacherSchool:[
            {required:true,message:'请输入所在学院',trigger:'change'}
          ]
        }
      }
    },
    methods:{
      seeMore(){
        this.$router.push({path:'/teamInfo'});
      },
      delTeacher(index){
        this.$data.tableData.splice(index,1);
      },
      addTeacher(formName){
        let _this=this;

        this.$refs[formName].validate((valid)=>{
          if(valid){
            _this.$data.tableData.push(_this.$data.formAddTeacher);
            _this.$data.formAddTeacher.teacherSchool='';
            _this.$data.formAddTeacher.teacherTitle='';
            _this.$data.formAddTeacher.teacherNo='';
            _this.$data.formAddTeacher.teacherName='';
            _this.$data.dialogVisible=false;
            _this.$data.dialogVisible=false;
          }else{
            _this.$message({
              type:'error',
              message:'有的地方输入错误了哦'
            })
          }
        })

      },
      cancelAdd(){
        this.$data.formAddTeacher.teacherSchool='';
        this.$data.formAddTeacher.teacherTitle='';
        this.$data.formAddTeacher.teacherNo='';
        this.$data.formAddTeacher.teacherName='';
        this.$data.dialogVisible=false;
      }
    }
  }
</script>

<style lang="less">
  #TeacherManage{
    .table4nowteam{
      border-top-color: #182f63;
      border-top-width: 4px;
    }


    .input1__inner{
      border-color: #182f63;
      border-width: 1.5px;
    }

    .button4table{
      background-color: white;
      color: #182f63;
      border-color: #182f63;
    }


    .el-table__body {
      font-size: 15px;
      .el-table__row {
        background: #F6F7FB;
      }
      .el-table__row--striped {
        background: #ffffff !important;
        td {
          background: #ffffff !important;
        }
      }
    }


  }


</style>
