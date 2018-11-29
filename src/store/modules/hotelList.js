import { _setCommonState } from "@/assets/util"

export default {
  namespaced: true,

  state: {
    keyword: '',

    hotelId: '',

    // 星级价格 popup
    starPopupVisible: false,

    // 行政区、商圈 popup
    areaBizPopupVisible: false,

    // 选中的行政区
    checkedArea: [],

    // 选中的商圈
    checkedBiz: [],

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