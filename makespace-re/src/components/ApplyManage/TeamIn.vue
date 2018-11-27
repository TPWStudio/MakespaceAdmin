<template>
<div style="width:800px;">
  <div class="contain" style="width:40%;display: inline-block">
    可选教室：
    <el-select v-model="classroomSelected" placeholder="请选择教室"  @change="changeClassroom">
     <el-option
        v-for="(item,index) in classrooms"
       :key="index"
       :label="item.id"
       :value="item.id">
      </el-option>
    </el-select>
  </div>

  <div style="margin-top: 15px;">
    <el-row style="width: 1000px;">
      <el-col style="width: 670px;">
    <el-card style="height: 500px;width: 650px;">
      <div style="height: 50px;width: 400px;">
        <span style="font-size: 20px;margin-left: auto;margin-right: auto">当前教室为{{classroomSelected}}</span>
      </div>
      <!--<div style="width: 60px;height: 7px;background-color: darkslateblue;display: inline-block;margin-left: 30px;"></div><span style="font-size: 10px;display: inline-block;margin-left: 10px;">门</span>-->

      <div style="height: 20px;"></div>
      <el-row>
        <!--选座的213教室-->
        <div v-if="classroomSelected==='213'">
          <el-col style="width: 70px;">
            <div>
              <div v-for="(item,index) in seats_213" :key="item.seatno">
                <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                  <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected.sync="item.ok" v-show="index<=14&&index>=10"></right-seat>
                </el-tooltip>
                <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected.sync="item.ok" v-show="index<=14&&index>=10"></right-seat>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div v-for="(item,index) in seats_213" :key="item.seatno">
                <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                  <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected.sync="item.ok" v-show="index<=18&&index>=17"></right-seat>
                </el-tooltip>
                <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected.sync="item.ok" v-show="index<19&&index>16"></right-seat>
              </div>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_213" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>4&&index<=9" :left="isLeft"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>4&&index<=9" :left="isLeft" ></right-seat>
            </div>
            <div style="margin-top: 20px;">
            <div v-for="(item,index) in seats_213" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>14&&index<17" :left="isLeft"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>14&&index<17" :left="isLeft" ></right-seat>
            </div>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_213" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=0&&index<5"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=0&&index<5"></right-seat>
            </div>
          </el-col>
        </div>
        <!--选座的210教室-->
        <div  v-if="classroomSelected==='212/210'">
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_210" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=32&&index<38"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=32&&index<38"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_210" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=26&&index<32"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=26&&index<32" :left="isLeft"></right-seat>
            </div>
          </el-col>

          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_210" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=20&&index<26"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=20&&index<26"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_210" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=14&&index<20" ></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=14&&index<20" :left="isLeft"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_210" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=7&&index<14"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=7&&index<14"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_210" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=0&&index<7"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=0&&index<7" :left="isLeft"></right-seat>
            </div>
          </el-col>



        </div>
        <div v-if="classroomSelected==='104'">
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_104" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=35&&index<42"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=35&&index<42"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_104" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=28&&index<35"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=28&&index<35" :left="isLeft"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_104" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=21&&index<28"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=21&&index<28"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_104" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=14&&index<21"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=14&&index<21" :left="isLeft"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_104" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=7&&index<14"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=7&&index<14"></right-seat>
            </div>
          </el-col>
          <el-col style="width: 70px;">
            <div v-for="(item,index) in seats_104" :key="item.seatno">
              <el-tooltip v-if="item.teamname" class="item" effect="dark" :content="item.teamname+' '+item.name" placement="left">
                <right-seat :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=0&&index<7"></right-seat>
              </el-tooltip>
              <right-seat v-else :seat="item.seatno" :isSeatSelected="isSeatSelected" @changeStatus="changeStatus" :isSelected="item.ok" v-show="index>=0&&index<7" :left="isLeft"></right-seat>
            </div>
          </el-col>
        </div>
        <el-col style="height: 100px;width: 160px;">
          <el-card style="width: 100%">
            <el-row style="width: 100%;">
              <el-col style="width: 30px;">
                <div style="margin-top: 6px;width: 20px;height: 10px;background-color: #5daf34"></div>
              </el-col>
              <el-col style="width: 80px;">
                <span>已选中</span>
              </el-col>
            </el-row>
            <el-row style="width: 100%;">
              <el-col style="width: 30px;">
                <div style="margin-top: 6px;width: 20px;height: 10px;background-color: darkgray"></div>
              </el-col>
              <el-col style="width: 80px;">
                <span>不可选</span>
              </el-col>
            </el-row>
            <el-row style="width: 100%;">
              <el-col style="width: 30px;">
                <div style="margin-top: 6px;width: 20px;height: 10px;background-color: darkslateblue"></div>
              </el-col>
              <el-col style="width: 80px;">
                <span>可选</span>
              </el-col>
            </el-row>
            <el-row style="width: 100%;">
              <el-col style="width: 30px;">
                <div style="margin-top: 6px;width: 20px;height: 10px;background-color: darkred"></div>
              </el-col>
              <el-col style="width: 80px;">
                <span>当前团队已选择</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <div style="height: 100px;width: 160px;">
      </div>
    </el-card>
      </el-col>
      <el-col style="width: 300px;">
        <el-card style="width: 250px;height: 300px;">
          <span style="font-size: 20px;">选座结果</span><br/><br/>
          <div class="choose-team-and-person">
            <el-select v-model="tID" placeholder="请选择团队名称"  @change="showMem()">
              <el-option
                v-for="(item,index) in allTeams"
                :key="index"
                :label="item.team_name"
                :value="item.teamId">
              </el-option>
            </el-select>
            <div style="height: 10px;"></div>
            <el-select v-model="studentSelected" placeholder="请选择团队成员">
              <el-option
                v-for="(item,index) in memTable"
                :key="index"
                :label="item.studentName"
                :value="item.studentId"
                >
              </el-option>
            </el-select>
          </div>
          <div style="height: 10px;"></div>
          <span>当前为{{name}}选择座位</span><br/>
          <span>选中的座位为{{classroomSelected}}教室{{seatSelected}}座</span>
          <div style="height: 15px;"></div>
          <el-button type="primary" @click="selectSeat">确认选座</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>

  import leftSeat from '../ApplyManage/Seats/StuSeatLeft'
  import rightSeat from '../ApplyManage/Seats/StuSeatRight'
    export default {
        name: "TeamIn",
      components:{
        leftSeat,
        rightSeat
      },
      data(){
          return{
            studentSelected:'',
            key:false,
            key1:true,
            loading:false,
            allTeams:[],
            memTable:[],
            ssVisible:false,   //选座弹窗是否可见
            seatForm:{
              room_no:[
                {no:211,},
                {no:213,},
                {no:304},
                {no:306},
                ],
              seat_no: [
                [],[],[],[]
              ],
            },

            rNO:0,   //选择弹窗房间号
            sNO:0,   //选择弹窗座位号
            memIndex:0,       //当前选座学生的索引
            tID:'选择团队',   //被选中团队id,

            seats_213:[],
            seats_210:[],
            seats_104:[],
            index:0,
            allTeamId:0,
            isLeft:true,
            isSeatSelected:false,
            name:'',
            classroomSelected:'213',
            seatSelected:'201',
            classrooms:[
              {
                id:'213'
              },
              {
                id:'212/210'
              },
              {
                id:'104'
              }
            ]
          }
      },
        created(){
          let _this=this;
          this.$axios({            //所有团队列表
            method:'get',
            url:'/TeamManagement/getTeamList',
            params:{
              page:1,
            }
          }).then(function (response) {
              _this.$data.loading=false;
              _this.$data.allTeams=response.data.formalTeams;
          });

          this.$axios({
            method:'get',
            url:'/formalTeam/getSeatMes',
            params:{
              room_no:213,
            }
          }).then(function (res) {
            _this.$data.seats_213=res.data
          })
          this.$axios({
            method:'get',
            url:'/formalTeam/getSeatMes',
            params:{
              room_no:210,
            }
          }).then(function (res) {
            _this.$data.seats_210=res.data
          })
          this.$axios({
            method:'get',
            url:'/formalTeam/getSeatMes',
            params:{
              room_no:104,
            }
          }).then(function (res) {
            _this.$data.seats_104=res.data
          })

      },
      methods:{
        selectSeat(){
          // console.log(this.$data.studentSelected);
          let _this=this;
          this.$axios({
            method:'get',
            url:'/formalTeam/chooseSeat',
            params:{
              student_id:this.$data.studentSelected,
              team_id:this.$data.allTeamId,
              seat_no:this.$data.seatSelected,
              root_no:this.$data.classroomSelected
            }
          }).then(function (response) {
            alert('选座成功！');
            _this.$router.push({path:'/transitionPage',query:{p:'/assessment',select:'second'}})
          })



        },
        changeStatus(data){     //选择座位
          console.log('22');
          if(data.status===true){
            this.$data.isSeatSelected=true;
            this.$data.seatSelected=data.seatInfo;
          }else{
            this.$data.isSeatSelected=false;
            this.$data.seatSelected='无';
          }
        },
        changeClassroom(){    //变换教室

        },
        showMem(){             //团队成员列表
          let _this=this;
          this.$axios({
            method:'get',
            url:'/formalTeam/getStuWithoutSeat',
             params:{
               team_id:_this.$data.tID,
             }
          }).then(function (response) {
            _this.$data.memTable=response.data;
            _this.$data.allTeamId=response.data[0].teamId;

          });
          this.$axios({
            method:'get',
            url:'/formalTeam/getSeatMes',
            params:{
              room_no:213,
              team_id:_this.$data.tID,
            }
          }).then(function (res) {
            console.log(res.data);
            _this.$data.seats_213=res.data


          })
        },

        // selectSeat(index,rows){        //选座
        //   this.$data.seatForm.seat_no=[[],[],[],[]];
        //   let me=this;
        //   this.$axios({
        //     method:'get',
        //     url:'/formalTeam/getSeatWithoutStu',
        //   }).then(function (response) {
        //     for(let temp of response.data)
        //     {
        //       if(temp.root_no===211)                 //为座位号分房间
        //         me.$data.seatForm.seat_no[0].push({no:temp.seat_no,});
        //       else if(temp.root_no===213)                 //为座位号分房间
        //         me.$data.seatForm.seat_no[1].push({no:temp.seat_no,});
        //       else if(temp.root_no===304)                 //为座位号分房间
        //         me.$data.seatForm.seat_no[2].push({no:temp.seat_no,});
        //       else if(temp.root_no===306)                 //为座位号分房间
        //         me.$data.seatForm.seat_no[3].push({no:temp.seat_no,});
        //     }
        //   });
        //   this.$data.memIndex=index;
        //   this.$data.ssVisible=true;
        // },
        submitUpdate(rows,index){                //确定选座


            let _this=this;
            this.$axios({                       //分配座位
              method:'get',
              url:'/formalTeam/chooseSeat',
              params:{
                student_id:_this.$data.memTable[_this.$data.memIndex].studentId,
                team_id:_this.$data.memTable[_this.$data.memIndex].teamId,
                root_no:_this.$data.rNO,
                seat_no:_this.$data.sNO,
              }
            });
            this.$data.ssVisible=false;
            this.$message({
              type: 'success',
              message: '选座成功!'
            });
          rows.splice(index, 1);               //列表内消除已选学生

        },
        cancelUpdate(){                //取消选座
          this.$data.ssVisible=false;
        },
        tableRowClassName({row, rowIndex}) {      //表格样式背景色
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
      }
    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .contain{
    margin-left: 80px;
    margin-top: 40px;
  }

</style>
