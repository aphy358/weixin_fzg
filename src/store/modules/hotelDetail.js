import { _setCommonState } from "@/assets/util"

export default {
  namespaced: true,

  state: {
    // 成人小孩 popup
    adultChildPopupVisible: false,
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