import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msg'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORÁRIO!!!!

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwibmFtZSI6Ik1hdXJpY2lvIFNjYWdsaW9uZSIsImVtYWlsIjoibWF1cmljaW8uc2NhZ2xpb25lQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1OTg4OTUzMTksImV4cCI6MTU5OTE1NDUxOX0.h6_9W04KI9RP2ZHvH_8hD16LNFZAYypVPJd6Jme7yg8'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')