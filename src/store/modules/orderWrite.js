import { _setCommonState,queryString } from "@/assets/util"
import API from '@/api'
import { gotoPage,goBackPage } from '@/assets/util'
import { MessageBox, Toast } from 'mint-ui'

export default {
  namespaced: true,
  
  state : {
    checkin: '',
    checkout: '',
    // supplierId : '',
    roomNum: 1,
    dateNum: 1,
    stock: 7,
    roomCost: '',
    taxesAndFeesRMB: 0,
    payTotalMoney: 0,
    balance: 0,
    // willUsedBalance: 0,
    //
    // breakfastData : {},
    // breakfastDates : [],
    // bedData : {},
    // bedDates : [],
    // netData : {},
    // netDates : [],
    
    surchargeBref: [],
    surchargeBed: [],
    surchargeInternet: [],
  
    maxPersonNum: 3,
  
    totalBreakfastPrice : 0,
    totalBedPrice : 0,
    totalNetworkPrice : 0,
    
    
    content: {},
    distributor: {},
    hotelPrice: {},
    staticInfo: {},
    isHasMarketing : 0,
    marketing: {},
    specialConditions: [],
    // specialReq : [],
    paymentTerm: 1,
    // dialogTableVisible : false,
    orderInfo: {},
    bedTypeList: [],
  
    orderParams: {}
  },
  
  
  mutations : {
    
    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },
  },
  
  
  actions : {
    //验价
    checkOrder({ commit, state, dispatch }, payload){
  
      let content = state.content;
      let orderInfo = state.orderInfo;
      let bedTypeStrs = '';
      if (orderInfo.bedType){
        bedTypeStrs = window.JSON.stringify({
          bedTypeId: orderInfo.bedType,
          bedTypeName: orderInfo.bedTypeName
        });
      }else{
        bedTypeStrs = content.bedTypeStrs;
      }
      let params = {
        roomNum: state.roomNum,
        checkType: 3,
        voucherEmail: orderInfo.email,
        voucherFax: '',
        voucherMobile: orderInfo.tel,
        customerOrderCode: '',
        staticInfoId: content.staticInfo.staticInfoId,
        country: content.staticInfo.country,
        supplierId: content.supplierId,
        hotelName: content.staticInfo.infoName,
        adultNum: content.adultNum,
        childrenNum: +content.childrenNum,
        childrenAgeStr: content.childrenAgeStr,
        isQueryPrice: '',
        roomId: content.roomId,
        startDate: content.startDate,
        endDate: content.endDate,
        dateNum: content.dateNum,
        rateType: content.rateType,
        paymentType: content.paymentType,
        paymentTerm: orderInfo.paymentTerm,
//          willUsedBalance: 0,
        surchargeBref: window.JSON.stringify(state.surchargeBref),
        surchargeBed: window.JSON.stringify(state.surchargeBed),
        surchargeInternet: window.JSON.stringify(state.surchargeInternet),
        userNames: orderInfo.nameParams,
        payTotalMoney: content.payTotalMoney,
        toatlBasePrice: content.toatlBasePrice,
        totalNowPrice: content.nowTotalMoney,
        specialRequire: orderInfo.specialReq,
        bedTypeStrs: bedTypeStrs,
        hotelPriceStrs: window.JSON.stringify(content.hotelPrice || null),
//          timeToHotel: 18,
        isHasMarketing: content.isHasMarketing || 0,
        isJustCheckSameOrder: 1,
        willUsedBalance: payload ? payload.v : 0
      };
  
      if(params.isHasMarketing === 1){
        params['marketing.marketingPrice'] = content.marketingObj.marketingPrice || 0;
        params['marketing.startTime'] = content.marketingObj.startTime;
        params['marketing.endTime'] = content.marketingObj.endTime;
    
        if (content.marketing.isPack === 1){
          //小礼包客户填写的信息
          params['marketingRemark'] = '客户手机号码：' + orderInfo.marketingTel;
        }
      }
  
      state.orderParams = params;
      API.orderWrite.syncProductCheck(params).then(function (res) {
        // if (typeof data === 'string') {
        //   data = window.JSON.parse(data);
        // }
        //
        if (res.success) {
          //如果有错误信息，则提示用户
          // dispatch('saveOrder');
          dispatch('saveOrder');
          
          
        //
        // } else {
        //   //用户登录状态已丢失时，提示用户
        //   if (data.errcode === 'notLogin') {
        //     payload.$alert('请先登录', '系统提示', {
        //       confirmButtonText: '确定',
        //       callback: action => {
        //         payload.$router.push('/')
        //       }
        //     });
        //   } else {
        //     //提示用户错误信息，然后跳转到酒店详情页面
        //     payload.$alert(data.errinfo, '系统提示', {
        //       confirmButtonText: '确定',
        //       callback: action => {
        //         payload.$router.push('hotelList')
        //       }
        //     });
        //   }
        }
      })
    },
    
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

      if (params.isHasMarketing === '1'){
        params['marketing.marketingPrice'] = queryString('marketingPrice');
        params['marketing.startTime'] = queryString('startTime').replace(/\s+/g, ' ');
        params['marketing.endTime'] = queryString('endTime').replace(/\s+/g, ' ');
      }

      API.orderWrite.syncProductInfo(params).then(function (res) {
        if (res.returnCode === 1) {
          //如果请求成功，先判断content有没有报错信息
          if (res.data.errorMsg) {
            MessageBox.confirm(res.errinfo).then(() => {
              gotoPage(vueCase, 'hotelList');
            })
          }else if (res.data.isAveragePriceRMBChange && res.data.isAveragePriceRMBChange === 1){
            //价格有变动时提醒客户（特殊情况（查价接口没有错误信息返回，但属于提示的一种，且不是弹出框，而是确认框））
            MessageBox.confirm('最新价格为：￥' + res.data.payTotalMoney + '，是否需要继续预订？').then(() => {
              goBackPage(vueCase.$router)
            })
          }

          //再判断酒店是否为客人前台现付方式，如果是，不让客户进入页面
          if (res.data.paymentType === 1) {
            MessageBox.confirm('该产品已下线，请选择其他产品').then(() => {
              gotoPage(vueCase, 'hotelList');
            })
          }


          let content = res.data;
          state.content = content;
          state.hotelPrice = content.hotelPrice;
          state.distributor = content.distributor;
          state.staticInfo = content.staticInfo;
          state.bedTypeList = content.hotelPrice.bedTypeList;

          state.dateNum = content.dateNum;
          state.stock = content.stock;
          state.specialConditions = content.specialReq;
          state.paymentType = content.paymentType;
          state.taxesAndFeesRMB = content.taxesAndFeesRMB;
          state.payTotalMoney = content.payTotalMoney;
          state.balance = content.balance;

          state.roomCost = Math.round((content.payTotalMoney - content.taxesAndFeesRMB)*100)/100;

          if (content.hasOwnProperty('isHasMarketing') && content.isHasMarketing === '1'){
            state.isHasMarketing = 1;
            state.marketing = content.marketing;
          }

        }else{
          MessageBox.alert(res.returnMsg).then(() => {
            gotoPage(vueCase, 'hotelList');
          });
        }

      })
    },
    //
    // /*
    // * typeId 1：加早；2：加床；3：加宽带
    // * */
    // getExtraInfo({ commit, state, dispatch }, payload){
    //   let params = {
    //     startDate  : state.checkin,
    //     endDate    : state.checkout,
    //     infoId     : queryString('staticInfoId'),
    //     suppId     : queryString('supplierId'),
    //     roomtypeId : queryString('roomId'),
    //     roomNum    : state.roomNum,
    //     typeId     : payload['typeId']
    //   };
    //
    //   API.orderWrite.getExtraInfo(params).then(function (data) {
    //     if (data.result === 'success'){
    //       if (payload['typeId'] === 1){
    //         dispatch('setExtraData', {
    //           data : data.data,
    //           dataIndex : 'breakfastData',
    //           datesIndex : 'breakfastDates'
    //         });
    //       }else if (payload['typeId'] === 2){
    //         dispatch('setExtraData', {
    //           data : data.data,
    //           dataIndex : 'bedData',
    //           datesIndex : 'bedDates'
    //         });
    //       }else if (payload['typeId'] === 3){
    //         dispatch('setExtraData', {
    //           data : data.data,
    //           dataIndex : 'netData',
    //           datesIndex : 'netDates'
    //         });
    //       }
    //     }
    //
    //   })
    // },
    //
    // setExtraData({ commit, state, dispatch }, payload) {
    //   payload.data.forEach(function (v, i) {
    //     let key = v[0].date.split(' ')[0];
    //     state[payload.dataIndex][key] = v
    //   });
    //
    //   for (let k in state[payload.dataIndex]) {
    //     state[payload.datesIndex].push({
    //       value: k,
    //       label: k
    //     });
    //   }
    // },
    //
    // //确认订单信息
    confirmOrderInfo({ commit, state, dispatch }, payload){
      if (payload){
        commit('setCommonState', payload);

        commit('setCommonState', {
          k : 'dialogTableVisible',
          v : true
        });
      }
    },
    //
    // //成单
    saveOrder({ commit, state, dispatch }, payload){
      state.orderParams.isJustCheckSameOrder = 0;
      API.orderWrite.syncSaveOrder(state.orderParams).then(function (data) {
        if (data.returnCode === 1){
          if (state.content.paymentType === 0 && state.orderInfo.paymentTerm !== 0){
            //直接成单
          }else{
            //进入支付
            let param = {
              orderCode: data.data.orderInfo.parentOrderCode,
              fee: state.orderInfo.totalPay * 100,
              balance: window.parseInt(state.orderParams.willUsedBalance * 100)
            };
            API.orderWrite.syncPayStart(param).then(res => {
              if(res.success){
                let payParam = {
                  appId: res.content.appId,     //公众号名称，由商户传入
                  timeStamp: res.content.timeStamp,         //时间戳，自1970年以来的秒数
                  nonceStr: res.content.nonceStr, //随机串
                  package: res.content.prepayId,
                  signType:"MD5",         //微信签名方式：
                  paySign: res.content.paySign //微信签名
                };
                window.WeixinJSBridge.invoke('getBrandWCPayRequest', payParam, function(res){
              
                  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  if(res.err_msg === "get_brand_wcpay_request：ok" ) {
                  }
                });
                //显示支付成功
                Toast('支付成功');
              }else{
                Toast(res.errinfo);
              }
            });
          }
        }
      })
    }
    
  },
  
  getters : {
  
  }
}