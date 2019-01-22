<!-- 组件说明 -->
<template>
	<div class="order-pay">
		<mt-header title="订单支付"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content" v-if="!orderSuccessVisible">
			<div class="order-info">
				<p class="info-title">订单编号</p>
				<p class="info-txt">{{content.orderCode}}</p>
				<p class="info-title">付款时限</p>
				<p class="info-txt">{{content.timeLimit}}</p>
				<p class="info-title">订单金额</p>
				<p class="info-txt deep-orange bold">￥{{content.total}}</p>
				<p class="info-title">收款方</p>
				<p class="info-txt">深圳市捷旅国际旅行社有限公司[深圳捷旅假期]</p>
				<p class="info-title">付款方</p>
				<p class="info-txt">{{content.distrb}}</p>
			</div>
			
			<div class="pay-num">
				<label>
					<span>本次共需支付：</span>
					<span class="total-pay deep-orange">￥{{content.realReceiveMoney}}</span>
				</label>
				<label>
					<span>使用预收款金额：</span>
					<span class="total-pay deep-orange">￥{{content.balance}}</span>
				</label>
				
				<button class="pay-order" @click="payOrder">支付</button>
			</div>
		</div>
		
		
		
		<div class="order-success" v-if="orderSuccessVisible">
			<i class="iconfont icon-success order-success-icon"></i>
			<p class="green">您已成功支付订单，请等待确认</p>
			<p>客服电话：0755-33397777</p>
			<button class="go-detail" @click="readDetail">查看订单详情</button>
			<img class="fzg-erweima" :src="erweima" alt="">
			<p>关注"房掌柜"公众号即可查询订单</p>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import { Toast, Indicator, MessageBox } from 'mint-ui'
  import {mapState} from 'vuex';
  import { queryString, gotoPage, replacePage } from '@/assets/util';
  import erweima from '@/assets/img/fzg_erweima.png';
  
  export default {
    name: 'orderPay',
    
    data() {
      return {
        content: {},
        orderSuccessVisible: false,
        erweima: '',
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    created(){
      this.erweima = erweima;
    },
    
    activated(){
      Indicator.open('加载中...');
      let _this = this;
      this.$api.orderPay.syncPayInfo({orderId: queryString('orderId')}).then(res => {
        Indicator.close();
        if (res.returnCode === 1){
          if (res.data.success){
            _this.content = res.data.content;
          }else{
            MessageBox.alert(res.data.errinfo).then(() => {
              replacePage(_this.$router, 'hotelOrderList');
            });
          }
        }
      });
    },
    
    methods: {
      payOrder(){
        let _this = this;
        let params = {
          orderCode: _this.content.orderCode,
          fee: _this.content.realReceiveMoney * 100
        };
        Indicator.open('请求支付参数中...');
        _this.$api.orderPay.syncPayStart(params).then(res => {
          Indicator.close();
          if (res.returnCode === 1){
            wx.chooseWXPay({
              timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
              package: res.data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                //显示支付成功
                _this.orderSuccessVisible = true;
              }
            });
          }
        });
      },
      readDetail(){
        replacePage(this.$router, 'orderDetail', {orderId: this.$store.state.orderWrite.orderId,});
        this.orderSuccessVisible = false;
      }
    }
  }
</script>

<style scoped lang="scss">
	.order-info{
		padding: 0.1rem 0.3rem;
		font-size: 0.12rem;
		color: #747477;
		border-bottom: 0.5px dashed #eeeeee;
		
		.info-title{
			line-height: 0.3rem;
			color: #666fb1;
		}
		
		.info-txt{
			line-height: 0.3rem;
		}
	}
	
	.pay-num{
		padding: 0.1rem 0.3rem;
		font-size: 0.12rem;
		
		>label{
			line-height: 0.3rem;
			display: block;
			
			.use-balance{
				width: 2rem;
				height: 0.24rem;
				line-height: 0.24rem;
				border-radius: 0;
				padding-left: 0.1rem;
			}
			
			.total-pay{
				font-size: 0.16rem;
				font-weight: bold;
			}
		}
		
		
		.pay-order{
			display: block;
			margin: 0 auto;
			background-color: #ff7625;
			color: #ffffff;
			border: none;
			width: 100%;
			margin-top: 0.2rem;
			border-radius: 4px;
			height: 0.36rem;
			font-size: 0.14rem;
			line-height: 0.36rem;
		}
	}
	
	
	.order-success{
		width: 2.2rem;
		margin: 0.2rem auto 0;
		text-align: center;
		
		.order-success-icon{
			display: block;
			font-size: 1rem;
			color: #00c285;
		}
		
		.go-detail{
			display: block;
			color: #ffffff;
			width: 1rem;
			height: 0.4rem;
			background-color: #ff7625;
			border-radius: 4px;
			border: none;
			margin: 0.2rem auto;
		}
		
		.fzg-erweima{
			margin: 0.6rem 0 0.1rem;
		}
	}
	
	.deep-orange{
		color: #ff4400;
	}
	
	.bold{
		font-weight: bold;
	}
</style>