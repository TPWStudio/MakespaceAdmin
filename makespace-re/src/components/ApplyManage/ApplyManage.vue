<template>
<div style="width:100%;" align="center">
  <div style="width: 60%;min-width:1000px;">
    <!--表头-->
    <p style="font-size:30px;color: #182f63;" align="left">管理申请</p>
    <!--统计显示-->
    <div class="count" align="left">
      <div class="countItem" style="border-bottom: 3px solid #8EE5EE;" align="center">
        <p class="itemWord">团队数&emsp;&emsp;{{teamNum}}</p>
      </div>
      <div class="countItem" style="border-bottom: 3px solid #E6A23C;" align="center">
        <p class="itemWord">未审核&emsp;&emsp;{{noAuditNum}}</p>
      </div>
      <div class="countItem" style="border-bottom: 3px solid #F56C6C;" align="center">
        <p class="itemWord">已拒绝&emsp;&emsp;{{refusedNum}}</p>
      </div>
      <!--显示状态选择 下拉菜单-->
      <div style="display: inline-block;width:500px;"align="right">
        <el-dropdown split-button type="info" size="medium">
          显示类型
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showAll">全部</el-dropdown-item>
            <el-dropdown-item @click.native="showNoAudit"divided>未处理</el-dropdown-item>
            <el-dropdown-item @click.native="showRefused">已拒绝</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--表格-->
    <el-table :data="showTable.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              max-height="400px;"  style=" margin-top: 40px;"stripe v-loading="loading">
      <el-table-column prop="submit_date" label="申请日期" width="120"></el-table-column>
      <el-table-column prop="team_name" label="团队名" width="150"></el-table-column>
      <el-table-column prop="captain" label="团队负责人" width="130"></el-table-column>
      <el-table-column prop="numOfMember" label="成员数量" width="100"></el-table-column>
      <el-table-column prop="captain_phone" label="负责人电话" width="180"></el-table-column>
      <el-table-column prop="audit_option" label="审核状态" width="150"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <div>
            <!--团队详情-->
            <button class="details" @click="showDetails(scope.$index,showTable)">
              <label style="font-size: 14px;color:#4682B4;cursor: pointer;">详情</label>
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <!--<el-pagination-->
      <!--:current-page.sync="currentPage"-->
      <!--:page-size="pagesize"-->
      <!--layout="total, prev, pager, next"-->
      <!--:total="showTable.length">-->
    <!--</el-pagination>-->
  </div>
  <!--详情弹窗-->
  <div align="left">
    <el-dialog :visible.sync="detailsVisible" title="申请详情">
      <div>
        <div style="font-size: 25px;">
          基本信息
        </div>
        <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
        <div style="margin-top: 20px;">
          <span class="names">团队名称：</span><span class="names1">{{detailsForm.teamName}}</span><br/><br/>
          <span class="names">项目名称：</span><span class="names1">{{detailsForm.projectName}}</span><br/><br/>
          <span class="names">所属领域：</span><span class="names1">{{detailsForm.belongField}}</span><br/><br/>
          <span class="names">项目类型：</span><span class="names1">{{detailsForm.projectType}}</span><br/><br/>
        </div>
      </div>
      <el-form ref="detailsForm" :model="detailsForm" label-width="80px" >
        <!--边界-->
        <div clas="rowBorder1" style="width:100%;height:40px;">
          <div class="colBorder1"></div>
          <div class="colBorder1" style="background: #e5e9f2;"></div>
        </div>
        <!--成员信息表格-->
        <div style="border-radius: 6px;height:40px; margin-top: 30px;">
          <div style="width:95%;">
            <!--<p style="font-size:25px;margin-top: 20px;color:#409EFF;">成员（第一名为项目负责人）</p>-->
            <div style="font-size: 25px;">
              主要成员（第一名为项目负责人）
            </div>
            <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <span style="font-size: 18px;color: #409eff;font-weight: bold">共{{teammateNumber}}人</span><br/>
          <el-table  :data="detailsForm.tempMembers" stripe   style="width: 100%;margin-top: 20px;" max-height="1200">
            <el-table-column prop="studentName" label="姓名" width="100"></el-table-column>
            <el-table-column prop="studentId" label="学号" width="130"></el-table-column>
            <el-table-column prop="college" label="学院" width="90"></el-table-column>
            <el-table-column prop="educationBackground" label="学历" width="90"></el-table-column>
            <el-table-column prop="phoneNumber" label="电话" width="130"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="130"></el-table-column>
          </el-table>
        </div>
        <!--边界-->
        <div clas="rowBorder2" style="width:100%;height:40px;margin-top: 50px;">
          <div class="colBorder2"></div>
          <div class="colBorder2" style="background: #e5e9f2;"></div>
          <div class="colBorder2"></div>
        </div>
        <!--尾部信息表单-->
        <div style="margin-top: 40px;width:95%;">
        </div>
        <div>
          <div style="font-size: 25px;">
            项目简介
          </div>
          <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
          <div style="margin-top: 6px;font-size: 14px;width: 96%;margin-right: auto;margin-left: auto" v-html="detailsForm.projectBrief">
            <!--{{detailsForm.projectBrief}}-->
          </div>
        </div>
        <div style="margin-top: 38px;">
          <div style="font-size: 25px;">
            主营业务
          </div>
          <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
          <div style="margin-top: 6px;font-size: 14px;width: 96%;margin-right: auto;margin-left: auto" v-html="detailsForm.projectDirector">
            <!--{{detailsForm.projectBrief}}-->
          </div>
        </div>
        <div style="margin-top: 38px;">
          <div style="font-size: 25px;">
            前期基础
          </div>
          <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
          <div style="margin-top: 6px;font-size: 14px;width: 96%;margin-right: auto;margin-left: auto" v-html="detailsForm.workFoundation">
            <!--{{detailsForm.projectBrief}}-->
          </div>
        </div>
        <div style="margin-top: 38px;">
          <div style="font-size: 25px;">
            项目计划
          </div>
          <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
          <div style="margin-top: 6px;font-size: 14px;width: 96%;margin-right: auto;margin-left: auto" v-html="detailsForm.plan">
            <!--{{detailsForm.projectBrief}}-->
          </div>
        </div>
        <!--上传文件-->
        <div style="width:97%;margin-top: 40px;" align="left">
          <div style="font-size: 25px;">
            上传文件<span v-if="detailsForm.filePath==='no'" style="color: red;">（该团队尚未上传文件）</span>
            <span v-else style="color: greenyellow">（该团队已上传文件）：</span>
          </div>
          <div style="height: 4px;width: 100px;background-color: cornflowerblue;margin-top: 5px;"></div>
          <!--<div style="color:#409EF0;margin-top: 10px;"><label style="color:red">*</label>相关文件<span v-if="detailsForm.filePath==='no'" style="color: red;">（该团队尚未上传文件）</span>-->
            <!--<span v-else style="color: greenyellow">（该团队已上传文件）：</span>-->
            <div style="margin-top: 10px;" v-if="detailsForm.filePath!=='no'">
              <span style="font-size: 14px;">已上传文件列表：</span><br/>
              <div><a :href="detailsForm.filePath">{{detailsForm.fileName}}</a></div>
            </div>
              <br/>
              <el-button type="primary" size="small" plain v-if="detailsForm.filePath==='yes'" ><i class="el-icon-download"/>  打包下载</el-button>
          <!--</div>-->
        </div>
        <!--提交按钮-->
        <div align="right" style="margin-top: 40px;margin-bottom: 70px;" >
          <el-button v-if="state==='已拒绝'" type="danger" disabled>您已退回该申请</el-button>
          <el-button v-if="state==='未处理'" type="info" @click="agree">同意申请</el-button>
          <el-button v-if="state==='未处理'" type="info " @click="refuse">退回申请</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :modal="true" :modal-append-to-body="false" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false">
      <span style="font-size: 30px;font-weight: bold">请输入拒绝理由</span>
      <el-input type="textarea"  v-model="reason" :rows="10"></el-input>
      <el-button type="danger" @click="submitRefuse">提交</el-button>
    </el-dialog>
  </div>
</div>
</template>

<script>
    export default {
        name: "ApplyManage",
      data(){
          return{
            teammateNumber:0,
            reason:'',
            loading:true,
            teams:[
            ],
            showTable:[                   //表内显示的数据
               ],
            none:[],

            detailsForm:{                //详情显示表单
            },
            teamNum:0,                //团队数
            noAuditNum:0,             //未审核数目
            refusedNum:0,             //已拒绝数目
            detailsVisible:false,
            currentPage:1,
            pagesize:1,               //每个分页行数
            index:'',                 //被查看团队的序列
            state:'',                 //被查看团队审核的审核状况,
            phones:'',
            dialogVisible:false
          }
      },
      created(){
          let that=this;
          let _this=this;
          this.$axios({
            method:'get',
            url:'/TeamManagement/getTempTeamList',
            params:{
              page:1,
            }
          }).then(function(response){
            _this.$data.loading=false;
            console.log(response);
            _this.$data.pagesize=response.data.part;
            _this.$data.teams=response.data.tempTeams;
            _this.$data.showTable=_this.$data.teams;
            _this.$data.teamNum=response.data.all;
            for(let temp of _this.$data.teams)
            {
              if(temp.audit_option==='未处理')
                _this.$data.noAuditNum++;
              else if(temp.audit_option==='已拒绝')
                _this.$data.refusedNum++;
            }
          });
      }
      ,
      methods:{
          submitRefuse(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/TeamManagement/dealTeam',
              params:{
                team_id:_this.$data.detailsForm.teamId,
                choice:0,
                reason:this.$data.reason
              }
            });
            this.$data.dialogVisible=false;
            this.$data.showTable[this.$data.index].audit_option='已拒绝';
            this.$message({
              type: 'success',
              message: '处理成功!'
            });
          },
          showDetails(index,rows){           //显示临时团队详情
            this.$data.detailsVisible=true;
            this.$data.index=index;
            this.$data.state=rows[index].audit_option;

            let _this=this;
            this.$axios({
              method:'get',
              url:'/TeamManagement/TempTeamMore',
              params:{
                team_id:rows[index].team_id,
              }
            }).then(function(response){
              _this.$data.detailsForm=response.data;
              _this.$data.teammateNumber=_this.$data.detailsForm.tempMembers.length;
              _this.$data.detailsForm.projectBrief="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+_this.$data.detailsForm.projectBrief.replace(/\n|\r\n/g,"<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
              _this.$data.detailsForm.projectDirector="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+_this.$data.detailsForm.projectDirector.replace(/\n|\r\n/g,"<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
              _this.$data.detailsForm.workFoundation="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+_this.$data.detailsForm.workFoundation.replace(/\n|\r\n/g,"<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
              _this.$data.detailsForm.plan="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+_this.$data.detailsForm.plan.replace(/\n|\r\n/g,"<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
            });




          },
          showAll(){
            this.$data.showTable=[];
            this.$data.showTable=this.$data.teams;
          },
         showNoAudit(){
           this.$data.showTable=[];
             for(let team of this.$data.teams)
             {
               if(team.audit_option==='未处理')
                 this.$data.showTable.push(
                   {
                     submit_date:team.submit_date,
                     team_name:team.team_name,
                     captain:team.captain,
                     captain_phone:team.captain_phone,
                     audit_option:team.audit_option
                   }
                   );
             }
         },
        showRefused(){       //展示已拒绝的信息
          this.$data.showTable=[];

          for(let team of this.$data.teams)
          {
            if(team.audit_option==='已拒绝')
              this.$data.showTable.push(
                {
                  submit_date:team.submit_date,
                  team_name:team.team_name,
                  captain:team.captain,
                  captain_phone:team.captain_phone,
                  audit_option:team.audit_option
                }
              );
          }
        },
        agree(){                  //同意申请
            this.$confirm('您确定要同意该申请吗？同意申请后会发送邮件通知团队入驻。','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning',
            }).then(()=> {
              let _this=this;
              this.$axios({
                method:'get',
                url:'/TeamManagement/dealTeam',
                params:{
                  team_id:_this.$data.detailsForm.teamId,
                  choice:1,
                  reason:'true'
                }
              }).then(function (response) {
                _this.$data.showTable.splice(_this.$data.index,1);
                _this.$message({
                  type: 'success',
                  message: '处理成功!'
                });
                _this.$data.detailsVisible=false;
                _this.$router.push({path:'/transitionPage',query:{p:'/assessment',select:'first'}})
                // _this.created();
                // created();
              })


            }).catch(()=>{
              this.$message({
               type:'info',
               message:'已取消同意',
            });
            });
        },
        refuse(){                 //退回申请
          this.$confirm('您确定要退回该申请吗？同意申请后会发送邮件通知团队入驻。','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning',
          }).then(()=> {
            this.$data.dialogVisible=true;
            this.$data.detailsVisible=false;
          }).catch(()=>{
            this.$message({
              type:'info',
              message:'已取消拒绝',
            });
          });

        }
      }
    }
</script>

<style scoped>


  .names{
    font-size: 18px;
    /*font-weight: bold;*/
  }
  .names1{
    font-size: 18px;
    font-weight: bold;
  }

  .count{
    width:100%;
  }
  .countItem{
    display: inline-block;
    width:120px;
    height:40px;
  }
  .itemWord{
    color:#4682B4;
  }
  .details{
    border: 0;
    outline: 0;
    background-color: transparent;
  }
  .colBorder1{
    width:46%;
    height:40px;
    display: inline-block;
    border-radius: 6px;
    margin-right: 0;
    background: #d3dce6;
  }
  .colBorder2{
    width:30%;
    display: inline-block;
    height:40px;
    border-radius: 6px;
    margin-right: 2%;
    background: #d3dce6;
  }

</style>
