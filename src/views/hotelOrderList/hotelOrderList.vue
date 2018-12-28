<!-- 组件说明 -->
<template>
	<div class="page hotel-order-list">
		
		<mt-header title="我的订单">
			<mt-button slot="right" @click="showFilter">筛选</mt-button>
		</mt-header>
		<GoBack _style="top: 0.02rem" />
		
		
		<div class="page-content">
			<div class="no-order" v-show="orderList.length <= 0"><i class="iconfont icon-warning" style="margin-right: 0.05rem;line-height: 0.8rem;"></i>暂无订单</div>
			
			<div class="order-list" v-show="orderList.length > 0">
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
						<button @click="cancelOrder">取消订单</button>
						<button>去支付</button>
					</div>
				</div>
			</div>
		</div>
		
		
		<div class="filter-mask" v-show="filterVisible || reasonVisible" @click="hideFilter"></div>
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
				<input type="text" placeholder="请输入客户订单号" v-model="params.customerOrderCode">
			</li>
			<li>
				<span class="filter-type">入住人</span>
				<input type="text" placeholder="请输入入住人" v-model="params.userName">
			</li>
			<li>
				<span class="filter-type">预订员</span>
				<select name="orderMan" id="orderMan" title="预订员" v-model="params.bookMan">
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
		
		<div class="cancel-reason" :class="reasonVisible ? 'reason-shown' : 'reason-hidden'">
			<p class="cancel-reason-title">请选择取消订单的原因：</p>
			<label>
				<input type="radio" value="-1" title="取消订单" name="cancelReason">取消订单
			</label>
			<label>
				<input type="radio" value="0" title="行程改变" name="cancelReason">行程改变
			</label>
			<label>
				<input type="radio" value="1" title="无法满足需求" name="cancelReason">无法满足需求
			</label>
			<label>
				<input type="radio" value="2" title="其他途径预定" name="cancelReason">其他途径预定
			</label>
			<label>
				<input type="radio" value="3" title="酒店价格太贵" name="cancelReason">酒店价格太贵
			</label>
			<label>
				<input type="radio" value="4" title="其他" name="cancelReason">其他
			</label>
			<div class="button-box">
				<button class="cancel" @click="unCancelOrder">取消</button>
				<button class="ensure" @click="ensureCancelOrder">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
//  import orderList from './modules/orderList.vue';
  
  export default {
    name: '',
    
    data() {
      return {
        filterVisible: false,
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
          innerStatus: '',
          paymentStatus: ''
        },
        reasonVisible: false
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
      },
      cancelOrder(){
        this.reasonVisible = true;
      },
      unCancelOrder(){
        this.reasonVisible = false;
      },
      ensureCancelOrder(){
        this.reasonVisible = false;
      }
    }
  }
</script>

<style scoped lang="scss">
	.page-content{
		background-color: #efeff4;
		
		@at-root .no-order{
			text-align: center;
			line-height: 0.8rem;
			color: #92bddb;
			font-size: 0.16rem;
		}
		
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
					padding: 0 0.1rem 0.2rem;
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
				height: 0.32rem;
				padding: 0 0.2rem;
			}
			
			.ensure{
				margin-top: 0.3rem;
				background-color: #ff592c;
				color: #ffffff;
				border-radius: 4px;
				border: none;
				height: 0.32rem;
				padding: 0 0.2rem;
			}
		}
	}
	
	@at-root .cancel-reason{
		position: fixed;
		top: 1.2rem;
		left: 50%;
		width: 3rem;
		margin-left: -1.5rem;
		height: auto;
		background-color: #fff;
		z-index: 10002;
		/*padding-bottom: 0.1rem;*/
		box-sizing: border-box;
		transition: all 0.2s;
		font-size: 0.12rem;
		border-radius: 4px;
		
		&.reason-shown{
			animation: bigger .3s ease-out forwards;
		}
		
		&.reason-hidden{
			animation: smaller .2s ease-out forwards;
		}
		
		@keyframes bigger{
			0%{transform:scale(0)}
			100%{transform:scale(1)}
		}
		
		@keyframes smaller{
			0%{transform:scale(1)}
			100%{transform:scale(0)}
		}
		
		.cancel-reason-title{
			line-height: 0.4rem;
			padding-left: 0.2rem;
			background-color: #ff7625;
			color: #ffffff;
			margin-bottom: 0.2rem;
		}
		
		>label{
			display: block;
			line-height: 0.26rem;
			padding-left: 0.2rem;
			color: #747477;
			
			>input{
				margin-right: 0.06rem;
				vertical-align: middle;
			}
		}
		
		@at-root .button-box{
			text-align: center;
			margin-top: 0.3rem;
			border-top: 0.5px solid #dddddd;
			
			.cancel{
				background-color: #fff;
				color: #92bddb;
				border: none;
				width: 50%;
				height: 0.32rem;
				border-right: 0.5px solid #dddddd;
				border-radius: 0 0 0 4px;
			}
			
			.ensure{
				background-color: #fff;
				color: #ff592c;
				border: none;
				width: 50%;
				height: 0.32rem;
				border-radius: 0 0 4px 0;
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