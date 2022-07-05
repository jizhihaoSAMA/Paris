import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BaiduMap from 'vue-baidu-map'
import { VueJsonp } from 'vue-jsonp'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueJsonp)
Vue.prototype.toast = function (title, info, varient = 'default') {
  return this.$root.$bvToast.toast(
    info, { title, varient }
  )
}

Vue.prototype.AK = 'GuLG3i04QqFumR5IskjmlqGBkcL828X8'
Vue.prototype.$log = console.log
Vue.prototype.$alert = alert
Vue.prototype.backApi = 'http://localhost:8081/api'

Vue.use(BaiduMap, {
  ak: 'GuLG3i04QqFumR5IskjmlqGBkcL828X8'
})

Vue.use(VueAxios, axios)

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.config.silent = true
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
