import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "@/store"

import publicRoutes from './public/index'
import userRoutes from './user/index'
import adminRoutes from './admin/index'

Vue.use(VueRouter)

const routes = [
  ...publicRoutes,
  ...userRoutes,
  ...adminRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.required_auth) {
    if (store.state.userModule.userInfo) {
      next()
    } else {
      alert(
        "请登陆后再试"
      )
      next('/login')
    }
  }
  else if (to.meta.required_admin) {
    if (store.state.adminModule.adminInfo) {
      next()
    } else {
      alert("您不是管理员")
      next('/admin/login')
    }
  }
  else {
    next()
  }
})

export default router
