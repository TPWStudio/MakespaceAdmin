<template>
  <div id="teamManage">
    <div class="team4wow">
      <div class="animated bounceInRight">
      <div class="team4now4title"><p style="text-align: left;font-size: 40px;font-weight: bold">运行团队</p></div>
      <div class="buttons4now">
        <el-button-group class="button4display" style="border-width: 3px;">
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">团队数量</el-button>
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
        <el-button-group class="button4display" style="border-width: 3px;">
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">有新消息</el-button>
          <el-button style="color: #182f63;background-color: white;border-color: #182f63;">{{allNumber}}</el-button>
        </el-button-group>
      </div>
      <div class="searchInput" style="margin-top: 30px;width: 80%">
        <el-input class="input1" style="width: 70%;border-color: #182f63" v-model="searchName" placeholder="请输入团队名"></el-input>
        <el-button style="width: 10%;color: white;background-color: #182f63">搜索</el-button>
      </div>
      <div style="height:20px;"></div>
      <div class="team4now">
        <el-table :data="tableData" border stripe class="table4nowteam" style="width:80%" v-loading="loading">
          <el-table-column prop="project_name" fixed label="项目名称" width="180">
          </el-table-column>
          <el-table-column prop="team_name" label="团队名称" width="180">
          </el-table-column>
          <el-table-column prop="project_type" label="项目类型" width="100">
          </el-table-column>
          <el-table-column prop="register_date" label="注册日期" width="100">
          </el-table-column>
          <el-table-column prop="register_date" label="所属领域" width="100">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-badge :value="scope.row.message" v-if="scope.row.message!==0" style="margin-top: 10px;">
              <el-button class="button4table" @click="seeMore(scope.row)">详情</el-button>
              </el-badge>
              <el-button v-else class="button4table" @click="seeMore(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="height: 20px;"></div>
      <div class="block">
        <el-pagination
          :current-page.sync="current_page"
          :page-size="5"
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
  </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "TeamManage",
      created(){
        let _this=this;
        _this.$data.current_page=1;
        this.$axios({
          method:'get',
          url:'/TeamManagement/getTeamList',
          params:{
            page:1
          }
        }).then(function (response) {
          _this.$data.tableData=response.data.formalTeams;
          _this.$data.total=response.data.all;
          _this.$data.loading=false;

        })


      },
      data(){
          return{
            loading:true,
            current_page:1,
            total:0,
            searchName:'',
            allNumber:15,
            tableData:[
             {
               teamId:'',
               team_name:'',
               project_name:'',
               project_type:'',
               message:0,
               belong_field:'',
               register_date:'',
             }
           ]
          }
      },
      methods:{
          seeMore(row){
            this.$router.push({path:'/teamInfo',query:{id:row.teamId}});
          },
        handleSizeChange(){
            let _this=this;

        }
      }
    }
</script>

<style lang="less">
  #teamManage{


    .el-input__inner{
      border-color: #182f63;
      border-width: 1.5px;
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
