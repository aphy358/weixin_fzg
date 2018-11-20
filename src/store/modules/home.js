import { _setCommonState } from "@/assets/util"

export default {
  namespaced: true,

  state: {
    keyword: '',
    cityId: '',

    hotelId: '',

    priceRange: '',

    // 星级价格 popup
    starPopupVisible: false,

    checkedStar: '',

  },

  getters: {
  },

  mutations: {
    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },

  },

  actions: {
    
  },
}