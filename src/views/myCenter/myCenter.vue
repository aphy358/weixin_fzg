<!-- 组件说明 -->
<template>
	<div class="page my-center">
		
		<GoBack/>
		
		<div class="page-content head-background clearfix">
			<div class="head-txt fl">
				<p class="nick-name">李白</p>
				<span class="status">管理员</span>
				<span class="payment-type">周结</span>
			</div>
			<div class="head-box fr">
				<img :src="noHeadPortrait" alt="">
			</div>
		</div>
		
		<div class="my-center-content">
			<div class="icon-area">
				<div class="per-icon">
					<i class="iconfont icon-jibenxinxi icon1"></i>
					<span class="icon-txt">我的订单</span>
				</div>
				<div class="per-icon">
					<i class="iconfont icon-gengduo icon2"></i>
					<span class="icon-txt">个人信息</span>
				</div>
				<div class="per-icon">
					<i class="iconfont icon-amount icon3"></i>
					<span class="icon-txt">快速充值</span>
				</div>
			</div>
			
			<div class="hot-line">
				<p class="hot-line-title">
					<i class="iconfont icon-dianhua"></i>
					<span>预订热线</span>
				</p>
				<p>0755-33397777</p>
			</div>
			
			<div class="cell-list">
				<mt-cell title="重置密码" is-link></mt-cell>
				<mt-cell title="退出登录" is-link></mt-cell>
			</div>
		</div>
		
	</div>
</template>

<script>
  import noHeadPortrait from '@/assets/img/no-head-portrait.jpg'
  import GoBack from '@/components/GoBack.vue';
  
  export default {
    name: '',
    
    data() {
      return {
        noHeadPortrait: ''
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {},
    
    created(){
      this.noHeadPortrait = noHeadPortrait;
    },
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.my-center{
		background-color: #efeff5;
		
		@at-root .head-background{
			width: 100%;
			height: 1.8rem;
			background-image: linear-gradient(to bottom, rgba(53, 101, 132, 0.5), rgba(247, 216, 226, 0.3));
			
			.head-txt{
				color: #818a0b;
				margin: 0.3rem 0.3rem 0 0.3rem;
				padding: 0.3rem 0.1rem;
				font-size: 0.14rem;
				line-height: 0.4rem;
				
				.nick-name{
					font-size: 0.28rem;
					font-weight: bold;
				}
				
				.status{
					margin-right: 0.2rem;
				}
			}
			
			.head-box{
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 50%;
				overflow: hidden;
				margin: 0.3rem;
			}
		}
		
		@at-root .my-center-content{
			background-color: #f6f6f6;
			
			
			@at-root .icon-area{
				margin-bottom: 0.1rem;
				background-color: #fff;
				display: flex;
				
				@at-root .per-icon{
					flex: 1;
					margin: 0.2rem;
					float: left;
					box-sizing: border-box;
					text-align: center;
					
					>i{
						font-size: 0.34rem;
						
						
						&.icon1{
							color: #d18988;
						}
						&.icon2{
							color: #92bddb;
						}
						&.icon3{
							color: #d9c785;
						}
					}
					
					>.icon-txt{
						display: block;
						font-size: 0.12rem;
						color: #787878;
					}
				}
			}
			
			@at-root .hot-line{
				background-color: #fff;
				font-size: 0.16rem;
				padding: 0 0.2rem;
				color: #747477;
				margin-bottom: 0.1rem;
				
				>p{
					line-height: 0.5rem;
					
					&.hot-line-title{
						font-size: 0.16rem;
						border-bottom: 0.5px solid #eeeeee;
						
						>span{
							margin-left: 0.1rem;
						}
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	
	.mint-cell-wrapper{
		font-size: 0.16rem;
	}
	.fl{
		float: left;
	}
	
	.fr{
		float: right;
	}
</style>