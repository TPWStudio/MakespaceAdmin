<template>
    <div id="relese">
      <p style="font-size: 40px;font-weight: bold">申请信息</p>
      <!--<div class="animated bounceInUp">-->
      <el-button type="primary" @click="dialogVisible=true" :disabled="haveApplication">发布新申请</el-button>
      <div style="height: 10px;"></div>
      <el-dialog :modal-append-to-body="false" :modal="true" :visible.sync="dialogVisible" title="发布新一期申请" style="width: 800px;">
        <el-form :model="formRelease" ref="formRelease" label-width="75px">
          <el-form-item label="开始日期">
            <el-date-picker v-model="formRelease.startTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-date-picker v-model="formRelease.endTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="期号">
            <el-input style="width: 220px;" v-model="formRelease.termID" prefix-icon="el-icon-document"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="release" type="primary">确认发布</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
      <el-dialog :modal-append-to-body="false" :modal="true" :visible.sync="editDialogVisible" title="发布新一期申请" style="width: 800px;">
        <el-form :model="formApplyEdit" ref="formApplyEdit" label-width="75px">
          <el-form-item label="开始日期">
            <el-date-picker v-model="formApplyEdit.beginDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-date-picker v-model="formApplyEdit.endDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="期号">
            <el-input style="width: 220px;" v-model="formApplyEdit.termId" prefix-icon="el-icon-document"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="release" type="primary">确认修改</el-button>
            <el-button @click="editDialogVisible=false" type="danger">放弃修改</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
      <div class="tempApply" style="width: 80%;">
        <el-card v-if="haveApplication===true" class="card1">
          <span style="font-size: 25px;font-weight: bold">当前申请信息</span><br/><br/>
          <span>开始时间:{{formApply.beginDate}}</span><div style="height: 4px;"></div>
          <span>结束时间:{{formApply.endDate}}</span><div style="height: 4px;"></div>
          <span>当前期号:{{formApply.termId}}</span><div style="height: 4px;"></div>
          <span>当前申请团队数量:{{formApply.teamNumber}}</span><div style="height: 4px;"></div>
          <el-button type="danger" @click="closeApp">关闭申请</el-button>
          <el-button type="primary" @click="editAppWindow">修改申请</el-button>
        </el-card>
        <el-card v-else="!haveApplication" class="card2">
          <span>当前暂无开放的申请哦~</span>
        </el-card>
      </div>
      <div class="historyApply" style="width: 80%;margin-top: 15px;">
        <el-card style="width: 100%">
          <el-table :data="formApplyHistory">
            <el-table-column label="申请期号" prop="termId"></el-table-column>
            <el-table-column label="起始日期" prop="beginDate"></el-table-column>
            <el-table-column label="截止日期" prop="endDate"></el-table-column>
            <el-table-column label="申请团队数量" prop="teamNumber"></el-table-column>
            <!--<el-table-column label="操作">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="primary">查看详情</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </el-card>
      </div>
      </div>
    <!--</div>-->
</template>

<script>
    export default {
        name: "ReleaseNew",
      mounted(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/api/backend-index/get-statistic'
        }).then(function (response) {
          if(response.data.applicationRound===null){
           _this.$data.haveApplication=false;
          }else {
            _this.$data.formApply = response.data.applicationRound;

            _this.$data.haveApplication=true;
            console.log(response);
            //console.log(_this.$data.haveApplication);
          }
        }).catch(function (err) {
          alert(err.response.data);
        })
      },
      data(){
          return{
            editDialogVisible:false,
            formApplyEdit:{
              beginDate:'',
              endDate:'',
              termId:'',

            },
            formApplyHistory:[
              // beginDate:'',
              // endDate:'',
              // teamNumber:'',
              // termId:''
            ],
            haveApplication:false,
            dialogVisible:false,
            formRelease:{
              startTime:'',
              endTime:'',
              termID:''
            },
            formApply:{
              beginDate:'',
              endDate:'',
              teamNumber:'',
              termId:''
            }
          }
      },
      methods:{
          editAppWindow(){
            this.$data.formApplyEdit=this.$data.formApply;
            this.$data.editDialogVisible=true;
            console.log(this.$data.editDialogVisible);

          },
          closeApp(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/api/backend-index/close-current-application-round'
            }).then(function (response) {
              if(response.data===true) {
                alert('取消成功！')
                _this.$data.formApplyHistory.push(_this.$data.formApply);
                _this.$data.haveApplication = false;
                console.log(_this.$data.formApplyHistory);
              }
            })
          },
          release(){
            let _this=this;

            let date1=this.$data.formRelease.startTime;
            let year=date1.getFullYear();
            let month=date1.getMonth();
            let day=date1.getDate();
            if(month>'0'&&month<'9'){
              month='0'+month
            }
            if(day>'0'&&day<'9'){
              day='0'+day;
            }
            date1=year+'-'+month+'-'+day;

            let date2=this.$data.formRelease.endTime;
            let year1=date2.getFullYear();
            let month1=date2.getMonth();
            let day1=date2.getDate();
            if(month1>'0'&&month1<'9'){
              month1='0'+month1
            }
            if(day1>'0'&&day1<'9'){
              day1='0'+day1;
            }
            date2=year1+'-'+month1+'-'+day1;

            if(date2<=date1){
              this.$message({
                type:'error',
                message:'结束日期不能早于起始日期'
              })
            }else {
              if (this.$data.formRelease.termID === '') {
                this.message({
                  type:'error',
                  message:'期号不能为空'
                })
              } else {
                this.$axios({
                  method: 'get',
                  url: '/api/backend-index/create-new-application-round',
                  params: {
                    beginDate: date1,//date1,
                    endDate: date2, //date2,
                    termId: parseInt(this.$data.formRelease.termID)
                  }
                }).then(function (response) {
                  _this.$data.dialogVisible=false;
                  _this.$data.haveApplication=true;
                  _this.$data.formApply.beginDate=date1;
                  _this.$data.formApply.endDate=date2;
                  _this.$data.formApply.termId=_this.$data.formRelease.termID;
                  _this.$data.formApply.teamNumber=0;
                })
              }
            }
          },
      }
    }
</script>

<style scoped>

</style>
