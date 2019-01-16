<!-- 组件说明 -->
<template>
	<div class="page my-center">
		
		<GoBack/>
		
		<div class="page-content head-background clearfix">
			<div class="head-txt fl">
				<p class="nick-name">{{nickName}}</p>
				<span class="department">{{department}}</span>
				<span class="status">{{status}}</span>
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
					<i class="iconfont icon-wode icon-l jade-green"></i>
					<span class="icon-txt no-border">个人信息</span>
					<i class="iconfont icon-right-thin icon-r no-border"></i>
				</div>
			</div>
			
			<div class="cell-list">
				<div class="per-cell" @click="goPage('about')">
					<i class="iconfont icon-info icon-l deep-orange"></i>
					<span class="icon-txt">关于捷旅</span>
					<i class="iconfont icon-right-thin icon-r"></i>
				</div>
				<div class="per-cell" @click="goPage('login')">
					<i class="iconfont icon-tuichu icon-l red"></i>
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
			
			<!--<div class="hot-line">-->
				<!--<p class="hot-line-title">-->
					<!--<i class="iconfont icon-dianhua"></i>-->
					<!--<span>预订热线</span>-->
				<!--</p>-->
				<!--<p>0755-33397777</p>-->
			<!--</div>-->
		</div>
		
		
		<p class="hot-line">预订热线：0755-33397777</p>
		
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
        noHeadPortrait: '',
        department: '',
        status: '',
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {
      nickName(){
        let customerUser = window.sessionStorage.getItem('user_wx');
        console.log(customerUser);
        if (customerUser){
          this.department = customerUser.department;
          this.status = customerUser.station;
        }
        return customerUser ? customerUser.customerUserName : '';
      }
    },
    
    created(){
      this.noHeadPortrait = noHeadPortrait;
    },
    
    methods: {
      goPage(aim){
        gotoPage(this.$router, aim);
      },
      logout(){
        let _this = this;
        MessageBox.confirm('退出登录后需要重新登录，确定退出?').then(action => {
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
			},
    }
  }
</script>

<style scoped lang="scss">
	.page{
		position: relative;
	}
	
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
				
				.department{
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
			
			@at-root .cell-list{
				background-color: #fff;
				margin-bottom: 0.1rem;
				.per-cell{
					height: 0.5rem;
					line-height: 0.5rem;
					padding: 0 0.1rem;
					display: flex;
					
					.iconfont{
						
						&.icon-l{
							padding-right: 0.1rem;
						}
						
						&.icon-r{
							float: right;
							font-size: 0.12rem;
							border-bottom: 0.5px solid #eeeeee;
							
							&.no-border{
								border: none;
							}
						}
					}
					
					.icon-txt{
						display: inline-block;
						flex: 1;
						border-bottom: 0.5px solid #eeeeee;
						
						&.no-border{
							border: none;
						}
					}
				}
			}
			
			/*
			@at-root .hot-line{
				background-color: #fff;
				padding: 0 0.1rem;
				color: #747477;
				margin: 0.1rem 0;
				
				>p{
					line-height: 0.5rem;
					
					&.hot-line-title{
						border-bottom: 0.5px solid #eeeeee;
						color: #818a0b;
						
						>span{
							margin-left: 0.1rem;
						}
					}
				}
			}
			*/
			
			
			@at-root .hot-line{
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
	.my-center{
		.mint-cell-wrapper{
			font-size: 0.16rem;
		}
	}
	
	.fl{
		float: left;
	}
	
	.fr{
		float: right;
	}
	
	.jade-green{
		color: #818a0b;
	}
	
	.blue{
		color: #92bddb;
	}
	
	.deep-orange{
		color: #ff4400;
	}
	
	.red{
		color: #ff0000;
	}
</style>