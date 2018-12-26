<!-- 组件说明 -->
<template>
	<div class="page hotel-order-list">
		
		<mt-header title="我的订单">
			<mt-button slot="right" @click="showFilter">筛选</mt-button>
		</mt-header>
		<GoBack _style="top: 0.02rem" />
		
		
		<div class="page-content">
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
		</div>
		
		
		<div class="filter-mask" v-show="filterVisible" @click="hideFilter"></div>
		<ul class="filter-panel" :style="'right:' + (filterVisible ? '0' : '-2.9rem')">
			<li>
				<span class="filter-type">酒店名</span>
				<input type="text" placeholder="请输入酒店名" v-model="params.itemName">
			</li>
			<li>
				<span class="filter-type">入离日期</span>
				<input type="date" placeholder="选择入住日期" v-model="params.beginDate">
				<input type="date" placeholder="选择离店日期" v-model="params.endDate">
			</li>
			<li>
				<span class="filter-type">订单号</span>
				<input type="text" placeholder="请输入订单号" v-model="params.orderCode">
			</li>
			<li>
				<span class="filter-type">客户订单号</span>
				<input type="text" placeholder="请输入客户订单号">
			</li>
			<li>
				<span class="filter-type">入住人</span>
				<input type="text" placeholder="请输入入住人" v-model="params.userName">
			</li>
			<li>
				<span class="filter-type">预订员</span>
				<select name="orderMan" id="orderMan" title="预订员">
					<option value="0">全选</option>
					<option value="1">测试</option>
				</select>
			</li>
			<li>
				<span class="filter-type">订单状态</span>
				<select name="orderStatus" id="orderStatus" title="订单状态" v-model="params.innerStatus">
					<option value="">全选</option>
					<option value="-1">待处理</option>
					<option value="0">已确认</option>
					<option value="1">已拒单</option>
					<option value="2">申请取消中</option>
					<option value="3">不能取消</option>
					<option value="4">已取消</option>
				</select>
			</li>
			<li>
				<span class="filter-type">支付状态</span>
				<select name="payStatus" id="payStatus" title="支付状态" v-model="params.paymentStatus">
					<option value="">全选</option>
					<option value="-1">挂账</option>
					<option value="0">已支付</option>
					<option value="1">待付款</option>
					<option value="2">退款中</option>
					<option value="3">已退款</option>
					<option value="4">退款失败</option>
				</select>
			</li>
			<li>
				<button class="reset" @click="reset">重置</button>
				<button class="ensure" @click="ensure">确认</button>
			</li>
		</ul>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
//  import orderList from './modules/orderList.vue';
  
  export default {
    name: '',
    
    data() {
      return {
        filterVisible: true,
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
        params: {
//          itemName: '',
//          beginDate: '',
//          endDate: '',
//          orderCode: '',
//          userName: '',
//          innerStatus: '',
//          paymentStatus: ''
        }
      }
    },
    
    props: {},
    
    components: {
      GoBack,
//      orderList
    },
    
    computed: {},
    
    methods: {
      showFilter(){
        this.filterVisible = true;
      },
      hideFilter(){
        this.filterVisible = false;
      },
      reset(){
        this.params = {};
      },
      ensure(){
        this.filterVisible = false;
        this.$api.myCenter.syncOrderList(this.params).then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
	.page-content{
		background-color: #efeff4;
		
		@at-root .order-list{
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
	}
	
	
	@at-root .filter-mask{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.3;
		z-index: 10001;
	}
	
	@at-root .filter-panel{
		position: fixed;
		top: 0;
		right: -2.9rem;
		width: 2.5rem;
		height: 100%;
		background-color: #fff;
		z-index: 10002;
		padding: 0.1rem 0 0.1rem 0.1rem;
		transition: all 0.2s;
		font-size: 0.12rem;
		
		>li{
			line-height: 0.5rem;
			display: flex;
			
			.filter-type{
				display: inline-block;
				width: 0.62rem;
				text-align: right;
			}
			
			>input,>select{
				flex: 1;
				/*height: 0.26rem;*/
				padding: 0 0.1rem;
				border-radius: 0;
				box-sizing: border-box;
				border: none;
				line-height: 0.5rem;
			}
			
			.reset{
				margin: 0.3rem 0.3rem 0 0.3rem;
				background-color: #92bddb;
				color: #ffffff;
				border-radius: 4px;
				border: none;
				/*margin-right: 0.4rem;*/
				height: 0.32rem;
				padding: 0 0.2rem;
				/*flex: 1;*/
			}
			
			.ensure{
				margin-top: 0.3rem;
				background-color: #ff592c;
				color: #ffffff;
				border-radius: 4px;
				border: none;
				height: 0.32rem;
				padding: 0 0.2rem;
				/*flex: 1;*/
			}
		}
	}
	
</style>

<style lane="scss">
	.fl{
		float: left;
	}
	
	.fr{
		float: right;
	}
</style>