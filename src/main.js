import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import api from "./api"

// import wx from 'weixin-js-sdk'

import 'mint-ui/lib/style.css'
import '@/assets/fonts/iconfont.css'
import '@/assets/base.scss'
import '@/assets/resetMintUI.scss'

Vue.use(Mint)
Vue.use(api)
Vue.config.productionTip = false

// 全局变量 historyObj，用于保存页面状态
// historyObj.arr 存的是当前 history 对象里存在的所有页面路径
// historyObj.preLen 表示页面跳转之前，history 里的页面个数
// 当每次页面跳转的时候，只要比较 historyObj.arr.length 和 historyObj.preLen 的大小，就知道页面是 forward 还是 back 了。
window.historyObj = {
  arr: ['/'],
  preLen: 1
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
