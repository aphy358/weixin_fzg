<!-- 组件说明 -->
<template>
	<div class="page order-detail">
		<mt-header title="订单详情"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content order-detail-list">
			<div class="per-module">
				<p class="per-module-title">订单信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">订单编号</span>
						<span class="item-con blue">{{orderCode}}</span>
					</li>
					<li>
						<span class="item-txt">下单日期</span>
						<span class="item-con">{{orderInfo.createTime}}</span>
					</li>
					<li>
						<span class="item-txt">付款方式</span>
						<span class="item-con">{{orderInfo.paymentType === 0 ? '预付' : '现付'}}</span>
					</li>
					<li>
						<span class="item-txt">结算周期</span>
						<span class="item-con">{{['客人前台现付','单结','周结','半月结','月结','不固定','三日结','十日结','额度结'][orderInfo.paymentTerm + 1]}}</span>
					</li>
					<li>
						<span class="item-txt">订单金额</span>
						<span class="item-con gold">￥{{orderInfo.salePrice}}</span>
					</li>
					<li>
						<span class="item-txt">订单状态</span>
						<span class="item-con deep-orange">{{['待处理','已确认','已拒单','申请取消中','无法取消','已取消'][orderInfo.innerStatus + 1]}}</span>
					</li>
					<li v-if="payStatusVisible">
						<span class="item-txt">支付状态</span>
						<span class="item-con deep-orange">{{payStatusText}}</span>
					</li>
					<li>
						<span class="item-txt">取消条款</span>
						<span class="item-con red">{{clauseDesc}}</span>
					</li>
					<li v-if="specialStr">
						<span class="item-txt">特殊需求</span>
						<span class="item-con">{{specialStr}}</span>
					</li>
				</ul>
			</div>
			<div class="multi-box" v-for="(item, index) in orderDetailsInfoList" :key="'priceInfo' + index">
				<div class="per-module">
					<p class="per-module-title">预订信息</p>
					<ul class="per-module-list multi-price-info">
						<li>
							<span class="item-txt">入住人</span>
							<span class="item-con">{{item.userStr}}</span>
						</li>
						<li>
							<span class="item-txt">房型</span>
							<span class="item-con">{{item.roomName}}</span>
						</li>
						<li>
							<span class="item-txt">床型</span>
							<span class="item-con">{{item.bedTypeName}}</span>
						</li>
						<li>
							<span class="item-txt">早餐</span>
							<span class="item-con">{{item.breakfastName}}</span>
						</li>
						<li>
							<span class="item-txt">入离日期</span>
							<span class="item-con">{{item.beginDate}}至{{item.endDate}}</span>
						</li>
						<li>
							<span class="item-txt">入住晚数</span>
							<span class="item-con">{{item.dateNum}}晚</span>
						</li>
						<li>
							<span class="item-txt">总间夜</span>
							<span class="item-con">{{item.acount}}间夜</span>
						</li>
						<li>
							<span class="item-txt">价格详情</span>
							<span class="item-con gold">{{item.priceStr}}</span>
						</li>
						<li>
							<span class="item-txt">合计(含杂费)</span>
							<span class="item-con red">￥{{item.salePrice}}</span>
						</li>
					</ul>
				</div>
				<div class="per-module" v-if="item.breakfastStr || item.bedStr || item.netStr">
					<p class="per-module-title">杂费</p>
					<ul class="per-module-list">
						<li v-if="item.breakfastStr">
							<span class="item-txt">加早</span>
							<span class="item-con">{{item.breakfastStr}}</span>
						</li>
						<li v-if="item.bedStr">
							<span class="item-txt">加床</span>
							<span class="item-con">{{item.bedStr}}</span>
						</li>
						<li v-if="item.netStr">
							<span class="item-txt">加宽带</span>
							<span class="item-con">{{item.netStr}}</span>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="per-module">
				<p class="per-module-title">联系信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">电话</span>
						<span class="item-con">{{customerUser.mobilePhone}}</span>
					</li>
					<li>
						<span class="item-txt">Email</span>
						<span class="item-con">{{customerUser.email}}</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">酒店信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">名称</span>
						<span class="item-con blue">{{orderInfo.itemName}}</span>
					</li>
					<li>
						<span class="item-txt">地址</span>
						<span class="item-con">{{staticInfo.address}}{{staticInfo.addressEng ? '(' + staticInfo.addressEng + ')' : ''}}</span>
					</li>
					<li v-if="staticInfo.phone">
						<span class="item-txt">总部电话</span>
						<span class="item-con">{{staticInfo.phone}}</span>
					</li>
					<li v-if="staticInfo.bookingPhone">
						<span class="item-txt">预订部电话</span>
						<span class="item-con">{{staticInfo.bookingPhone}}</span>
					</li>
					<li>
						<span class="item-txt">传真</span>
						<span class="item-con">{{staticInfo.fax}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import {queryString} from '@/assets/util';
  import { Indicator } from 'mint-ui'
  
  export default {
    name: 'orderDetail',
    
    data() {
      return {
        orderCode: '',
        clauseDesc: '',
        orderInfo: {},
        staticInfo: {},
        beginDate: '',
        endDate: '',
        orderDetailsInfoList: [],
        customerUser: {},
        specialStr: '',
        payStatusText: '',
        payStatusVisible: true
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
  
    activated(){
      this.initData();
    },
    
    computed: {},
    
    methods: {
      initData(){
        let _this = this;
        Indicator.open('查询中...');
        this.$api.myCenter.syncOrderDetail({orderId: queryString('orderId')}).then(res => {
          Indicator.close();
          if (res.returnCode === 1){
            _this.orderCode = res.data.orderCode;
            _this.clauseDesc = res.data.clauseDesc;
            _this.orderInfo = res.data.orderInfo;
            _this.beginDate = res.data.orderInfo.beginDate;
            _this.endDate = res.data.orderInfo.endDate;
            _this.staticInfo = res.data.staticInfo;
            _this.customerUser = res.data.customerUser;
            //特殊需求
            let specialArr = res.data.specialRequire;
            let str = '';
            if (specialArr && specialArr.length > 0){
              for (let i = 0; i < specialArr.length; i++) {
                let item = specialArr[i];
                str += item + '，'
              }
              _this.specialStr = str.replace(/，$/, '');
            }
            
            //支付状态
            let o = res.data.orderInfo;
            if (o.paymentTerm == 0){
              if (o.refunded == null){
                _this.payStatusText = o.paymentStatus === 0 ? '已支付' : o.paymentStatus === 1 ? '未支付' : '挂账';
              }else{
                let payObj = {'0':'未支付','1':'已退款','2':'已支付','3':'退款中','-1':'退款失败','-2':'支付失败','4':'已支付','-4':'支付失败','5':'已支付','-5':'支付失败'};
                _this.payStatusText = payObj[o.refunded];
              }
            }else{
              _this.payStatusVisible = false;
            }
      
            let orderDetailsArr = res.data.orderDetailsInfoList;
            for (let index = 0; index < orderDetailsArr.length; index++) {
              let outer = orderDetailsArr[index];
        
              //入住人信息
              outer.userStr = '';
              for (let i1 = 0; i1 < outer.orderUserList.length; i1++) {
                let v1 = outer.orderUserList[i1];
                if (v1.hasOwnProperty('nationality') && v1.nationality) {
                  outer.userStr += v1.userName + ' [ ' + v1.nationality + ' ] 、';
                } else {
                  outer.userStr += v1.userName + '、';
                }
              }
              outer.userStr = outer.userStr.replace(/、$/, '');
        
              //价格详情
              outer.priceStr = '';
              for (let i2 = 0; i2 < outer.detailsInfo.length; i2++) {
                let v2 = outer.detailsInfo[i2];
                outer.priceStr += v2['0'] + '（RMB ' + v2['1'] + ' * ' + v2['2'] + ' 间），'
              }
              outer.priceStr = outer.priceStr.replace(/，$/, '');
        
              //加早
              outer.breakfastStr = '';
              if (outer.orderSurchargeList['1'] && outer.orderSurchargeList['1'].length > 0){
                for (let i3 = 0; i3 < outer.orderSurchargeList['1'].length; i3++) {
                  let v3 = outer.orderSurchargeList['1'][i3];
                  outer.breakfastStr += v3.startTime.split(' ')[0] + '至' + v3.endTime.split(' ')[0] + '（' + v3.breakfastName + v3.sellReal + '份），';
                }
                outer.breakfastStr = outer.breakfastStr.replace(/，$/, '');
              }
        
              //加床
              outer.bedStr = '';
              if (outer.orderSurchargeList['2'] && outer.orderSurchargeList['2'].length > 0){
                for (let i4 = 0; i4 < outer.orderSurchargeList['2'].length; i4++) {
                  let v4 = outer.orderSurchargeList['2'][i4];
                  outer.bedStr += v4.startTime.split(' ')[0] + '至' + v4.endTime.split(' ')[0] + '（' + v4.breakfastName + v4.sellReal + '份），';
                }
                outer.bedStr = outer.bedStr.replace(/，$/, '');
              }
        
              //加宽带
              outer.netStr = '';
              if (outer.orderSurchargeList['3'] && outer.orderSurchargeList['3'].length > 0){
                for (let i5 = 0; i5 < outer.orderSurchargeList['3'].length; i5++) {
                  let v5 = outer.orderSurchargeList['3'][i5];
                  outer.netStr += v5.startTime.split(' ')[0] + '至' + v5.endTime.split(' ')[0] + '（' + v5.sellReal + '份），';
                }
                outer.netStr = outer.netStr.replace(/，$/, '');
              }
            }
            _this.orderDetailsInfoList = orderDetailsArr;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
	.order-detail{
		padding-bottom: 0.2rem;
		
		
		.order-detail-list{
			padding: 0.2rem;
			
			@at-root .per-module{
				margin-bottom: 0.2rem;
				
				.per-module-title{
					height: 0.16rem;
					line-height: 0.16rem;
					font-size: 0.16rem;
					margin-bottom: 0.16rem;
					border-left: 4px solid #818a0b;
					color: #818a0b;
					padding-left: 0.08rem;
				}
				
				@at-root .per-module-list{
					
					&.multi-price-info{
						border-bottom: 0.5px dashed #666666;
						
						&:last-child{
							border-bottom: none;
						}
					}
					>li{
						line-height: 0.32rem;
						font-size: 0.12rem;
						display: flex;
						color: #323232;
						
						.item-txt{
							display: inline-block;
							width: 1rem;
							color: #979797;
						}
						
						.item-con{
							display: inline-block;
							flex: 1;
						}
					}
				}
			}
		}
	}
	
	.blue{
		color: #154ca4;
	}
	
	.deep-orange{
		color: #ff4400;
	}
	
	.gold{
		color: #ffa105;
	}
	
	.red{
		color: red;
	}
</style>