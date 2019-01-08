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
				<div class="per-icon" @click="goPage('hotelOrderList')">
					<i class="iconfont icon-jibenxinxi icon1"></i>
					<span class="icon-txt">我的订单</span>
				</div>
				<div class="per-icon" @click="goPage('personalInfo')">
					<i class="iconfont icon-gengduo icon2"></i>
					<span class="icon-txt">个人信息</span>
				</div>
				<!--<div class="per-icon">-->
					<!--<i class="iconfont icon-amount icon3"></i>-->
					<!--<span class="icon-txt">快速充值</span>-->
				<!--</div>-->
			</div>
			
			<div class="hot-line">
				<p class="hot-line-title">
					<i class="iconfont icon-dianhua"></i>
					<span>预订热线</span>
				</p>
				<p>0755-33397777</p>
			</div>
			
			<div class="cell-list">
				<mt-cell title="关于捷旅" is-link to="/about"></mt-cell>
				<!--<mt-cell title="退出登录" is-link @click="logout"></mt-cell>-->
				<a class="mint-cell" @click="logout">
					<span class="mint-cell-mask"></span>
					<div class="mint-cell-left"></div>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">退出登录</span>
						</div>
						<div class="mint-cell-value is-link">
							<span></span>
						</div>
						<i class="mint-cell-allow-right"></i>
					</div>
					<div class="mint-cell-right"></div>
				</a>
			</div>
		</div>
		
	</div>
</template>

<script>
  import noHeadPortrait from '@/assets/img/no-head-portrait.jpg'
  import GoBack from '@/components/GoBack.vue';
  import {gotoPage} from '@/assets/util';
  import {MessageBox, Toast} from 'mint-ui';
  
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
    
    methods: {
      goPage(aim){
        gotoPage(this.$router, aim);
      },
      logout(){
        let _this = this;
        MessageBox.confirm('确定执行此操作?').then(action => {
          _this.$api.myCenter.syncLogout().then(res => {
            if (res.returnCode === 1){
              Toast('退出成功');
              window.sessionStorage.removeItem('user_wx');
              setTimeout(function () {
                gotoPage(this.$router, 'home')
              },2000);
            }
          });
        });
      }
    }
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