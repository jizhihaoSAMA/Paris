import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabs: [
      {
        title: '首页',
        href: '/',
      },
      {
        title: '租房',
        href: '/index/house',
      },
      {
        title: '商业办公',
        href: '/index/office',
      },
      {
        title: '发布房源',
        href: '/post',
      },
      {
        title: '工具',
        href: '/tool',
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
