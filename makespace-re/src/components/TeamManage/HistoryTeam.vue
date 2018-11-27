<template>
  <div id="teamHistory">
    <div class="team4wow">
      <div class="animated bounceInUp">
      <div class="team4now4title"><p style="text-align: left;font-size: 40px;font-weight: bold">历史团队</p></div>
      <div class="buttons4now">
        <el-button-group class="button4display" style="border-width: 3px;">
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">团队总数量</el-button>
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">{{allNumber}}</el-button>
        </el-button-group>
        <el-button-group class="button4display" style="border-width: 3px;">
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">已结项队伍</el-button>
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">{{allNumber}}</el-button>
        </el-button-group>
        <el-button-group class="button4display" style="border-width: 3px;">
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">指导老师</el-button>
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">{{allNumber}}</el-button>
        </el-button-group>
      </div>
      <div class="searchInput" style="margin-top: 30px;width: 80%">
        <el-input class="input1" style="width: 70%;border-color: #182f63" v-model="searchName" placeholder="请输入团队名"></el-input>
        <el-button style="width: 10%;color: white;background-color: #182f63">搜索</el-button>
      </div>
      <div style="height:20px;"></div>
      <div class="team4now">
        <el-table :data="tableData" border stripe class="table4nowteam" style="width:80%;">
          <el-table-column prop="teamName" fixed label="项目名称" width="200">
          </el-table-column>
          <el-table-column prop="teamTeacher" label="指导老师" width="200">
          </el-table-column>
          <el-table-column prop="teamCaptain" label="项目负责人" width="200">
          </el-table-column>
          <el-table-column prop="teamSchool" label="所在学院" width="200">
          </el-table-column>
          <el-table-column prop="startDate" label="起始日期" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button class="button4table" @click="seeMore">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="height: 20px;"></div>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TeamManage",
    data(){
      return{
        searchName:'',
        allNumber:15,
        tableData:[
          {
            teamId:'1',
            teamSchool:'软件学院',
            teamName:'演武创客空间',
            teamCaptain:'任剑鹏',
            startDate:'2015-4-1',
            teamTeacher:'罗斌'
          },
          {
            teamId:'2',
            teamSchool:'软件学院',
            teamName:'基于VR的演讲训练平台',
            teamCaptain:'王圣哲',
            startDate:'2015-4-1',
            teamTeacher:'吴清锋'
          },
          {
            teamId:'1',
            teamSchool:'软件学院',
            teamName:'演武创客空间',
            teamCaptain:'任剑鹏',
            startDate:'2016-5-2',
            teamTeacher:'罗斌'
          },
          {
            teamId:'2',
            teamSchool:'软件学院',
            teamName:'基于VR的演讲训练平台',
            teamCaptain:'王圣哲',
            startDate:'2016-9-5',
            teamTeacher:'吴清锋'
          }
        ]
      }
    },
    methods:{
      seeMore(){
        this.$router.push({path:'/teamInfo'});
      }
    }
  }
</script>

<style lang="less">
  #teamHistory{

    .el-input__inner{
      border-width: 1.5px;
      border-color: #182f63;

    }

    .table4nowteam{
      border-top-color: #182f63;
      border-top-width: 4px;
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
