import Vue from 'vue'
import vueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/blog-home.css'
import './assets/css/bootstrap.css'

import Axios from 'axios'
import VueAxios from 'vue-axios'




Vue.config.productionTip = false
Vue.use(vueMeta)
Vue.use(VueAxios,Axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
