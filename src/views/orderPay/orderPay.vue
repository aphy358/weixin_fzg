<!-- 组件说明 -->
<template>
	<div class="order-pay">
		<mt-header title="订单支付"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content">
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
				<!--<p class="info-title">预收款总金额</p>-->
				<!--<p class="info-txt">{{content.balance}}</p>-->
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
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import { Toast, Indicator, MessageBox } from 'mint-ui'
  import {mapState} from 'vuex';
  import { queryString, gotoPage, replacePage } from '@/assets/util'
  
  export default {
    name: 'orderPay',
    
    data() {
      return {
        content: {},
      }
    },
    
    props: {},
    
    components: {
      GoBack
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
        _this.$api.orderPay.syncPayStart(params).then(res => {
          if (res.returnCode === 1){
            let payParam = {
              appId: res.content.appId,     //公众号名称，由商户传入
              timeStamp: res.content.timeStamp,         //时间戳，自1970年以来的秒数
              nonceStr: res.content.nonceStr, //随机串
              package: res.content.prepayId,
              signType:"MD5",         //微信签名方式：
              paySign: res.content.paySign //微信签名
            };
            window.WeixinJSBridge.invoke('getBrandWCPayRequest', payParam, function(res){
    
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              if(res.err_msg === "get_brand_wcpay_request：ok" ) {
              }
            });
            //显示支付成功
            Toast('支付成功');
          }
        });
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
	
	.deep-orange{
		color: #ff4400;
	}
	
	.bold{
		font-weight: bold;
	}
</style>