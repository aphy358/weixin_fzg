<!-- 组件说明 -->
<template>
	<div class="page my-center-page">
		
		<GoBack/>
		
		<div class="page-content clearfix">
			
			<div class="head-background">
				<div class="head-txt fl" v-if="customerUser">
					<p class="nick-name">{{ customerUser.distrbId == 34354 ? '散客用户' : customerUser.customerUserName }}</p>
					<span class="head-brief-span">{{ customerUser.department === '请选择' ? '' : customerUser.department }}</span>
					<span class="head-brief-span">{{ customerUser.station === '请选择' ? '' : customerUser.station }}</span>
				</div>
				<div class="head-box fr">
					<img :src="noHeadPortrait" alt="">
				</div>
			</div>
			
			<div class="my-center-content">
				<div class="cell-list">
					<div class="per-cell" @click="goPage('hotelOrderList')">
						<i class="iconfont icon-jibenxinxi icon-l blue"></i>
						<span class="icon-txt">我的订单</span>
						<i class="iconfont icon-right-thin icon-r"></i>
					</div>
					<div class="per-cell" @click="goPage('personalInfo')">
						<i class="iconfont icon-shuoming icon-l jade-green"></i>
						<span class="icon-txt no-border">个人信息</span>
						<i class="iconfont icon-right-thin icon-r no-border"></i>
					</div>
				</div>
				
				<div class="cell-list">
					<div class="per-cell" @click="goPage('about')">
						<i class="iconfont icon-info icon-l blue"></i>
						<span class="icon-txt">关于捷旅</span>
						<i class="iconfont icon-right-thin icon-r"></i>
					</div>
					<div class="per-cell" @click="goPage('login')">
						<i class="iconfont icon-wode icon-l green"></i>
						<span class="icon-txt no-border">登录房掌柜</span>
						<i class="iconfont icon-right-thin icon-r no-border"></i>
					</div>
				</div>
				
				<div class="cell-list">
					<div class="per-cell" @click="logout">
						<i class="iconfont icon-tuichu icon-l red"></i>
						<span class="icon-txt no-border">退出登录</span>
						<i class="iconfont icon-right-thin icon-r no-border"></i>
					</div>
				</div>
			
			</div>
			
			<p class="hot-line">预订热线：0755-33397777</p>
		
		</div>
	
	</div>
</template>

<script>
  import noHeadPortrait from '@/assets/img/no-head-portrait.jpg'
  import GoBack from '@/components/GoBack.vue';
  import {gotoPage} from '@/assets/util';
  import {MessageBox, Toast} from 'mint-ui';
  import {user} from './user.js';
  
  
  export default {
    name: '',
    
    data() {
      return {
        noHeadPortrait: '',
        customerUser: null,
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {},
    
    activated() {
      this.getCustomerUser()
    },
    
    created() {
      this.noHeadPortrait = noHeadPortrait;
      // this.customerUser = user.data.customerUser
    },
    
    methods: {
      goPage(aim) {
        gotoPage(this.$router, aim);
      },
      logout() {
        let _this = this;
        MessageBox.confirm('退出登录后需要重新登录，确定退出?').then(action => {
          _this.$api.myCenter.syncLogout().then(res => {
            if (res.returnCode === 1) {
              Toast('退出成功');
              window.sessionStorage.setItem('user_wx', JSON.stringify(res.data.customerUser))
              this.customerUser = res.data.customerUser
            }
          });
        });
      },
      // 获取用户信息
      getCustomerUser() {
        let customerUser = window.sessionStorage.getItem('user_wx');
        
        if (customerUser) {
          this.customerUser = JSON.parse(customerUser)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.page {
		position: relative;
	}
	
	.my-center-page {
		background-color: #efeff5;
		
		@at-root .head-background {
			height: 1.2rem;
			padding: 0.3rem;
			background-image: linear-gradient(to bottom, rgba(53, 101, 132, 0.5), rgba(247, 216, 226, 0.3));
			overflow: hidden;
			
			> * {
				width: 50%;
				overflow: hidden;
			}
			
			.head-txt {
				color: #818a0b;
				padding-top: 0.1rem;
				
				.nick-name {
					font-size: 0.28rem;
					line-height: 0.7rem;
					font-weight: bold;
				}
				
				.head-brief-span {
					float: left;
					height: 0.2rem;
					line-height: 0.2rem;
					margin-right: 0.2rem;
					overflow: hidden;
				}
			}
			
			.head-box {
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 50%;
			}
		}
		
		@at-root .my-center-content {
			background-color: #f6f6f6;
			
			@at-root .cell-list {
				background-color: #fff;
				margin-bottom: 0.1rem;
				.per-cell {
					height: 0.5rem;
					line-height: 0.5rem;
					padding: 0 0.1rem;
					display: flex;
					
					.iconfont {
						
						&.icon-l {
							padding-right: 0.1rem;
						}
						
						&.icon-r {
							float: right;
							font-size: 0.12rem;
							border-bottom: 0.5px solid #eeeeee;
							
							&.no-border {
								border: none;
							}
						}
					}
					
					.icon-txt {
						display: inline-block;
						flex: 1;
						border-bottom: 0.5px solid #eeeeee;
						
						&.no-border {
							border: none;
						}
					}
				}
			}
			
			@at-root .hot-line {
				background-color: transparent;
				position: fixed;
				bottom: 0.1rem;
				left: 0;
				display: block;
				width: 100%;
				color: #747477;
				text-align: center;
			}
			
		}
	}
</style>

<style lang="scss">
	.my-center-page {
		
		.my-center {
			.mint-cell-wrapper {
				font-size: 0.16rem;
			}
		}
		
		.fl {
			float: left;
		}
		
		.fr {
			float: right;
		}
		
		.jade-green {
			color: #818a0b;
		}
		
		.green {
			color: green;
		}
		
		.blue {
			color: #92bddb;
		}
		
		.red {
			color: #ff0000;
		}
	}
</style>