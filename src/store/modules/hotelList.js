import { _setCommonState } from "@/assets/util"

export default {
  namespaced: true,

  state: {
    // 当前分页为第几页
    pageNow: '1',

    keyword: '',

    hotelId: '',

    // 星级价格 popup
    starPopupVisible: false,

    // 行政区、商圈 popup
    areaBizPopupVisible: false,

    // 入离日期选择框 popup
    checkincheckoutPopupVisible: false,

    // 选中的行政区
    checkedArea: [],

    // 选中的商圈
    checkedBiz: [],

    // 分别表示入离日期选择弹出 pop 的显示状态
    openPicker1: false,
    openPicker2: false,

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