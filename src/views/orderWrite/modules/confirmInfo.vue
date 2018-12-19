<!-- 组件说明 -->
<template>
	<div class="confirm-info">
		<h6 class="confirm-title">订单详情</h6>
		<div class="confirm-txt">
			<div class="per-line">
				<span class="per-line-title">酒店名</span>
				<span class="per-line-txt">深圳海燕大酒店</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">房型</span>
				<span class="per-line-txt">豪华双床房[双床]</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">入住日期</span>
				<span class="per-line-txt">2018-12-09/2018-12-10</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">预订间数</span>
				<span class="per-line-txt">1间</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">入住人</span>
				<span class="per-line-txt">测试</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">确认方式</span>
				<span class="per-line-txt">手机号：13537820062</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">支付方式</span>
				<span class="per-line-txt">单结</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">特殊需求</span>
				<span class="per-line-txt"></span>
			</div>
			<div class="per-line">
				<span class="per-line-title">取消条款</span>
				<span class="per-line-txt">此房即订即保，一旦预订，不可修改或取消</span>
			</div>
			<div class="per-line">
				<span class="per-line-title">订单金额</span>
				<span class="per-line-txt">RMB<span class="total-pay orange">417.90</span>元</span>
			</div>
		</div>
		<div class="operation-btn">
			<button class="confirm">确认</button>
			<button class="cancel" @click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'confirmInfo',
    
    data() {
      return {
        hotelName: '深圳海燕大酒店',
        roomType: '豪华双床房[双床]',
        date: '2018-12-09/2018-12-10',
        roomNum: 1,
        name: '测试',
        confirmWay: '手机号：13537820062',
        payWay: '单结',
        specialReq: '',
        cancelInfo: '此房即订即保，一旦预订，不可修改或取消',
        totalPay: 'RMB417.90元',
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
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