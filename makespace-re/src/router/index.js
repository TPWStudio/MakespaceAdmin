import Vue from 'vue'
import Router from 'vue-router'
import TeacherManage from '../components/TeacherManage'
import TeamManage from '../components/TeamManage/TeamManage'
// import Home from '../components/Home'
import TeamInfo from '../components/TeamManage/TeamInfo'
import ManageMenu from '../components/Menu/ManageMenu'
import AssessmentMenu from '../components/Menu/AssessmentMenu'
import HistoryTeam from '../components/TeamManage/HistoryTeam'
import MessageCenter from '../components/MessageCenter'
import ReleaseNew from '../components/ReleaseNew'
import TransitionPage from '../components/ApplyManage/TransitionPage'
// import HomeFirst from '../components/HomeFirst'
// import testHome from '../components/testHomePage'
import ApplyManage from '../components/ApplyManage/ApplyManage'
import TeamIn from '../components/ApplyManage/TeamIn'
import Attendance from '../components/ApplyManage/AttendenceNoEnter'
import SendEmail from '../components/TeamManage/SendEmail'
import EmailModels from '../components/EmailModels'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/EmailModels',
      component:EmailModels
    },
    {
      path:'/SendEmail',
      component:SendEmail
    },
    {
      path:'/transitionPage',
      component:TransitionPage
    },
    {
      path:'/ApplyManage',
      component:ApplyManage
    },
    {
      path:'/TeamIn',
      component:TeamIn
    },
    {
      path:'/Attendance',
      component:Attendance
    },
    {
      path:'/',
      component:MessageCenter
    },
    {
      path:'/Release',
      component:ReleaseNew
    },
    {
      path:'/teamInfo',
      component:TeamInfo
    },
    {
      path:'/manage',
      component:ManageMenu
    },
    {
      path:'/assessment',
      component:AssessmentMenu
    },
    {
      path:'/historyTeam',
      component:HistoryTeam
    },
    {
      path:'/MessageCenter',
      component:MessageCenter
    }
  ]
})
