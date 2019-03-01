<!-- 组件说明 -->
<template>
	<div class="page hotel-order-list">
		
		<mt-header title="我的订单">
			<mt-button slot="right" @click="showFilter">筛选</mt-button>
		</mt-header>
		<GoBack _style="top: 0.02rem" />
		
		
		<div class="page-content">
			<div class="order-list" v-show="orderList.length > 0" v-infinite-scroll="getHotelOrderList" infinite-scroll-disabled="infiniteLoad" infinite-scroll-distance="0">
				<div class="per-order" v-for="(item, index) in orderList" :key="index" @click="readDetail(item.orderInfoId)">
					<p class="order-title clearfix">
						<span class="hotel-name fl">{{item.itemName}}</span>
						<span class="fr read-detail">查看详情<i class="fr iconfont icon-right-thin" style="font-size: 0.12rem"></i></span>
					</p>
					<div class="order-info">
						<p class="room-type">{{item.roomType}}</p>
						<p>订单号：{{item.orderCode}}</p>
						<p>入住日期：{{item.beginDate}}</p>
						<p>离店日期：{{item.endDate}}</p>
						<p>
							<span class="canceled" :class="item.innerStatusClass">{{item.innerStatusText}}</span>
							<span class="pay-status" :class="item.payStatusClass">{{item.payStatusText}}</span>
						</p>
						<span class="order-total">￥{{item.salePrice}}</span>
					</div>
					<div class="operate-order" v-if="(item.paymentStatus == 1 && item.paymentTerm == 0 && item.innerStatus != 4) || item.canCancle">
						<!--<button @click.stop="cancelOrder(item.orderInfoId)" v-if="item.canCancle">取消订单</button>-->
						<button @click.stop="payOrder(item.orderInfoId, item.orderCode, item.salePrice)" v-if="item.paymentStatus == 1 && item.paymentTerm == 0 && item.innerStatus != 4">去支付</button>
					</div>
				</div>
				
				<LoadMore v-if="loadingContinue"/>
			</div>
			
			<END v-show="endVisible && orderList.length > 0"/>
			
			<div class="orderList-no-data" v-if="orderList.length <= 0 && noDataVisible">
				<img :src="noOrder">
				<div>暂无相关订单</div>
				<div>建议更换筛选条件进行搜索</div>
			</div>
		</div>

		<ToTop />
		
		
		<div class="filter-mask" v-show="filterVisible || reasonVisible" @click="hideFilter"></div>
		<ul class="hol-filter-panel" :style="'right:' + (filterVisible ? '0' : '-2.9rem')">
			<li class="hol-filter-item">
				<span class="hol-filter-label">酒店名</span>
				<input type="text" class="hol-filter-input" placeholder="请输入酒店名" v-model="params.itemName">
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">入住开始日期</span>
				<div class="hol-filter-date-inner">
					<input type="text" class="hol-filter-input" placeholder="选择入住日期" readonly :value="params.beginDate">
					<input type="date" class="hol-filter-date" v-model="params.beginDate">
				</div>
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">入住结束日期</span>
				<div class="hol-filter-date-inner">
					<input type="text" class="hol-filter-input" placeholder="选择离店日期" readonly :value="params.endDate">
					<input type="date" class="hol-filter-date" v-model="params.endDate">
				</div>
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">订单号</span>
				<input type="text" class="hol-filter-input" placeholder="请输入订单号" v-model="params.orderCode">
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">客户订单号</span>
				<input type="text" class="hol-filter-input" placeholder="请输入客户订单号" v-model="params.customerOrderCode">
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">入住人</span>
				<input type="text" class="hol-filter-input" placeholder="请输入入住人" v-model="params.userName">
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">预订员</span>
				<select name="orderMan" id="orderMan" title="预订员" v-model="params.createBy">
					<option v-for="(item, index) in userList" :value="item.value">{{item.label}}</option>
				</select>
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">订单状态</span>
				<select name="orderStatus" id="orderStatus" title="订单状态" v-model="params.innerStatus">
					<option value="">全选</option>
					<option value="-1">待处理</option>
					<option value="0">已确认</option>
					<option value="1">已拒单</option>
					<option value="2">申请取消中</option>
					<option value="3">无法取消</option>
					<option value="4">已取消</option>
				</select>
			</li>
			<li class="hol-filter-item">
				<span class="hol-filter-label">支付状态</span>
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
			<li class="hol-filter-item">
				<button class="reset" @click="reset">重置</button>
				<button class="ensure" @click="ensure">确认</button>
			</li>
		</ul>
		
		<div class="cancel-reason" v-show="reasonVisible" :class="reasonVisible ? 'reason-shown' : 'reason-hidden'">
			<p class="cancel-reason-title">请选择取消订单的原因：</p>
			<mt-radio v-model="cancelReasonId" :options="reasonList"></mt-radio>
			<div class="button-box">
				<button class="cancel" @click="unCancelOrder">取消</button>
				<button class="ensure" @click="ensureCancelOrder">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import {gotoPage} from '@/assets/util';
  import END from '@/components/END.vue';
  import ToTop from '@/components/ToTop.vue';
  import LoadMore from '@/components/LoadMore.vue';
  import noOrder from '@/assets/img/no-order.png'
  import Loading from '@/components/Loading.vue'
  import { Indicator,MessageBox,Toast } from 'mint-ui'
  import { debounce } from 'lodash'
  
  export default {
    name: '',
    
    data() {
      return {
        filterVisible: false,
        orderList: [],
        params: {
//          itemName: '',
//          beginDate: '',
//          endDate: '',
//          orderCode: '',
//          userName: '',
          innerStatus: '',
          orderType: 2,
          paymentStatus: '',
          createBy: '',
          pageNum: 0,
          pageSize: 10
        },
        userList: [],
        reasonVisible: false,
        cancelReasonId: '',
        reasonList: [
//          {
//            value: '-1',
//            label: '取消订单'
//          },
          {
            value: '0',
            label: '行程改变'
          },
          {
            value: '1',
            label: '无法满足需求'
          },
          {
            value: '2',
            label: '其他途径预定'
          },
          {
            value: '3',
            label: '酒店价格太贵'
          },
          {
            value: '4',
            label: '其他'
          }
        ],
        loadingContinue: true,
        infiniteLoad: false,
        endVisible: false,
        noOrder: '',
        noDataVisible: false,
        cancelOrderId: ''
      }
    },
    
    props: {},
    
    components: {
      GoBack,
      END,
      ToTop,
      LoadMore,
    },
    
    created(){
      this.noOrder = noOrder;
    },
    
    activated(){
      if(!window.goBack){
        this.getHotelOrderList(1);
        this.getUserList();
      }
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
        this.$set(this.params, 'innerStatus', '');
        this.$set(this.params, 'paymentStatus', '');
        this.$set(this.params, 'createBy', '');
      },
      ensure(){
        this.getHotelOrderList(1);
      },
      resetData(){
        this.filterVisible = false;
        this.$set(this.params, 'pageNum', 0);
        this.orderList = [];
        this.loadingContinue = true;
      },
      cancelOrder(orderId){
        this.cancelOrderId = orderId;
        this.reasonVisible = true;
      },
      payOrder(orderId, orderCode, salePrice){
        gotoPage(this.$router, 'orderPay', {
          type: 'payAgain',
          orderId: orderId,
          orderCode: orderCode,
          salePrice: salePrice
        })
      },
      unCancelOrder(){
        this.reasonVisible = false;
      },
      ensureCancelOrder(){
        if (this.cancelReasonId){
          this.reasonVisible = false;
  
          let _this = this;
          if (this.cancelReasonId == 4){
            MessageBox.prompt('请输入取消理由').then(({ value, action }) => {
              if (value){
                _this.sendCancelOrderRequest({
                  orderId: _this.cancelOrderId,
                  reasonType: _this.cancelReasonId,
                  reason: value
                })
              }else{
                Toast('请输入取消理由');
              }
            });
          }else{
            for (let i = 0; i < this.reasonList.length; i++) {
              let o = this.reasonList[i];
              if (this.cancelReasonId === o.value){
                _this.sendCancelOrderRequest({
                  orderId: _this.cancelOrderId,
                  reasonType: _this.cancelReasonId,
                  reason: o.label
                });
                break;
              }
            }
          }
        }else{
          MessageBox.alert('请选择取消订单原因');
        }
      },
      sendCancelOrderRequest(params){
        this.$api.myCenter.syncCancelOrder(params).then(res => {
          if (res.returnCode === 1){
            if (res.data){
              MessageBox.alert('取消成功');
            }else{
              MessageBox.alert(res.returnMsg);
            }
          }else{
            MessageBox.alert(res.returnMsg);
          }
        });
      },
      getHotelOrderList: debounce(function (flag) {
        if(flag){ this.resetData() }

        if (this.loadingContinue){
          this.infiniteLoad = true;
          let num = ++this.params.pageNum;
          this.$set(this.params, 'pageNum', num);
          let _this = this;
          Indicator.open('查询中...');
          this.$api.myCenter.syncSearchOrderList(this.params).then(res => {
            Indicator.close();
            if (res.returnCode === 1){
              _this.noDataVisible = true;
              
              let orderList = res.dataList;
              for (let i = 0; i < orderList.length; i++) {
                let o = orderList[i];
                
                //支付状态
                let payStatusText = '';
                let payStatusClass = '';
                if (o.paymentRemark){
                  payStatusClass = 'red';
                  payStatusText = (o.paymentStatus === 0 ? '已支付' : o.paymentStatus === 1 ? '未支付' : '挂账') + o.paymentRemark;
                }else{
                  if (o.paymentTerm != 0){
                    payStatusClass = o.paymentStatus === 0 ? 'green' : o.paymentStatus === 1 ? 'red' : 'orange';
                    payStatusText = o.paymentStatus === 0 ? '已支付' : o.paymentStatus === 1 ? '未支付' : '挂账';
                  }else{
                    if (o.refunded == null){
                      payStatusClass = o.paymentStatus === 0 ? 'green' : o.paymentStatus === 1 ? 'red' : 'orange';
                      payStatusText = o.paymentStatus === 0 ? '已支付' : o.paymentStatus === 1 ? '未支付' : '挂账';
                    }else{
                      let payObj = {'0':'未支付','1':'已退款','2':'已支付','3':'退款中','-1':'退款失败','-2':'支付失败','4':'已支付','-4':'支付失败','5':'已支付','-5':'支付失败'};
                      payStatusClass = o.refunded == 0 || o.refunded == -1 || o.refunded == -2 ? 'red' : o.refunded == 1 || o.refunded == 2 || o.refunded == 4 || o.refunded == 5 || o.refunded == 3 ? 'green' : 'orange';
                      payStatusText = payObj[o.refunded];
                    }
                  }
                  
                }
                
                //订单状态
                let innerStatusClass = o.innerStatus === -1 ? 'purple' : o.innerStatus === 0 ? 'green' : o.innerStatus === 1 ? 'red' : o.innerStatus === 2 ? 'orange' : o.innerStatus === 3 ? 'red' : '';
                let innerStatusText = o.innerStatus === -1 ? '待处理' : o.innerStatus === 0 ? '已确认' : o.innerStatus === 1 ? '已拒单' : o.innerStatus === 2 ? '申请取消中' : o.innerStatus === 3 ? '无法取消' : '已取消';
                
                o.payStatusClass = payStatusClass;
                o.payStatusText = payStatusText;
                o.innerStatusClass = innerStatusClass;
                o.innerStatusText = innerStatusText;
              }
              
              if (res.dataList.length <= 0){
                _this.loadingContinue = false;
                _this.endVisible = true;
              }else{
                _this.orderList = Object.assign(_this.orderList.concat(orderList));
                _this.infiniteLoad = false;
              }
            }
          });
        }
      }, 10),
      readDetail(orderId){
        gotoPage(this.$router, 'orderDetail', {orderId: orderId})
      },
      getUserList(){
        let _this = this;
        let arr = [{
          label: '全部',
          value: ''
        }];
        this.$api.myCenter.syncGetUserList().then(res => {
          for (let i = 0; i < res.dataList.length; i++) {
            let o = res.dataList[i];
            if (o.isAdmin === 0 || o.isAdmin === 1){
              arr.push({
                label: o.customerUserName,
                value: o.loginName + '|' + o.customerUserName
              })
            }
          }
        });
        this.userList = arr;
      }
    }
  }
</script>

<style scoped lang="scss">
	.page-content{
		background-color: #efeff4;
		padding-bottom: 0.4rem;
		
		@at-root .order-list{
			padding: 0.2rem 0.1rem 0;
			margin-bottom: 0.2rem;
			
			@at-root .per-order{
				background-color: #fff;
				padding: 0 0.1rem;
				font-size: 0.14rem;
				margin-bottom: 0.1rem;
				
				@at-root .order-title{
					height: 0.5rem;
					line-height: 0.5rem;
					border-bottom: 0.5px solid #eeeeee;
					
					.read-detail{
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
		
		.canceled,.pay-status{
			background-color: #fff5ec;
			color: #ff592c;
			display: inline-block;
			height: 0.24rem;
			line-height: 0.24rem;
			padding: 0 0.1rem;
			margin-right: 0.1rem;
			
			&.purple{
				color: #666fb1;
				background-color: rgba(102, 111, 177, 0.2);
			}
			
			&.red{
				color: #ff4400;
				background-color: rgba(255, 68, 0, 0.2);
			}
			
			&.orange{
				color: #ff7625;
				background-color: rgba(255, 118, 37, 0.2);
			}
			
			&.green{
				color: #4da52f;
				background-color: rgba(77, 165, 47, 0.21);
			}
		}
		
		@at-root .orderList-no-data {
			text-align: center;
			padding: 0.8rem 0;
			color: gray;
			font-size: 0.12rem;
			
			img{
				width: 1.5rem;
				margin-bottom: 0.1rem;
			}
			
			div{
				margin-top: 0.05rem;
			}
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
	
	@at-root .hol-filter-panel{
		position: fixed;
		top: 0;
		right: -2.9rem;
		width: 2.7rem;
		height: 100%;
		background-color: #fff;
		padding: 0.1rem;
		transition: all 0.2s;
		font-size: 0.12rem;
		z-index: 10002;

		@at-root .hol-filter-item{
			overflow: hidden;
			margin-bottom: 0.1rem;

			> *{
				float: left;
			}
			
			@at-root .hol-filter-label{
				width: 0.82rem;
				text-align: right;
				line-height: 0.4rem;
				margin-right: 0.1rem;
			}

			@at-root .hol-filter-input{
				width: calc(100% - 0.92rem);
				border: none;
				height: 0.4rem;
			}
			
			select{
				line-height: 0.4rem;
				border: none;
			}
			
			@at-root .hol-filter-date-inner{
				width: calc(100% - 0.92rem);
				height: 0.4rem;
				overflow: hidden;

				input{
					position: relative;
					float: left;
					width: 100%;
					border: none;
					height: 0.4rem;

					&.hol-filter-date{
						margin-top: -0.4rem;
						color: transparent;
						background: transparent;
					}
				}
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
		margin-left: -1.5rem;
		background-color: #fff;
		z-index: 10002;
		/*padding-bottom: 0.1rem;*/
		box-sizing: border-box;
		transition: all 0.2s;
		font-size: 0.12rem;
		border-radius: 4px;
		width: 3rem;
		height: auto;
		
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
			font-size: 0.14rem;
		}
		
		@at-root .button-box{
			text-align: center;
			margin-top: 0.3rem;
			border-top: 0.5px solid #dddddd;
			font-size: 0.14rem;
			
			.cancel{
				background-color: #fff;
				color: #92bddb;
				border: none;
				width: 50%;
				height: 0.4rem;
				border-right: 0.5px solid #dddddd;
				border-radius: 0 0 0 4px;
			}
			
			.ensure{
				background-color: #fff;
				color: #ff592c;
				border: none;
				width: 50%;
				height: 0.4rem;
				border-radius: 0 0 4px 0;
			}
		}
	}
	
</style>

<style lang="scss">
	.hotel-order-list{
		.fl{
			float: left;
		}
		
		.fr{
			float: right;
		}
		
		.mint-cell-wrapper{
			background: none;
			line-height: 0.34rem;
			font-size: 0.12rem;
		}
		
		.mint-cell{
			min-height: 0.34rem;
		}
		
		.mint-cell:last-child{
			background: none;
		}
		
		.mint-radio-core{
			width: 0.16rem;
			height: 0.16rem;
		}
		.mint-radio-core::after{
			width: 0.06rem;
			height: 0.06rem;
			top: 0.04rem;
			left: 0.04rem;
		}
	}
</style>