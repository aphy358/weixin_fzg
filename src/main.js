import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import api from "./api"

// import wx from 'weixin-js-sdk'

import 'mint-ui/lib/style.css'
import '@/assets/fonts/iconfont.css'
import '@/assets/base.css'
import '@/assets/resetMintUI.scss'

Vue.use(Mint)
Vue.use(api)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
