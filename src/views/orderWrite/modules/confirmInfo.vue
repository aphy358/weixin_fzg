<!-- 组件说明 -->
<template>
	<div class="confirm-info">
		<h6 class="confirm-title">订单详情</h6>
		<div class="confirm-txt">
			<div class="per-line">
				<span class="per-line-title">酒店名</span>
				<span class="per-line-txt">{{orderInfo.hotelName}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">房型</span>
				<span class="per-line-txt">{{orderInfo.roomType}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">入住日期</span>
				<span class="per-line-txt">{{orderInfo.date}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">预订间数</span>
				<span class="per-line-txt">{{orderInfo.roomNum}}间</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">入住人</span>
				<span class="per-line-txt">{{orderInfo.name}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">确认方式</span>
				<span class="per-line-txt">手机号：{{orderInfo.tel}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">支付方式</span>
				<span class="per-line-txt">{{orderInfo.payWay}}</span>
			</div>
			<div class="per-line" v-if="orderInfo.specialReq">
				<span class="per-line-title">特殊需求</span>
				<span class="per-line-txt">{{orderInfo.specialReq}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">取消条款</span>
				<span class="per-line-txt">{{orderInfo.cancelInfo}}</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">订单金额</span>
				<span class="per-line-txt">RMB<span class="total-pay orange">{{orderInfo.totalPay}}</span>元</span>
			</div>
		</div>
		<div class="operation-btn">
			<button class="confirm" @click="confirm">确认</button>
			<button class="cancel" @click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
  import { mapState } from 'vuex'
  import { gotoPage, goBackPage, replacePage, addDays } from '@/assets/util';
  import { MessageBox, Indicator } from 'mint-ui'
  
  export default {
    name: 'confirmInfo',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {},
    
    computed: mapState({
      orderInfo: state => state.orderWrite.orderInfo,
    }),
    
    methods: {
      confirm(){
        this.$emit('close');
        Indicator.open('验价中...');
        //验价、下单
        let _this = this;
  
        let content = this.$store.state.orderWrite.content;
        let orderInfo = this.$store.state.orderWrite.orderInfo;
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
          roomNum: this.$store.state.orderWrite.roomNum,
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
          startDate: addDays(_this.$store.state.orderWrite.checkin),
          endDate: addDays(_this.$store.state.orderWrite.checkout),
          dateNum: content.dateNum,
          rateType: content.rateType,
          paymentType: content.paymentType,
          paymentTerm: orderInfo.paymentTerm,
          willUsedBalance: orderInfo.useBalance,
          surchargeBref: window.JSON.stringify(this.$store.state.orderWrite.surchargeBref),
          surchargeBed: window.JSON.stringify(this.$store.state.orderWrite.surchargeBed),
          surchargeInternet: window.JSON.stringify(this.$store.state.orderWrite.surchargeInternet),
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
  
        this.$api.orderWrite.syncProductCheck(params).then(function (res) {
          
          Indicator.close();
          if (res.returnCode === 1){
            if (res.data.result === 'success') {
  
              //保存订单
              _this.saveOrder(params);
            } else {
              if(res.data.errtype === "sameOrder"){
                //已有重复订单情况下，提示用户
                MessageBox.confirm(res.data.errinfo + '，是否继续下单？').then(() => {
                  _this.saveOrder(params);
                });
              }else{
                MessageBox.alert(res.data.errinfo,{closeBtn: 0},function () {
                  //跳转到指定页面
                  goBackPage(_this.$router);
                });
              }
            }
          }
        })
      },
      cancel(){
        this.$emit('close');
      },
      saveOrder(params){
        let _this = this;
        let content = this.$store.state.orderWrite.content;
        let orderInfo = this.$store.state.orderWrite.orderInfo;
        let agreement = this.$store.state.orderWrite.content.agreement;
        params.isJustCheckSameOrder = 0;
        Indicator.open('下单中...');
        _this.$api.orderWrite.syncSaveOrder(params).then(function (data) {
          Indicator.close();
          if (data.returnCode === 1){
            if ((content.paymentType === 0 && orderInfo.paymentTerm !== 0 && agreement.status === 0) || +params.willUsedBalance === _this.orderInfo.totalPay){
              //直接成单
//              MessageBox.alert('下单成功').then(action => {
//                replacePage(_this.$router, 'orderDetail', {orderId: data.data.orderId,});
//              });
              
              _this.$store.commit('orderWrite/setCommonState', {k: 'orderSuccessVisible', v: true});
              _this.$store.commit('orderWrite/setCommonState', {k: 'orderId', v: data.data.orderId});
            }else{
              //进入支付
              replacePage(_this.$router, 'orderPay', {orderId: data.data.orderId,});
        
            }
          }else{
            if (data.returnCode === -400203 || data.returnCode === -400210 || data.returnCode === -400212 || data.returnCode === -400214 || data.returnCode === -400215){
              //这些情况只需要提示用户即可，不需要做其他操作
              MessageBox.alert(data.returnMsg);
            }else{
              //跳转到详情页
              goBackPage(_this.$router);
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
	.confirm-info{
		width: 96%;
		height: auto;
		max-height: 9rem;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 4px;
		
		@at-root .confirm-title{
			height: 0.4rem;
			line-height: 0.4rem;
			background-color: #ff6666;
			font-size: 0.14rem;
			color: #ffffff;
			border-radius: 4px 4px 0 0;
			text-align: center;
		}
		
		@at-root .confirm-txt{
			padding: 0.2rem;
			
			.per-line{
				line-height: 0.32rem;
				display: flex;
				
				.per-line-title{
					display: inline-block;
					width: 0.8rem;
					color: #979797;
				}
				
				.per-line-txt{
					display: inline-block;
					flex: 1;
					color: #565656;
				}
				
				.total-pay{
					font-size: 0.14rem;
					font-weight: bold;
				}
			}
		}
		
		@at-root .operation-btn{
			border-top: 0.5px solid #c3c3c3;
			
			button{
				height: 0.4rem;
				line-height: 0.4rem;
				text-align: center;
				color: #099FDE;
				width: 50%;
				border: none;
				background-color: #fff;
			}
			.confirm{
				border-right: 0.5px solid #c3c3c3;
				border-radius: 0 0 0 4px;
			}
			.cancel{
				border-radius: 0 0 4px 0;
			}
		}
	}
</style>