<!-- 组件说明 -->
<template>
	<div class="order-list">
		<div class="per-order" v-for="(item, index) in orderList" :key="index">
			<p class="order-title clearfix">
				<span class="hotel-name fl">{{item.hotelName}}</span>
				<span class="fr read-detail">查看详情<i class="fr iconfont icon-right-c1"></i></span>
			</p>
			<div class="order-info">
				<p class="room-type">高级房</p>
				<p>订单号：AA181210388827</p>
				<p>入住日期：2018-10-20</p>
				<p>离店日期：2018-10-21</p>
				<p>
					<span class="canceled">已取消</span>
				</p>
				<span class="order-total">￥1916.25</span>
			</div>
			<div class="operate-order">
				<button>取消订单</button>
				<button>去支付</button>
			</div>
		</div>
		
		
	</div>
</template>

<script>
  export default {
    name: 'orderList',
    
    data() {
      return {
        orderList: [
          {
            hotelName: '深圳东华假日酒店'
          },
          {
            hotelName: '深圳东华假日酒店'
          },
          {
            hotelName: '深圳东华假日酒店'
          },
        ],
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
    }
  }
</script>

<style scoped lang="scss">
	.order-list{
		padding: 0.2rem 0.1rem;
		margin-bottom: 0.2rem;
		
		@at-root .per-order{
			background-color: #fff;
			padding: 0 0.1rem;
			font-size: 0.14rem;
			margin-bottom: 0.1rem;
			/*box-shadow: 0 0 2px #b9b9bd;*/
			
			@at-root .order-title{
				height: 0.5rem;
				line-height: 0.5rem;
				border-bottom: 0.5px solid #eeeeee;
				
				.read-detail{
					margin-right: 0.1rem;
					color: #4293ff;
				}
			}
			
			@at-root .order-info{
				padding: 0.1rem;
				position: relative;
				font-size: 0.12rem;
				
				>p{
					line-height: 0.3rem;
					color: #666666;
				}
				
				.room-type{
					font-size: 0.14rem;
				}
				
				.order-total{
					position: absolute;
					right: 0.1rem;
					top: 0.16rem;
					color: #ff7625;
					font-size: 0.14rem;
				}
			}
			
			
			@at-root .operate-order{
				padding: 0rem 0.1rem 0.2rem;
				text-align: right;
				
				>button{
					height: 0.28rem;
					background-color: transparent;
					border: 1px solid #c7b27f;
					color: #c7b27f;
					border-radius: 4px;
					
					&:first-child{
						margin-right: 0.2rem;
					}
				}
			}
		}
		
	}
	
	.canceled{
		background-color: #fff5ec;
		color: #ff592c;
		display: inline-block;
		height: 0.24rem;
		line-height: 0.24rem;
		padding: 0 0.1rem;
	}
</style>