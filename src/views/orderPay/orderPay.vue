<!-- 组件说明 -->
<template>
	<div class="order-pay">
		<mt-header title="订单支付"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content">
			<div class="order-info">
				<p class="info-title">订单编号</p>
				<p class="info-txt">{{orderCode}}</p>
				<p class="info-title">付款时限</p>
				<p class="info-txt">2018-12-20 18:00:00</p>
				<p class="info-title">订单金额</p>
				<p class="info-txt deep-orange bold">￥{{total}}</p>
				<p class="info-title">收款方</p>
				<p class="info-txt">深圳市捷旅国际旅行社有限公司[深圳捷旅假期]</p>
				<p class="info-title">付款方</p>
				<p class="info-txt">测试</p>
				<p class="info-title">预收款总金额</p>
				<p class="info-txt">{{balance}}</p>
			</div>
			
			<div class="pay-num">
				<label>
					<span>本次共需支付：</span>
					<span class="total-pay deep-orange">￥{{total}}</span>
				</label>
				<label>
					<span>使用预收款：</span>
					<input type="number" class="use-balance" v-model="useBalance">
				</label>
				
				<button class="pay-order" @click="payOrder">支付</button>
			</div>
		</div>
	</div>
</template>

<script>
  
  import GoBack from '@/components/GoBack.vue';
  import { Toast } from 'mint-ui'
  
  export default {
    name: 'orderPay',
    
    data() {
      return {
        orderCode: 'F489367073360',
        useBalance: '',
        total: 321.32,
        balance: 9999
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {},
    
    methods: {
      payOrder(){
        if (this.useBalance < 0){
          Toast('使用的预收款金额不能为负数')
        }else if (this.useBalance > this.balance){
          Toast('使用金额超出预收款额度');
        }else if (this.useBalance > this.total){
          Toast('支付金额不能多于订单金额');
        }else{
          //进入支付
          let param = {
            orderCode: this.orderCode,
            fee: 321.32,
            balance: this.balance
          };
          this.$api.orderPay.syncPayStart(param).then(res => {
            if(res.success){
              let payParam = {
                "appId": res.content.appId,     //公众号名称，由商户传入
                "timeStamp": res.content.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": res.content.nonceStr, //随机串
                "package": res.content.prepayId,
                "signType":"MD5",         //微信签名方式：
                "paySign": res.content.paySign //微信签名
              };
              WeixinJSBridge.invoke('getBrandWCPayRequest', payParam, function(res){
                
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                if(res.err_msg === "get_brand_wcpay_request：ok" ) {
                }
              });
              //显示支付成功
              Toast('支付成功');
            }else{
              Toast(res.errinfo);
            }
          });
        }
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