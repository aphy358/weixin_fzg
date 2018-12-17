import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import api from "./api"
import VeeValidate from 'vee-validate';
import wx from 'weixin-js-sdk'

import 'mint-ui/lib/style.css'
import '@/assets/fonts/iconfont.css'
import '@/assets/base.scss'
import '@/assets/resetMintUI.scss'

Vue.use(Mint)
Vue.use(api)
Vue.use(VeeValidate, { validity: true });
Vue.config.productionTip = false

// 全局变量 historyObj，用于保存页面状态
// historyObj.arr 存的是当前 history 对象里存在的所有页面路径
// historyObj.preLen 表示页面跳转之前，history 里的页面个数
// 当每次页面跳转的时候，只要比较 historyObj.arr.length 和 historyObj.preLen 的大小，就知道页面是 forward 还是 back 了。
window.historyObj = {
  arr: [{path: 'home'}],
  preLen: 1
}

window.wx = wx

api.common.syncInitJSSDK({url: encodeURIComponent(location.href.split('#')[0])}).then(res => {
  if(res.returnCode == 1){
    let data = res.data

    wx.config({
      debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId : data.appId, // 必填，公众号的唯一标识
      timestamp : data.timestamp, // 必填，生成签名的时间戳
      nonceStr : data.nonceStr, // 必填，生成签名的随机串
      signature : data.signature,// 必填，签名，见附录1
      jsApiList : ['updateAppMessageShareData', 'updateTimelineShareData', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  }
})

wx.ready(function(){
  store.commit('setCommonState', {k: 'wx_ready', v: true})
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
