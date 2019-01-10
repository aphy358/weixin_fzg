import Vue from 'vue'
import Router from 'vue-router'
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
        wechatAuth: true
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
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: () => import('@/views/personalInfo/personalInfo.vue'),
      meta: {
        wechatAuth: true
      },
    }
  ].concat(ebRouter).concat(qnbRouter),
})

Vue.use(Router)

export default router
