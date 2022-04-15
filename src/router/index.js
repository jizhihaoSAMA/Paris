import Vue from 'vue'
import VueRouter from 'vue-router'
import BaiduMap from 'vue-baidu-map'

import publicRoutes from './public/index'
import userRoutes from './user/index'

Vue.use(VueRouter)
Vue.use(BaiduMap, {
  ak: 'GuLG3i04QqFumR5IskjmlqGBkcL828X8'
})

const routes = [
  ...publicRoutes,
  ...userRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.required_auth) {
    next('/login')
  } else {
    next()
  }
})

export default router
