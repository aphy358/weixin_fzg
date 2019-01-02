<!-- 组件说明 -->
<template>
	<div class="page register-page">
		<mt-header title="账号注册"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content register-content">
			<div class="per-module">
				<p class="per-module-title">企业基本信息</p>
				<div class="per-module-list">
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-baofang"></i>公司名称</p>
						<input name="companyName" type="text" v-validate="'required'" placeholder="全称（必填）">
						<i class="mintui" :class="errors.has('companyName')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-earth"></i>所在地</p>
						<select name="country" id="country" v-validate="'required'">
							<option value="">国家</option>
						</select>
						<select name="province" id="province" v-validate="'required'">
							<option value="">省份</option>
						</select>
						<select name="city" id="city" v-validate="'required'">
							<option value="">城市</option>
						</select>
						<i class="mintui" :class="errors.has('country') || errors.has('province') || errors.has('city')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-location"></i>企业地址</p>
						<input type="text" name="companyAddress" v-validate="'required'" placeholder="必填">
						<i class="mintui" :class="errors.has('companyAddress')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-dianhua"></i>企业电话</p>
						<input type="text" v-validate="{regex:/^\d{0,}$/}" name="companyPhone" placeholder="非必填">
						<i class="mintui" :class="errors.has('companyPhone')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-chuanzhen"></i>企业传真</p>
						<input type="text" name="companyFax" v-validate="{required:true, regex:/^\d{1,}$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('companyFax')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
				</div>
			</div>
			<div class="per-module">
				<p class="per-module-title">收单方式</p>
				<div class="per-module-list">
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-kaishishijian"></i>开始时间</p>
						<select name="startTime" id="startTime">
							<option value=""></option>
						</select>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-jieshushijian"></i>结束时间</p>
						<select name="endTime" id="endTime">
							<option value=""></option>
						</select>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-pack"></i>收单方式</p>
						<select name="receiveType" id="receiveType" v-model="receiveType">
							<option value="0">直连</option>
							<option value="1">Email</option>
							<option value="2">传真</option>
							<option value="3">手机</option>
						</select>
					</div>
					<div class="per-info" v-show="receiveType !== 0">
						<p class="per-info-title"><i class="iconfont icon-mail"></i>联系方式</p>
						<input type="text" name="receiveInfo" v-validate="{required:true, regex:receiveType === 1 ? '/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/' : receiveType === 2 ? '/^\d{1,}$/' : '/^[0-9]{11}$/'}" placeholder="必填">
						<i class="mintui" :class="errors.has('receiveInfo')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-rili"></i>适用星期</p>
						<ul class="sd-week clearfix">
							<li :class="sdWeekArr[0] ? 'selected' : ''" @click="selectSdWeek(0)">1</li>
							<li :class="sdWeekArr[1] ? 'selected' : ''" @click="selectSdWeek(1)">2</li>
							<li :class="sdWeekArr[2] ? 'selected' : ''" @click="selectSdWeek(2)">3</li>
							<li :class="sdWeekArr[3] ? 'selected' : ''" @click="selectSdWeek(3)">4</li>
							<li :class="sdWeekArr[4] ? 'selected' : ''" @click="selectSdWeek(4)">5</li>
							<li :class="sdWeekArr[5] ? 'selected' : ''" @click="selectSdWeek(5)">6</li>
							<li :class="sdWeekArr[6] ? 'selected' : ''" @click="selectSdWeek(6)">7</li>
						</ul>
						<i class="mintui" :class="errors.has('receiveInfo')?'mintui-field-error':'mintui-field-success'" style="border: none;"></i>
					</div>
				</div>
			</div>
			<div class="per-module">
				<p class="per-module-title">用户信息</p>
				<div class="per-module-list">
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-jibenxinxi"></i>用户名</p>
						<input type="text" name="userName" v-validate="{required:true, regex:/^[a-zA-Z0-9]{4,16}$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('userName')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-password"></i>密码</p>
						<input type="text" name="password" v-validate="{required:true, regex:/^[a-zA-Z0-9]{4,16}$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('password')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-yitiquyongjin"></i>确认密码</p>
						<input type="text" name="repeatPassword" v-validate="{required:true, regex:/^[a-zA-Z0-9]{4,16}$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('repeatPassword')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-wode"></i>姓名</p>
						<input type="text" name="fullName" v-validate="{required:true, regex:/^[\u4e00-\u9fa5_a-zA-Z]{1,}$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('fullName')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-shouji"></i>手机</p>
						<input type="text" name="mobilePhone" v-validate="{required:true, regex:/^[0-9]{11}$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('mobilePhone')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-mail"></i>邮箱</p>
						<input type="text" name="email" v-validate="{required:true, regex:/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/}" placeholder="必填">
						<i class="mintui" :class="errors.has('email')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
				</div>
			</div>
			<button class="next-step" @click="register">注册</button>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import { MessageBox } from 'mint-ui';


  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate, { validity: true });
  
  export default {
    name: 'register',
    
    data() {
      return {
        receiveType: 0,
        sdWeekArr: [false, false, false, false, false, false, false],
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {},
    
    methods: {
      register(){
        this.$validator.validateAll().then((result) => {
          if (result){
          
          }else{
            MessageBox('提示', '请检查所有必填项是否已填且格式是否正确');
          }
        })
      },
      selectSdWeek(index){
        this.$set(this.sdWeekArr, index, !this.sdWeekArr[index]);
      }
    }
  }
</script>

<style scoped lang="scss">
	.register-content{
		padding: 0.2rem 0 0.4rem 0;
	}
	
	.per-module{
		margin: 0 0.1rem 0.2rem 0.1rem;
		
		@at-root .per-module-title{
			height: 0.3rem;
			line-height: 0.3rem;
			padding: 0 0.1rem;
			color: #818a0b;
		}
		
		@at-root .per-module-list{
			padding: 0 0.2rem 0.2rem;
			
			@at-root .per-info{
				height: 0.5rem;
				line-height: 0.5rem;
				display: flex;
				
				.per-info-title{
					margin-right: 0.1rem;
					display: inline-block;
					width: 0.7rem;
					text-align: left;
					font-size: 0.12rem;
					vertical-align: bottom;
					color: #cccccc;
					
					>.iconfont{
						display: inline-block;
						font-size: 0.18rem;
						width: 0.2rem;
						vertical-align: bottom;
						color: #818a0b;
					}
				}
				
				input,select{
					flex: 1;
					height: 100%;
					padding-left: 0.1rem;
					background: none;
					position: relative;
					font-size: 0.12rem;
					border-left: none;
					border-right: none;
					border-top: none;
					border-bottom: 0.5px solid #eeeeee;
					box-sizing: border-box;
				}
				
				.sd-week{
					flex: 1;
					li{
						float: left;
						width: 0.26rem;
						height: 0.26rem;
						line-height: 0.26rem;
						border: 0.5px solid #aaaaaa;
						color: #aaaaaa;
						border-radius: 50%;
						box-sizing: border-box;
						margin: 0.12rem 0.02rem;
						text-align: center;
						font-size: 0.12rem;
						
						&.selected{
							background-color: #ff7625;
							color: #ffffff;
							border: none;
						}
					}
				}
			}
		}
	}
	
	
	.next-step{
		display: block;
		width: 80%;
		margin: 0 auto 0.2rem;
		box-sizing: border-box;
		height: 0.4rem;
		background-color: #ff7625;
		border: none;
		border-radius: 4px;
		color: #ffffff;
	}
	
	.mintui-field-success{
		color: #0bc16f;
		border-bottom: 0.5px solid #eeeeee;
	}
	
	.mintui-field-error{
		color: #f44336;
		border-bottom: 0.5px solid #eeeeee;
	}
</style>