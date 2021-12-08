import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabs: [
      {
        title: '首页',
        href: '/',
        name: 'home',
      },
      {
        title: '租房',
        href: '/index/house',
        name: 'house',
      },
      {
        title: '商业办公',
        href: '/index/office',
        name: 'office',
      },
      {
        title: '发布房源',
        href: '/post',
        name: 'post',
      },
      {
        title: '工具',
        href: '/tool',
        name: 'tool',
      },
    ],
    
  },
  mutations: {},
  actions: {},
  modules: {},
})
