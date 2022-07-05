import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/user';
import adminModule from './module/admin'
import storageService from '@/request/storageService'

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
        href: '/postHouse',
        name: 'post',
      },
      {
        title: '地图找房',
        href: '/index/map',
        name: 'map',
      },
      {
        title: '房屋趋势',
        href: '/index/hot',
        name: 'hot',
      }
    ],
    showRightNavbar: storageService.get("showRightNavbar") != null ? storageService.get("showRightNavbar") : 'true',
  },
  mutations: {
    setRightNavbar (state, val) {
      storageService.set("showRightNavbar", val)
      state.showRightNavbar = String(val)
    },
  },
  actions: {},
  modules: {
    userModule,
    adminModule,
  },
})
