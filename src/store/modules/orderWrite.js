import { _setCommonState,queryString } from "@/assets/util"
import API from '@/api'
import { gotoPage,goBackPage } from '@/assets/util'
import { MessageBox, Toast, Indicator } from 'mint-ui'

export default {
  namespaced: true,
  
  state : {
    checkin: '',
    checkout: '',
    roomNum: 1,
    dateNum: 1,
    stock: 7,
    roomCost: '',
    taxesAndFeesRMB: 0,
    payTotalMoney: 0,
    balance: 0,
    addBreakfastList: [],
    addBedList: [],
    addNetworkList: [],
    
    surchargeBref: [],
    surchargeBed: [],
    surchargeInternet: [],
  
    maxPersonNum: 0,
  
    totalBreakfastPrice : 0,
    totalBedPrice : 0,
    totalNetworkPrice : 0,
    
    
    content: {},
    distributor: {},
    hotelPrice: {},
    staticInfo: {},
    isHasMarketing : 0,
    specialConditions: [],
    paymentTerm: '',
    orderInfo: {},
    bedTypeList: [],
  
    orderParams: {},
    startParams: {},
  
    orderSuccessVisible: false,
    orderId: '',
  },
  
  
  mutations : {
    
    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },
  },
  
  
  actions : {
    //初始化部分数据
    initData({ commit, state, dispatch }, payload){
      state.checkin = queryString("startDate");
      state.checkout = queryString("endDate");
      state.roomNum = +queryString("roomNum");
      // state.supplierId = queryString("supplierId");
    },
    // //查价
    getProductInfo({ commit, state, dispatch }, payload){
      let isRoomNumChange = 0;

      if (payload && payload.k === 'roomNum'){
        commit('setCommonState', {
          roomNum: payload.v.roomNum
        });

        isRoomNumChange = 1;
      }
  
      let vueCase = payload.v.vueCase;
      //请求页面中用于显示信息的数据
      let params = {
        childrenAgeStr : queryString('childrenAgeStr'),
        childrenNum    : queryString('childrenNum'),
        adultNum       : queryString('adultNum'),
        citytype       : queryString('citytype'),
        isQueryPrice   : queryString('isQueryPrice'),
        rateType       : queryString('rateType'),
        breakFastId    : queryString('breakFastId'),
        roomNum        : state.roomNum,
        paymentType    : queryString('paymentType'),
        hotelId        : queryString('hotelId'),
        supplierId     : queryString('supplierId'),
        startDate      : state.checkin,
        endDate        : state.checkout,
        roomId         : queryString('roomId'),
        staticInfoId   : queryString('staticInfoId'),
        isHasMarketing : queryString('isHasMarketing') || 0,
        isRoomNumChange: isRoomNumChange,
        hotelPriceStrs : decodeURIComponent(sessionStorage.getItem('hotelPriceStr')),
      };

      // if (params.isHasMarketing === '1'){
      //   params['marketing.marketingPrice'] = queryString('marketingPrice');
      //   params['marketing.startTime'] = queryString('startTime').replace(/\s+/g, ' ');
      //   params['marketing.endTime'] = queryString('endTime').replace(/\s+/g, ' ');
      // }

      API.orderWrite.syncProductInfo(params).then(function (res) {
        Indicator.close();
        if (res.returnCode === 1) {
          //如果请求成功，先判断content有没有报错信息
          if (res.data.errorMsg) {
            MessageBox.alert(res.data.errorMsg).then(() => {
              gotoPage(vueCase.$router, 'hotelList');
            })
          }else if (res.data.isAveragePriceRMBChange && res.data.isAveragePriceRMBChange === 1){
            //价格有变动时提醒客户（特殊情况（查价接口没有错误信息返回，但属于提示的一种，且不是弹出框，而是确认框））
            MessageBox.confirm('最新价格为：￥' + res.data.payTotalMoney + '，是否需要继续预订？').then(() => {
            
            }).catch(() => function () {
              goBackPage(vueCase.$router)
            });
          }

          //再判断酒店是否为客人前台现付方式，如果是，不让客户进入页面
          if (res.data.paymentType === 1) {
            MessageBox.alert('该产品已下线，请选择其他产品').then(() => {
              gotoPage(vueCase.$router, 'hotelList');
            })
          }


          let content = res.data;
          state.content = content;
          state.hotelPrice = content.hotelPrice;
          state.distributor = content.distributor;
          state.staticInfo = content.staticInfo;
          state.bedTypeList = content.hotelPrice.bedTypeList;
          state.maxPersonNum = content.hotelPrice.maxPersonNum;

          state.dateNum = content.dateNum;
          state.stock = content.stock;
          state.specialConditions = content.specialReq;
          state.paymentType = content.paymentType;
          state.taxesAndFeesRMB = content.taxesAndFeesRMB;
          state.payTotalMoney = content.payTotalMoney;
          state.balance = content.balance;

          state.roomCost = Math.round((content.payTotalMoney - content.taxesAndFeesRMB)*100)/100;
  
          state.isHasMarketing = queryString('isHasMarketing') || 0;

        }else{
          setTimeout(function () {
            gotoPage(vueCase.$router, 'hotelList');
          },3000);
        }

      })
    },
    // //确认订单信息
    confirmOrderInfo({ commit, state, dispatch }, payload){
      if (payload){
        commit('setCommonState', payload);
      }
    },
    
  },
  
  getters : {
  
  }
}