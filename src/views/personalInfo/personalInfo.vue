<!-- 组件说明 -->
<template>
	<div class="page order-detail">
		<mt-header title="个人信息"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content order-detail-list">
			<div class="per-module">
				<p class="per-module-title">用户信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">登录名</span>
						<span class="item-con deep-orange">{{customerUser.loginName}}</span>
					</li>
					<li>
						<span class="item-txt">姓名</span>
						<span class="item-con">{{customerUser.customerUserName}}</span>
					</li>
					<li>
						<span class="item-txt">手机</span>
						<span class="item-con">{{customerUser.mobilePhone || ''}}</span>
					</li>
					<li>
						<span class="item-txt">邮箱</span>
						<span class="item-con">{{customerUser.email || ''}}</span>
					</li>
					<li>
						<span class="item-txt">QQ</span>
						<span class="item-con">{{customerUser.qq || ''}}</span>
					</li>
					<li>
						<span class="item-txt">部门</span>
						<span class="item-con">{{customerUser.department ? customerUser.department === '请选择' ? '' : customerUser.department : ''}}</span>
					</li>
					<li>
						<span class="item-txt">岗位</span>
						<span class="item-con">{{customerUser.station ? customerUser.station === '请选择' ? '' : customerUser.station : ''}}</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">公司信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">公司账号</span>
						<span class="item-con">{{distributor.distributorCode}}</span>
					</li>
					<li>
						<span class="item-txt">公司名称</span>
						<span class="item-con">{{distributor.allName}}</span>
					</li>
					<li>
						<span class="item-txt">结算周期</span>
						<span class="item-con">{{['客人前台现付','单结','周结','半月结','月结','不固定','三日结','十日结','额度结'][distributor.paymentTerm + 1]}}</span>
					</li>
					<li>
						<span class="item-txt">当前预收款</span>
						<span class="item-con deep-orange">{{distributorAccount.balance || 0}}</span>
					</li>
					<li>
						<span class="item-txt">公司电话</span>
						<span class="item-con">{{distributor.phone}}</span>
					</li>
					<li>
						<span class="item-txt">公司邮箱</span>
						<span class="item-con">{{distributor.email}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import { Indicator } from 'mint-ui'
  
  export default {
    name: 'personalInfo',
    
    data() {
      return {
        customerUser: {},
        distributor: {},
        distributorAccount: {},
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
  
    activated(){
      let _this = this;
      Indicator.open('加载中...');
      this.$api.myCenter.syncPersonalInfo().then(res => {
        Indicator.close();
        if (res.returnCode === 1){
          _this.customerUser = res.data.customerUser;
          _this.distributor = res.data.distributor;
          _this.distributorAccount = res.data.distributorAccount;
        }
      });
    },
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.order-detail{
		padding-bottom: 0.2rem;
		
		
		.order-detail-list{
			padding: 0.2rem;
			
			@at-root .per-module{
				margin-bottom: 0.2rem;
				
				.per-module-title{
					height: 0.16rem;
					line-height: 0.16rem;
					font-size: 0.16rem;
					margin-bottom: 0.16rem;
					border-left: 4px solid #818a0b;
					color: #818a0b;
					padding-left: 0.08rem;
				}
				
				@at-root .per-module-list{
					>li{
						line-height: 0.32rem;
						font-size: 0.12rem;
						display: flex;
						color: #323232;
						
						.item-txt{
							display: inline-block;
							width: 1rem;
							color: #979797;
						}
						
						.item-con{
							display: inline-block;
							flex: 1;
						}
					}
				}
			}
		}
	}
	
	.blue{
		color: #154ca4;
	}
	
	.deep-orange{
		color: #ff4400;
	}
	
	.gold{
		color: #ffa105;
	}
	
	.red{
		color: red;
	}
</style>