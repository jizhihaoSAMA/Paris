import Vue from 'vue'
import VueRouter from 'vue-router'

import publicRoutes from './public/index'
import userRoutes from './user/index'

Vue.use(VueRouter)

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
  if(to.meta.required_auth){
    next('/login')
  } else {
    next()
  }
})

export default router
