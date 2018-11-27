import Vue from 'vue'
import Vuex from 'vuex'
import { addDays, _setCommonState } from "@/assets/util"

// 引入各个子模块
import home from './modules/home'
import hotelList from './modules/hotelList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityType: '0',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),

    cityId: '',
    priceRange: '',
    checkedStar: '',
  },

  mutations: {
    // 设置城市类型，如：'国内'、'港澳台'、'国外'
    setCityType(state, cityType){
      state.cityType = cityType

      state.roomNum = '1'
      state.adultNum = '2'
      state.childrenNum = '0'
      state.childrenStr = ''

      state.checkin = cityType == 3 
        ? addDays(new Date, 1) 
        : addDays(new Date, 0)

      state.checkout = cityType == 3 
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
  },
})
