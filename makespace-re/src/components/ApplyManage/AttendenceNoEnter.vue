<template>
<div style="width:1000px;">
  <!--未录入考勤号的团队列表-->
  <el-row style="width: 100%;">
    <el-col style="width: 50%;">
  <div id="noEnterList" style="display: inline-block;height: 1000px;" align="left">
    <p class="headPart">所有团队</p>
    <table>
      <tr v-for="item in noEnterTeams">
        <td class="teamList" @click="showMemberList(item.teamId)" >{{item.team_name}}
          <i style="margin-left: 180px;" v-if="item.teamId===ID" class="el-icon-d-arrow-right"/>
        </td>
      </tr>
    </table>

  </div>
    </el-col>
    <el-col style="width: 50%">
  <!--团队成员-->
  <div id="memberList" style="display: inline-block" align="left">
    <p class="headPart" style="width:400px;">团队成员</p>
    <table>
      <tr align="left">
        <th>姓名</th>
        <th>学号</th>
        <th>考勤号</th>
      </tr>
      <tr v-for="(item,index) in noEnterMembers">
        <td v-if="item!==null">{{item.studentName}}</td>
        <td v-if="item!==null">{{item.studentId}}</td>
        <td v-if="item!==null">
          <span><input placeholder="输入考勤号" v-model="attNO[index]" @change="checkAttendance(index)" style="width: 60px;"  /></span>
          <span v-show="!attStatus[index].status" style="font-size: 10px;color: indianred">考勤号已存在</span>
          <span v-show="attStatus[index].status" style="font-size: 10px;color: yellowgreen">考勤号可用</span>
        </td>
      </tr>
    </table>
    <button id="submit" @click="submitAtt"><label style="font-size: 20px;color: white;">提交</label></button>
  </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "AttendenceNoEnter",
        data(){
          return{
            noEnterTeams:[                //从后端获取未录入考勤号的团队列表
            ],
            noEnterMembers:[             //根据team_id获取相应团队成员列表
            ],
            attNO:[],                    //输入的考勤号
            ID:0,                        //正在展示的团队的ID
            flag:false,
            attStatus:[
              {
                status:false
              }
            ]
          }
          },
      created(){                         //获取未录入考勤号的团队列表
          let _this=this;
          this.$axios({
            method:'get',
            url:'/TeamManagement/getTeamList',
            params:{
              page:'1',
            }
          }).then(function (response) {
            _this.$data.noEnterTeams=response.data.formalTeams;
          })
      },
      methods:{
        checkAttendance(index){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/formalTeam/checkAttnum',
            params:{
               att_num:this.$data.attNO[index]
            }
          }).then(function (response) {
            console.log(response.data);
            _this.$data.attStatus[index].status=response.data;
            // if(response.data===false){
            //   _this.$data.attStatus[index]=false;
            // }else{
            //   _this.$data.attStatus[index]=true;
            // }
          })
        },
        showMemberList(id){             //显示未被分配座位的成员列表
            this.$data.ID=id;
            let _this=this;
            this.$axios({
              method:'get',
              url:'/formalTeam/getStuWithoutAtt',
              params:{
                team_id:id,
              }
            }).then(function (response) {
              _this.$data.noEnterMembers=[];
              console.log(response.data.length);
              for(let index=1;index<response.data.length;index++){
                _this.$data.attStatus.push({status:false});
              }
              for(let index=0;index<response.data.length;index++) {
               if(response.data[index]!==null){
                 _this.$data.noEnterMembers.push(response.data[index]);
               }
              }
            });
        },
        submitAtt(){              //提交所有结果
          if(this.$data.noEnterMembers.length!==0)
            var flag=true;
          for(let tt of this.$data.attNO)
          {
            if(tt==='')
              flag=false;
          }

          if( flag===true){
          var n=0;
          for(let temp of this.$data.noEnterMembers) {
            let _this=this;
            this.$axios({
              method: 'get',
              url: '/formalTeam/chooseAtt',
              params: {
                student_id:temp.studentId,
                att:_this.$data.attNO[n++],
              }
            });
          }
          this.$message({
              type: 'success',
              message: '提交成功'
            });
          this.$data.noEnterMembers.splice(0,this.$data.noEnterMembers.length);
          }
          else if(flag===false)
          {
            alert('输入不能为空！！');
          }
        }
      }
    }
</script>

<style scoped>
  table {
    border-collapse: collapse;
    font-family: Futura, Arial, sans-serif;
  }
  th,td {
    padding: .65em;
  }
  th {
    width:130px;
    background: #555 scroll 0 0;
    color: #fff;
  }
  td {
     border-bottom: 1px solid #777;
    width:100px;
  }
  th:first-child {
    border-radius: 9px 0 0 0;
  }
  th:last-child {
    border-radius: 0 9px 0 0;
  }
  tr:last-child td:first-child {
    border-radius: 0 0 0 9px;
  }
  tr:last-child td:last-child {
    border-radius: 0 0 9px 0;
  }


  #noEnterList{
    /*float: left;*/
    width:400px;
    height:400px;
    margin-top: 0;
  }
  #memberList{
    /*float: right;*/
    width:400px;
  }
  .headPart{
    border-bottom: 1px solid darkgray;
    font-size: 26px;
    color:#182f63;
    width:400px;
  }
  .teamList{
    border-bottom:1px solid darkgray;
    width:400px;
    height:34px;
    font-size: 18px;
    transition: all 0.3s;
    background-color:#FFFAFA;
  }
  .teamList:hover{
    font-size: 30px;
    width:270px;
    background-color: #0086b3;
  }
  #submit{
    background-color: #409eff;
    margin-top: 50px;
    border: 0;
    border-radius: 6px;
    outline: 0;
    width: 280px;
    height:50px;
    cursor: pointer;
    transition:all 0.4s;
    opacity: 0.85;
  }
  #submit:hover{
    width:285px;
    height:52px;
    opacity: 1;
  }
</style>
