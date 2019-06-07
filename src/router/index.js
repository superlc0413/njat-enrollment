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

// 所有路由的映射表
const map_routes = {
  "enroll-notice": {
    component: EnrollNotice,
    title: '报名须知'
  },
  "enroll-entry": {
    component: EnrollEntry,
    title: '报名入口'
  },
  "single-enroll": {
    component: SingleEnroll,
    title: '个人报名'
  },
  "coupe-enroll": {
    component: CoupeEnroll,
    title: '双人报名'
  },

  "family-enroll": {
    component: FamilyEnroll,
    title: '亲子报名'
  },
  "enroll-success": {
    component: EnrollSuccess,
    title: '报名成功'
  },
  "order-list": {
    component: OrderList,
    title: '我的订单'
  },
  "enroll-over": {
    component: EnrollOver,
    title: '报名截止'
  }
}

// 报名进行中的路由
const routes_enrolling = [
  "enroll-notice",
  "enroll-entry",
  "single-enroll",
  "coupe-enroll",
  "family-enroll",
  "enroll-success",
  "order-list",
]
// 报名结束后的路由
const routes_enrollEnd = [
  "enroll-over"
]
// 用特定的路由配置列表生成vue路由
const routes = []
routes_enrolling.forEach(key => {
  const option = map_routes[key]
  if (option) {
    routes.push({
      path: '/' + key,
      name: key,
      component: option.component,
      meta: {
        title: option.title
      }
    })
  }
})

// 特殊路由
routes.push(
  {
    path: '/',
    name: 'default',
    component: routes[0].component,
    meta: {
      title: routes[0].meta.title
    }
  },
  {
    path: '/404',
    name: '404',
    component: Page404,
    meta: {
      title: '找不到该页',
    }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: '找不到该页',
    }
  }
)

const myRouter = new Router({ routes })

myRouter.afterEach((to, from) => {
  document.title = to.meta.title
})

export default myRouter
