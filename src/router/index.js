import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import wechatPlugin from '@/plugins/vue-wechat-plugin'
import Home from '@/views/Home/home.vue'
import ebRouter from './ebRouter'
import qnbRouter from './qnbRouter'

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        wechatAuth: false
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/citySelect',
      name: 'citySelect',
      component: () => import('@/views/CitySelect/citySelect.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/hotelList',
      name: 'hotelList',
      component: () => import('@/views/HotelList/hotelList.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/hotelDetail',
      name: 'hotelDetail',
      component: () => import('@/views/HotelDetail/hotelDetail.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/checkinCheckout',
      name: 'checkinCheckout',
      component: () => import('@/views/CheckinCheckout/CheckinCheckout.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/orderWrite',
      name: 'orderWrite',
      component: () => import('@/views/orderWrite/orderWrite.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/orderPay',
      name: 'orderPay',
      component: () => import('@/views/orderPay/orderPay.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/myCenter',
      name: 'myCenter',
      component: () => import('@/views/myCenter/myCenter.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/hotelOrderList',
      name: 'hotelOrderList',
      component: () => import('@/views/hotelOrderList/hotelOrderList.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('@/views/orderDetail/orderDetail.vue'),
      meta: {
        wechatAuth: true
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/register.vue'),
      meta: {
        wechatAuth: true
      },
    }
  ].concat(ebRouter).concat(qnbRouter),
})


Vue.use(Router)


// 微信授权插件初始化
Vue.use(wechatPlugin, {
  router, // 路由实例对象
  appid: 'wx41041c8613e4b4b0', // 测试appid： wxdc97f923fbec8173
  responseType: 'code', // 返回类型，请填写code
  scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  // redirectUri: 'http://aphy358.natapp1.cc', //微信回调地址http://aphy358.natapp1.cc
  getCodeCallback (next, code, pageType) {
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
      console.log(pageType);
      
      if(response.status == 200 && response.data.returnCode == 1){
        let data = response.data.data
        let user_wx = data.customerUser
        let user_eb = data.supCustomerUser
        let user_qnb = data.qnbUser

        if(user_wx)   window.sessionStorage.setItem('user_wx', JSON.stringify(user_wx))
        if(user_eb)   window.sessionStorage.setItem('user_eb', JSON.stringify(user_eb))
        if(user_qnb)   window.sessionStorage.setItem('user_qnb', JSON.stringify(user_qnb))

        if(pageType == 2){
          user_eb ? next() : next('/ebLogin')
        }else if(pageType == 3){
          user_qnb ? next() : next('/qnblogin')
        }else{
          user_wx ? next() : next('/login')
        }
      }
    }).catch(() => {
      next('/login'); // ajax出现错误
    })
  },
})


export default router
