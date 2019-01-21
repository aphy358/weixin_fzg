<!-- 组件说明 -->
<template>
	<div class="page order-write-box-page">
		
		<!-- 头部 -->
		<!--<mt-header title="订单填写"></mt-header>-->
		<!--<GoBack _style="top: 0.02rem" />-->
		
		<div class="page-content" v-if="!orderSuccessVisible">
			<div class="order-write-title-box">
				<h6 class="order-write-title">订单填写</h6>
				<div class="go-back-box">
					<GoBack _style="top: 0.02rem" />
				</div>
			</div>
			
			<!--<div class="title-gap">-->
				<!--<h6 class="order-write-title">订单填写</h6>-->
				<!--<div class="go-back-box">-->
					<!--<GoBack _style="top: 0.02rem" />-->
				<!--</div>-->
			<!--</div>-->
			
			
			<!--<mt-header title="订单填写"></mt-header>-->
			<!--<GoBack _style="top: 0.02rem" />-->
			
			<hotelInfo/>
			
			<writeInfo/>

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
  import hotelInfo from './modules/hotelInfo.vue';
  import writeInfo from './modules/writeInfo.vue';
  import GoBack from '@/components/GoBack.vue';
  import { Indicator, MessageBox } from 'mint-ui'
  import erweima from '@/assets/img/fzg_erweima.png';
  import { replacePage } from '@/assets/util';
	
  export default {
    name: '',
    
    data() {
      return {
        scrollTop: 0,
        validate: false,
//        orderSuccessVisible: true,
        erweima: '',
      }
    },
    
    props: {},
    
    components: {
      hotelInfo,
      writeInfo,
      GoBack
    },
    
    computed: {
      orderSuccessVisible(){
        return this.$store.state.orderWrite.orderSuccessVisible;
      }
    },
    
    created(){
      this.erweima = erweima;
    },
    
    activated(){
      this.getProductInfo();
    },
    
    methods: {
      onSubmit () {
        this.validate = true;
      },
      getProductInfo() {
        let _this = this;
        Indicator.open('加载中...');
        this.$store.dispatch('orderWrite/initData');
        this.$store.dispatch('orderWrite/getProductInfo', {
          k: 'firstQueryPrice',
          v: {
            vueCase: _this
          }
        });
  
      },
      readDetail(){
        replacePage(this.$router, 'orderDetail', {orderId: this.$store.state.orderWrite.orderId,});
        this.$store.commit('orderWrite/setCommonState', {k: 'orderSuccessVisible', v: false});
      }
    }
  }
</script>

<style scoped lang="scss">
	.order-write-box-page{
		background-color: #efeff4;
		
		@at-root .order-write-title-box{
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			
			@at-root .order-write-title{
				width: 100%;
				color: #ffffff;
				background-color: #ff7625;
				text-align: center;
				font-size: 0.14rem;
			}
			
			.go-back-box{
				position: absolute;
				left: 0;
				top: 0;
				
				.nav-back{
					line-height: 0.36rem;
				}
			}
		}
		
		.title-gap{
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			/*position: relative;*/
		}
		
		.mint-header{
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
		}
		
		.page-content{
			position: static;
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
	
</style>

<style lang="scss">
	.order-write-box-page{
		.fl{
			float: left;
		}
		
		.fr{
			float: right;
		}
		
		.orange{
			color: #ff7625;
		}
		
		.deep-orange{
			color: #ff4400;
		}
		
		.green{
			color: #0bc16f;
		}
		
		.gray{
			color: #747477;
		}
		
		.mint-checklist{
			margin-bottom: 0.5rem;
			zoom: 1
		}
		
		.mint-checklist:after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			clear: both;
		}
		
		.mint-checkbox-core{
			width: 0.14rem;
			height: 0.14rem;
			
			&:after{
				top: 0.015rem;
				left: 0.045rem;
				width: 0.03rem;
				height: 0.07rem;
			}
		}
		
		.mint-checkbox-label{
			color: #333333;
			margin-left: 0.03rem;
		}
		.mint-cell-wrapper{
			font-size: 0.15rem;
			background-image: none;
		}
		.mint-cell{
			min-height: 0.35rem;
			display: inline-block;
			width: 50%;
			float: left;
		}
		
		.mint-checkbox-input:checked + .mint-checkbox-core {
			background-color: #ff7625;
			border-color: #ff7625;
		}
		
		.mint-cell:last-child{
			background-image: none;
		}
	}
	
	
	//清除浮动
	.clearfix:after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		zoom: 1
	}
</style>