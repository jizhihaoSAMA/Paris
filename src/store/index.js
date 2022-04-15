import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/user';

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
  modules: {
    userModule,
  },
})
