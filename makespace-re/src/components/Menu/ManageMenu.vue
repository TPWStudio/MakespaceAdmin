<template>
  <div id="manage">
  <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
    <el-tab-pane label="导师管理" name="first">
      <teacher-manage></teacher-manage>
    </el-tab-pane>
    <el-tab-pane label="团队管理" name="second">
      <team-manage></team-manage>
    </el-tab-pane>
    <el-tab-pane label="历史团队" name="third">
      <history-team></history-team>
    </el-tab-pane>
    <el-tab-pane label="资源管理" name="forth">资源管理</el-tab-pane>

  </el-tabs>
  </div>
</template>

<script>
  import TeamManage from '../TeamManage/TeamManage'
  import TeacherManage from '../TeacherManage'
  import HistoryTeam from '../TeamManage/HistoryTeam'


    export default {
        name: "ManageMenu",
      components:{
          TeamManage,
        TeacherManage,
        HistoryTeam
      },
      mounted(){
        let _this=this;
        // this.$notify({
        //   title:'提示',
        //   message:  '亲爱的管理员!您在团队管理处有新的待处理的消息',
        //   duration:0
        // })

      }
    }
</script>

<style lang="less">
#manage {

  .el-tabs__header{
    margin-bottom: 0;
  }
  .el-tabs__header.is-top{
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
  .el-tabs__nav{
    border: none;
  }

.el-tabs__item.is-active {
  background-color: #182F63;
  color: white;
}

}
</style>
