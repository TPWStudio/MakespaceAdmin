<template>
    <div>
        <div class="form">
          <h2>团队消息</h2>
          <el-table :data="TeamMessages" v-loading="loading">
            <el-table-column label="消息标题" prop="title"></el-table-column>
            <el-table-column label="消息类型">
              <template slot-scope="scope">
              <span v-if="scope.row.type==='1'">成员变更</span>
                <span v-else-if="scope.row.type==='2'">信息修改</span>
                <span v-else>团队变更</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="bottom">
                <el-button type="primary" style="color: #182f63;background-color: white;border-color: #182f63">详情</el-button>
                </el-tooltip>
                <el-button type="danger" style="color: #182f63;background-color: white;border-color: #182f63" @click="dealRequest(scope.row,scope.$index)">标记为已处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h2 style="margin-top: 50px;">团队信息</h2>
          <el-form  label-width="80px" style="margin-top: 50px;">
            <el-row type="flex" class="row-bg">
             <el-col :span="8">
              <el-form-item label="团队ID:" >
              <el-input v-model="teamID" disabled></el-input>
              </el-form-item>
             </el-col>
             <el-col :span="4">&emsp; </el-col>
             <el-col :span="9">
              <el-form-item label="团队名称:">
              <el-input v-model="teamName" disabled></el-input>
              </el-form-item>
             </el-col>
            </el-row>
            <br/>
            <el-row type="flex" class="row-bg">
              <el-form-item label="注册时间:" label-width="110px" >
                <el-col :span="20">
                   <el-date-picker type="date" placeholder="选择日期" v-model="register_date" style="width: 100%;" disabled></el-date-picker>
                </el-col>
              </el-form-item>
              <el-col class="line" :span="3">&emsp;</el-col>
              <el-form-item label="注册时间" label-width="130px">
                <el-col :span="20">
                  <el-date-picker type="date" placeholder="选择日期" v-model="register_date" style="width: 100%;" disabled></el-date-picker>
                </el-col>
              </el-form-item>
            </el-row>
            <br/>
            <el-row type="flex" class="row-bg">
              <el-col :span="9">
                <el-form-item label="项目类型:">
                  <el-radio-group v-model="projectType" disabled>
                    <el-radio label="自选"></el-radio>
                    <el-radio label="竞赛"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="3">&emsp;</el-col>
              <el-col :span="11">
                <el-form-item label="审核意见:">
                   <el-radio-group v-model="auditOpinion" disabled>
                     <el-radio label="未审核"></el-radio>
                     <el-radio label="已同意"></el-radio>
                     <el-radio label="已拒绝"></el-radio>
                   </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <br/>
            <el-tabs tab-position="left" style="height: 280px;">
              <el-tab-pane label="小组成员">
                <!--<el-button @click="dialogVisible=true">新增成员</el-button>-->
                <el-table
                  max-height="580px"
                  :data="members"
                  style="width: 100%">
                  <el-table-column
                    prop="student_name"
                    label="姓名"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="student_id"
                    label="学号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="attendance_number"
                    label="考勤号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="room_no"
                    label="房间号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="seat_no"
                    label="座位号"
                    width="80">
                  </el-table-column>
                  <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button style="width: 65px;" @click="modifyMember(scope.row)">修改</el-button>
                      <el-button style="width: 65px;" @click="deleteMember(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="项目简述" >
                <el-input type="textarea" :rows="9" v-model="projectBrief" :disabled="checked"></el-input>
              </el-tab-pane>
              <el-tab-pane label="主营业务">
                <el-input type="textarea" :rows="9"  v-model="projectDirector" :disabled="checked"></el-input>
              </el-tab-pane>
              <el-tab-pane label="前期基础">
                <el-input type="textarea" :rows="9"  v-model="workFoundstion" :disabled="checked"></el-input>
              </el-tab-pane>
              <el-tab-pane label="项目计划">
                <el-input type="textarea" :rows="9"  v-model="plan" :disabled="checked"></el-input>
              </el-tab-pane>
            </el-tabs>
            <div style="margin-top: 40px;">
            <el-button type="danger" round :disabled="checked" @click="modifyInfos">提交</el-button>
              <el-button type="primary" round :disabled="!checked" @click="checked=!checked">修改</el-button>
            </div>
          </el-form>
        </div>
        <el-dialog :visible.sync="dialogVisible" modal-append-to-body="false" :modal="true">
          <div class="title">
            <span style="font-size: 30px;">新增团队成员</span>
            <el-form :model="formNewMember" ref="formNewMember" label-width="90px" style="margin-top: 30px;">
                <el-form-item prop="name" label="成员姓名">
                  <el-input v-model="formNewMember.name" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item prop="seat" label="成员座号">
                  <el-input v-model="formNewMember.seat" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item prop="check" label="成员考勤号">
                  <el-input v-model="formNewMember.check" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="submitNew">提交</el-button>
                </el-form-item>
            </el-form>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible1" modal-append-to-body="flase" :modal="true">
          <div class="title">
            <span style="font-size: 30px;">修改成员</span>
          </div>
          <el-form :model="formModify" ref="formModify">
            <el-form-item prop="student_name" label="姓名">
              <el-input v-model="formModify.student_name" disabled></el-input>
            </el-form-item>
            <el-form-item prop="student_id" label="学号">
              <el-input v-model="formModify.student_id"></el-input>
            </el-form-item>
            <el-form-item prop="attendance_number" label="考勤号">
              <el-input v-model="formModify.attendance_number"></el-input>
            </el-form-item>
            <el-form-item prop="room_no" label="房间号">
              <el-input v-model="formModify.room_no"></el-input>
            </el-form-item>
            <el-form-item prop="seat_no" label="座位号">
              <el-input v-model="formModify.seat_no"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button round @click="submitModify()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
</template>

<script>
    export default {
        name: "TeamInfo",

        data() {
        return {
          loading:true,
          TeamMessages:[
            {
              title:'',
              type:'',
              content:'',
              requestId:'',
              teamId:''
            }
          ],
          checked:true,
            formNewMember:{
              name:'',
              seat:'',
              check:''
            },
            formModify:{
              student_name:'',
              student_id:'',
              attendance_number:'',
              room_no:'',
              seat_no:'',
            },
            dialogVisible1:false,
            dialogVisible:false,
            teamID:'',            //团队ID
            teamName: '',         //团队名称
            projectName:'',       //项目名称
            teacher:'',           //带队老师
            belondField:'',       //所属领域
            projectType:'',       //项目类型
            projectBrief:'',      //项目简介
            projectDirector:'',   //主营业务
            workFoundstion:'',    //前期基础

            plan:'',              //项目计划
            register_date:'',      //注册日期
            auditOpinion:'',      //审核意见：‘未审核’‘已同意’‘已拒绝’
            submitDate:'',        //申请提交日期
            enterDueDate:'',      //申请截止日期
            members:[{
            student_name:'',
            student_id:'',
            attendance_number:'',
            room_no:'',
            seat_no:'',
          },],
          id:'',
          formTemp:{

          }
        }
       },
      created(){
        let _this=this;

        this.$data.id=this.$route.query.id;

        this.$axios({
          method:'get',
          url:'/TeamManagement/getTeamMore',
          params:{
            team_id:this.$data.id
          }
        }).then(function (response) {
          console.log(response);
          _this.$data.teamID=response.data.team_id;
          _this.$data.projectDirector=response.data.project_director;
          _this.$data.projectBrief=response.data.project_brief
          _this.$data.workFoundstion=response.data.work_foundation;
          _this.$data.belondField=response.data.belong_field
          _this.$data.register_date=response.data.register_date;
          _this.$data.teamName=response.data.team_name;
          _this.$data.members=response.data.memberMessages;
          _this.$data.plan=response.data.plan
          _this.$data.projectType=response.data.project_type;
          console.log(_this.$data.members);
        })

        this.$axios({
          method:'get',
          url:'/formalTeam/getRequestList',
          params:{
            team_id:this.$data.id
          }
        }).then(function (response) {
          _this.$data.TeamMessages=response.data;
          _this.$data.loading=false;
        })


      },
       methods: {
          dealRequest(row,index){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/formalTeam/dealRequest',
              params:{
                request_id:row.requestId,
                team_id:row.teamId
              }
            }).then(function (response) {
              if(response.data===true){
                _this.$message({
                  type:'success',
                  message:'处理成功！'
                })
                _this.$data.TeamMessages.splice(index,1);
              }else{
                _this.$message({
                  message:'处理失败！',
                  type:'error'
                })
              }
            })
          },
          modifyInfos(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/TeamManagement/changeTeam',
              params:{
                team_id:this.$data.teamID,
                project_brief:this.$data.projectBrief,
                project_derector:this.$data.projectDirector,
                work_foundation:this.$data.workFoundstion,
                plan:this.$data.plan
              }
            }).then(function (response) {
              if(response.data===true) {
                _this.$message({
                  type:'success',
                  message:'修改成功！'
                })
                _this.$data.checked = true;
              }else{
                _this.$message({
                  type:'error',
                  message:'修改失败！请检查是否有权限'
                })
              }
            })

          },
          modifyMember(row){
            this.$data.formModify.student_name=row.student_name;
            this.$data.formModify.student_id=row.student_id;
            this.$data.formModify.attendance_number=row.attendance_number;
            this.$data.formModify.seat_no=row.seat_no;
            this.$data.formModify.room_no=row.room_no;
            this.$data.dialogVisible1=true;
            this.$data.formTemp=row;
          },
          submitNew(){

          },

         deleteMember(row){
           let _this=this;
           this.$axios({
             method:'get',
             url:'/TeamManagement/deleteMember',
             params:{
               student_id:row.student_id,
               team_id:this.$data.teamID,
             }
           }).then(function (response) {
             if(response.data===true){
               _this.$message({
                 type:'success',
                 message:'删除成功！'
               })
             }else{
               _this.$message({
                 type:'error',
                 message:'删除失败'
               })
             }
           })
         },
         submitModify(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/TeamManagement/changeMember',
              params:{
                student_id:this.$data.formModify.student_id,
                team_id:parseInt(this.$data.teamID),
                room_no:parseInt(this.$data.formModify.room_no),
                seat_no:parseInt(this.$data.formModify.seat_no),
                attendance_number:parseInt(this.$data.formModify.attendance_number)
              }
            }).then(function (response) {
              if(response.data===true){
                _this.$message({
                  type:'success',
                  message:'修改成功！'
                })

              }else{
                // _this.$message({
                //   type:'error',
                //   message:'修改失败！'
                // })
              }

              // _this.$data.members.splice()
            })
           _this.$data.members.splice(_this.$data.formTemp,1);
           _this.$data.members.push(_this.$data.formModify);
           _this.$data.dialogVisible1=false;

         }
      }
    }
</script>

<style scoped>
  .form{
    padding-top: 20px;
    margin-top: 30px;
    float:left;
    width:75%;
    margin-left: 50px;
  }
</style>
