<template>
  <div id="MessageCenter">
    <div class="title4mc"><p style="font-size: 40px;font-weight: bold">消息中心</p></div>
    <div class="box">

      <!--消息盒子-->
      <div class="animated bounceInRight">
    <el-row :gutter="10">
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-card style="width: 100%">
          <span class="title4small">管理申请</span><br/><br/>
          <span>新团队入驻：{{allTeamNumber}}</span>
          <div style="height: 10px;"></div>
          <span>团队待审核：{{noAuditNum}}</span>
          <div class="button4" style="margin-top: 13px;">
          <el-button type="primary" @click="linkto1">前往处理</el-button>
          </div>
        </el-card>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-card style="width: 100%">
          <span class="title4small">入驻办理</span><br/><br/>
          <span>待选座：{{waitChairTeamNumber}}</span>
          <div style="height: 10px"></div>
          <span>待录入考勤号：{{attendanceTeamNumber}}</span>
          <div class="button4" style="margin-top: 13px;">
            <el-button type="primary" @click="linkto2">前往处理</el-button>
          </div>
        </el-card>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-card style="width: 100%">
          <span class="title4small">进度审核</span><br/><br/>
          <span>暂无消息哦~</span>
        </el-card></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-card style="width: 100%;">
          <span class="title4small">邮件发送</span><br/><br/>
          <!--<span>暂无消息哦~</span>-->
          <div style="margin-top: 10px;">
            <el-button type="primary" @click="linkToEmail">发送团队邮件</el-button>
          </div>
          <div style="margin-top: 10px;">
            <el-button type="primary" @click="linkToModels">管理邮件模板</el-button>
          </div>
        </el-card>
      </div></el-col>
    </el-row>

        <div style="margin-top: 30px;">
          <el-card>
            <span class="title4small">团队管理</span>
            <div style="height: 10px;"></div>
            <div class="table">
              <el-table :data="formMessages" style="width: 100%">
                <el-table-column label="消息标题" width="260" prop="title"></el-table-column>
                <el-table-column label="团队名" width="160" prop="teamId"></el-table-column>
                <el-table-column label="类型" width="130">
                  <template slot-scope="scope">
                    <span v-if="scope.type==='1'">成员变更</span>
                    <span v-else-if="scope.type==='2'">信息修改</span>
                    <span v-else>团队变更</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top">
                    <el-button type="primary">详情</el-button>
                    </el-tooltip>
                    <el-button type="primary" @click="GotoDeal(scope.row)">前往处理</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MessageCenter",
      created(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/TeamManagement/getTempTeamList',
          params:{
            page:1,
          }
        }).then(function(response){
          // _this.$data.loading=false;
          // _this.$data.pagesize=response.data.part;
          // _this.$data.teams=response.data.tempTeams;
          // _this.$data.showTable=_this.$data.teams;
          // _this.$data.teamNum=response.data.all;
          for(let temp of response.data.tempTeams)
          {
            if(temp.audit_option==='未处理')
              _this.$data.noAuditNum++;
          }
        });

          this.$axios({
            method:'get',
            url:'/formalTeam/getAllRequestList',
          }).then(function (response) {
            _this.$data.formMessages=response.data
          })



        this.$axios({
          method:'get',
          url:'/formalTeam/getNumOfTeamSeat',
        }).then(function (response) {
          _this.$data.waitChairTeamNumber=response.data
        })
        this.$axios({
          method:'get',
          url:'/formalTeamTeam/getNumOfTeamAtt',
        }).then(function (response) {
          _this.$data.attendanceTeamNumber=response.data
        })

      },
      data(){
          return{
            noAuditNum:0,
            formMessages:[{
              teamId:'',
              title:'',
              type:'',
              content:'',
              requestId:''
            }],
            tempTeamNumber:0,
            waitChairTeamNumber:0,
            attendanceTeamNumber:0,
            allTeamNumber:0,
          }
      },
      methods:{
          linkto1(){
            this.$router.push({path:'/ApplyManage'})
          },
        linkto2(){
            this.$router.push({path:'/assessment'});
        },
        GotoDeal(row){
            this.$router.push({path:'/TeamInfo',query:{id:row.teamId}})
        },
        linkToEmail(){
            this.$router.push('/SendEmail')
        },
        linkToModels(){
            this.$router.push('/EmailModels');
        }
      }
    }
</script>

<style scoped>
#MessageCenter{

}

.title4small{
  font-size: 21px;
  font-weight: bold
}

</style>
