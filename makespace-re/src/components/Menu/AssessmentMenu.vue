<template>
  <div id="Assessment">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="管理申请" name="first">
        <apply-manage></apply-manage>
      </el-tab-pane>
      <el-tab-pane label="办理入驻" name="second">
        <div class="row">
          <el-tabs type="card" :stretch="true" >
            <el-tab-pane label="选座" >
              <!--<el-row :gutter="4" style="width: 100%;" >-->
                <!--<el-col :span="8" v-for="(item,index) in buttonData" :key="index">-->
                  <!--&lt;!&ndash;<el-button style="width: 50%;margin-top: 15px;background-color: #72fcff">{{item.room}}<br/><br/>{{item.number}}</el-button>&ndash;&gt;-->
                  <!--<div style="height: 30px"></div>-->
                  <!--<div class="location-top" >{{item.room}}</div>-->
                  <!--<div class="location">{{item.number}}</div>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <team-in></team-in>
            </el-tab-pane>
            <el-tab-pane label="录入考勤号" >
              <attendance-number></attendance-number>
            </el-tab-pane>
            <el-tab-pane label="入驻文件">
              <div style="height: 30px;"/>
              <div>
                <el-table
                  :data="tableData"
                  stripe>
                  <el-table-column
                    align="left"
                    prop="teamName"
                    label="团队名">
                  </el-table-column>
                  <el-table-column
                    prop="entryNotice"
                    align="left"
                    label="入驻通知书">
                    <template slot-scope="scope">
                      <span style="color: deepskyblue"><a>入驻通知书</a></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="left"
                    prop="security"
                    label="安全承诺书">
                    <template slot-scope="scope">
                      <span style="color: deepskyblue"><a>安全承诺书</a></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="left"
                    label="">
                    <template slot-scope="scope">
                      <el-button size="medium" style="background-color: white;color:#182F63;border:1.6px solid #182f63;transition: background-color 2s">确认签署</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="中期审核" name="third">
        中期审核
      </el-tab-pane>
      <el-tab-pane label="期满审核" name="forth">
        期满审核
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ApplyManage from '../ApplyManage/ApplyManage'
  import TeamIn from '../ApplyManage/TeamIn'
  import AttendanceNumber from '../ApplyManage/AttendenceNoEnter'
    export default {
        name: "Assessment",
      components:{
        ApplyManage,
        TeamIn,
        AttendanceNumber
      },
      created(){
        if(this.$route.query.select==='first'){
          this.$data.activeName='first'
        }else{
          this.$data.activeName='second';
        }
      },
      data(){
          return{
            activeName:'',
            tableData: [{
              teamName: '创客管理平台',
              entryNotice: '1',
              security: '1'
            }
            ],
            buttonData:[
              {room:'201',
                number:'15'
              },
              {
                room: '210',
                number: '25'
              },
              {
                room:'205',
                number:'36'
              },
              {
                room:'304',
                number:'60'
              }
            ]
          }
      }
    }
</script>

<style lang="less">
  #Assessment {

    .location-top{
      background-color: cornflowerblue;
      padding-bottom: 10px;
      padding-top: 10px;
      margin-top: 10px;
      margin-right: 30px;
      margin-left: 30px;
      text-align: center;
      color: white;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }


    .location{
      background-color: #ffffff;
      padding-bottom: 10px;
      padding-top: 10px;
      margin-right: 30px;
      margin-left: 30px;
      text-align: center;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom: 2px solid cornflowerblue;
      border-left: 2px solid cornflowerblue;
      border-right: 2px solid cornflowerblue;
    }


    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__header.is-top {
      border-bottom: 2px solid #182F63;
      margin-top: 10px;
    }
    .el-tabs__item {
      /*background-color: #182F63;*/
      background-color: white;
      color: #182F63;
      /*border-width: 2px;*/
      /*border-color: #182F63;*/
      border-radius: 40px 40px 40px 40px;
      margin-right: 1%;
      margin-left: 1%;
      font-weight: bold;
      box-sizing: border-box;
      border: 2px solid #182F63;

    }
    .el-tabs__nav {
      border: none;
    }

    .el-tabs__item.is-active {
      background-color: #182F63;
      color: white;
    }

    .page-header{
      /* background: #00FF00;*/
      font-family: "STSong";
      font-size:20px;
      line-height: 20px;
      text-align: left;
      padding-bottom: 9px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: rgb(238,238,238);
    }
    .row{
      padding-top: 20px;
    }
    .el-row {
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
  }

</style>
