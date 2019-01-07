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
						<span class="item-txt">入住日期</span>
						<span class="item-con">{{orderInfo.beginDate}}</span>
					</li>
					<li>
						<span class="item-txt">订单状态</span>
						<span class="item-con deep-orange">{{orderInfo.status === -1 ? '未向客户确认' : orderInfo.status === 0 ? '已向客户确认' : orderInfo.status === 1 ? '已向客户拒单' : orderInfo.status === 2 ? '申请取消中' : orderInfo.status === 3 ? '不能取消' : orderInfo.status === 4 ? '已取消' : ''}}</span>
					</li>
					<li>
						<span class="item-txt">到店时间</span>
						<span class="item-con">{{beginDate.split(' ')[0]}} 11:00 - {{endDate.split(' ')[0]}} 12:00</span>
					</li>
					<li>
						<span class="item-txt">取消条款</span>
						<span class="item-con red">{{clauseDesc}}</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">价格详情</p>
				<ul class="per-module-list multi-price-info" v-for="(item, index) in orderDetailsInfoList" :key="'priceInfo' + index">
					<li>
						<span class="item-txt">房型</span>
						<span class="item-con">{{item.roomName}} ( {{item.rateName}} ) </span>
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
						<span class="item-txt">间数</span>
						<span class="item-con">{{item.acount}}</span>
					</li>
					<li>
						<span class="item-txt">价格列表</span>
						<span class="item-con gold" v-for="(v, i) in item.detailsInfo" :key="'priceList' + i">{{v[0]}}：￥{{v[1]}}</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">酒店信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">名称</span>
						<span class="item-con blue">{{staticInfo.infoName}}</span>
					</li>
					<li>
						<span class="item-txt">地址</span>
						<span class="item-con">{{staticInfo.address}}</span>
					</li>
					<li>
						<span class="item-txt">电话</span>
						<span class="item-con">{{staticInfo.phone}}</span>
					</li>
					<li>
						<span class="item-txt">传真</span>
						<span class="item-con">{{staticInfo.fax}}</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">联系信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">姓名</span>
						<span class="item-con">dh</span>
					</li>
					<li>
						<span class="item-txt">电话</span>
						<span class="item-con">13427649347</span>
					</li>
					<li>
						<span class="item-txt">Email</span>
						<span class="item-con">fgghnoi@fuhg.ds</span>
					</li>
					<li>
						<span class="item-txt">国籍</span>
						<span class="item-con">中国</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import {queryString} from '@/assets/util';
  
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
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    created(){
      let _this = this;
      this.$api.myCenter.syncOrderDetail({orderId: queryString('orderId')}).then(res => {
        if (res.returnCode === 1){
          _this.orderCode = res.data.orderCode;
          _this.clauseDesc = res.data.clauseDesc;
          _this.orderInfo = res.data.orderInfo;
          _this.beginDate = res.data.orderInfo.beginDate;
          _this.endDate = res.data.orderInfo.endDate;
          _this.staticInfo = res.data.staticInfo;
          _this.orderDetailsInfoList = res.data.orderDetailsInfoList;
        }
      })
    },
    
    computed: {},
    
    methods: {}
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