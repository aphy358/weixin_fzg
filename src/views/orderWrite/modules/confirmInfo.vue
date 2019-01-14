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
  import { gotoPage } from '@/assets/util';
  
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
        this.$store.dispatch('orderWrite/checkOrder');
//        gotoPage(this.$router, 'orderPay', {type: 'hotelOrder'})
      },
      cancel(){
        this.$emit('close');
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