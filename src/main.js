import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.prototype.toast = function (title, info, varient = 'default') {
  return this.$bvToast.toast(
    info, { title, varient }
  )
}

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.config.silent = true
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
