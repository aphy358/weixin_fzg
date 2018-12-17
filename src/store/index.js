import Vue from 'vue'
import Vuex from 'vuex'
import { addDays, _setCommonState } from "@/assets/util"

// 引入各个子模块
import home from './modules/home'
import hotelList from './modules/hotelList'
import hotelDetail from './modules/hotelDetail'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 默认深圳
    cityId: '70002',
    cityText: '深圳',
    cityType: '0',

    keyword: '',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),
    
    priceRange: '',
    checkedStar: '',

    // 用于标记微信 jssdk 是否初始化成功
    wx_ready: false,
  
    //订单填写页
    maxPersonNum: 3,

    // 最近一次被点击的酒店信息，用于酒店详情页的展示
    curHotel: null,
  },

  mutations: {
    // 设置城市类型，如：'国内'、'港澳台'、'国外'
    setCityType(state, cityType){
      state.cityType = cityType

      state.roomNum = '1'
      state.adultNum = '2'
      state.childrenNum = '0'
      state.childrenStr = ''

      state.checkin = cityType == 1
        ? addDays(new Date, 1) 
        : addDays(new Date, 0)

      state.checkout = cityType == 1
        ? addDays(new Date, 2) 
        : addDays(new Date, 1)
    },

    // 设置入离日期
    setDate(state, dateRange){
      state.checkin = addDays(dateRange[0])
      state.checkout = addDays(dateRange[1])
    },

    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },
  },

  actions: {

  },

  modules: {
    home,
    hotelList,
    hotelDetail,
  },
})
