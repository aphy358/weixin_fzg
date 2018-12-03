import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import wechatPlugin from './plugins/vue-wechat-plugin'
import Home from './views/Home/home.vue'

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        wechatAuth: false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        wechatAuth: false
      },
    },
    {
      path: '/citySelect',
      name: 'citySelect',
      component: () => import('./views/CitySelect/citySelect.vue'),
      meta: {
        wechatAuth: false
      },
    },
    {
      path: '/hotelList',
      name: 'hotelList',
      component: () => import('./views/HotelList/hotelList.vue'),
      meta: {
        wechatAuth: false
      },
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


Vue.use(Router)


// 微信授权插件初始化
Vue.use(wechatPlugin, {
  router, // 路由实例对象
  appid: 'wxdc97f923fbec8173', // 您的微信appid wx41041c8613e4b4b0
  responseType: 'code', // 返回类型，请填写code
  scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  redirectUri: 'http://sej7jf.natappfree.cc', //微信回调地址http://mzfsnv.natappfree.cc
  getCodeCallback (next, code) {
    // 用户同意授权后回调方法
    // code：用户同意授权后，获得code值
    // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
    // next： 无论access_token是否获取成功,一定要调用该方法
    // next说明：next方法接收两个参数
    // 参数1(必填，切换到的路由地址，空字符串为当前路由，指定切换对象 next('/') 或者 next({ path: '/' })
    // 参数2为通过code值请求后端获取access_token的结果，true或者false，默认为false
    axios.get('/autoLoginWx.do', {//code  ---  openid ---  user    // 通过code值换取access_token后端接口地址
      params: {
        code,
        state: ''
      },
    }).then(response => {
      let data = response.data.data
      let user = data.customerUser; //后端返回的获取accessToken成功或失败，布尔型
      if (user) {
        next('', user); // 获取access_toeken成功
      } else {
        next('/login'); // 获取access_token失败
      }
    }).catch(() => {
      next('/login'); // ajax出现错误
    })
  },
})


export default router
