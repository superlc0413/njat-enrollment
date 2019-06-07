import Vue from 'vue'
import Router from 'vue-router'
import EnrollEntry from '@/card/enroll-entry/enroll-entry'
import EnrollNotice from '@/card/enroll-notice/enroll-notice'
import SingleEnroll from '@/card/single-enroll/single-enroll'
import FamilyEnroll from '@/card/family-enroll/family-enroll'
import CoupeEnroll from '@/card/coupe-enroll/coupe-enroll'
import EnrollSuccess from '@/card/enroll-success/enroll-success'
import OrderList from '@/card/order-list/order-list'
import EnrollOver from '@/card/enroll-over/enroll-over'
import Page404 from '@/card/404/404'

Vue.use(Router)

// 报名进行中的路由配置
const routes_enrolling = [
  {
    code: 'enroll-notice',
    component: EnrollNotice,
    ch: '报名须知'
  },
  {
    code: 'enroll-entry',
    component: EnrollEntry,
    ch: '报名入口'
  },
  {
    code: 'coupe-enroll',
    component: CoupeEnroll,
    ch: '双人报名'
  },
  {
    code: 'single-enroll',
    component: SingleEnroll,
    ch: '个人报名'
  },
  {
    code: 'family-enroll',
    component: FamilyEnroll,
    ch: '亲子报名'
  },
  {
    code: 'enroll-success',
    component: EnrollSuccess,
    ch: '报名成功'
  },
  {
    code: 'order-list',
    component: OrderList,
    ch: '我的订单'
  }
]

// 报名结束后的路由配置
const routes_enrollEnd = [
  {
    code: 'order-list',
    component: EnrollOver,
    ch: '我的订单'
  },
  {
    code: 'enroll-over',
    component: Page404,
    ch: '报名截止'
  }
]

const routes = routes_enrolling.reduce((arr, _) => {
  arr.push({
    path: '/' + _.code,
    name: _.code,
    component: _.component,
    meta: {
      ch: _.ch
    }
  })
  return arr
}, [])

// 功能性路由
routes.push(
  {
    path: '/',
    name: 'default',
    component: routes[0].component,
    meta: {
      ch: routes[0].meta.ch
    }
  },
  {
    path: '/404',
    name: '404',
    component: Page404,
    meta: {
      ch: '找不到该页'
    }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      ch: '404'
    }
  }
)

const myRouter = new Router({ routes })

myRouter.afterEach((to, from) => {
  document.title = to.meta.ch
})

export default myRouter
