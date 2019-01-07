<!-- 组件说明 -->
<template>
	<div class="page register-page">
		<mt-header title="账号注册"></mt-header>
		<GoBack _style="top: 0.02rem"/>
		
		<div class="page-content register-content">
			<div class="per-module">
				<p class="per-module-title">企业基本信息</p>
				<div class="per-module-list">
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-baofang"></i>公司名称</p>
						<input name="allName" type="text" v-validate="'required'" placeholder="公司名称全称（必填）"
						       v-model="allName" @blur="checkRepeat('allName')">
						<i v-show="markVisible || markObj.allName" class="mintui"
						   :class="errors.has('allName') || checkErrors.allName ? 'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-earth"></i>所在地</p>
						<div class="area-box">
							<select name="country" id="country" v-validate="'required'" v-model="country">
								<option value="">国家</option>
								<option v-for="(item, index) in countryList" :key="'country' + index"
								        :value="item.countryid">{{item.name}}
								</option>
							</select>
							<select name="province" id="province" v-validate="'required'" v-model="province">
								<option value="">省份</option>
								<option v-for="(item, index) in provinceList" :key="'province' + index"
								        :value="item.stateid">{{item.name}}
								</option>
							</select>
							<select name="city" id="city" v-validate="'required'" v-model="city">
								<option value="">城市</option>
								<option v-for="(item, index) in cityList" :key="'city' + index" :value="item.cityid">
									{{item.name}}
								</option>
							</select>
						</div>
						<i v-show="markVisible" class="mintui"
						   :class="errors.has('country') || errors.has('province') || errors.has('city')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-location"></i>企业地址</p>
						<input type="text" name="companyAddress" v-validate="'required'" placeholder="公司办公地址（必填）"
						       v-model="companyAddress">
						<i v-show="markVisible" class="mintui"
						   :class="errors.has('companyAddress')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-dianhua"></i>企业电话</p>
						<input type="text" v-validate="{regex:/^\d{0,}$/}" name="companyPhone"
						       placeholder="如075533397777（非必填）" v-model="companyPhone"
						       @blur="checkRepeat('companyPhone')">
						<i v-show="markVisible || markObj.companyPhone" class="mintui"
						   :class="errors.has('companyPhone') || checkErrors.companyPhone ?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-chuanzhen"></i>企业传真</p>
						<input type="text" name="companyFax" v-validate="{required:true, regex:/^\d{1,}$/}"
						       placeholder="如075533397777（必填）" v-model="companyFax" @blur="checkRepeat('companyFax')">
						<i v-show="markVisible || markObj.companyFax" class="mintui"
						   :class="errors.has('companyFax') || checkErrors.companyFax ?'mintui-field-error':'mintui-field-success'"></i>
					</div>
				</div>
			</div>
			<div class="per-module">
				<p class="per-module-title">收单方式</p>
				<div class="per-module-list">
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-kaishishijian"></i>开始时间</p>
						<select name="startTime" id="startTime" v-model="startTime">
							<option v-for="(item, index) in timeArr" :key="'startTime' + index" :value="item">
								{{item > 9 ? item + ':00' : '0' + item + ':00'}}
							</option>
						</select>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-jieshushijian"></i>结束时间</p>
						<select name="endTime" id="endTime" v-model="endTime">
							<option v-for="(item, index) in timeArr" :key="'endTime' + index" :value="item">
								{{item > 9 ? item + ':00' : '0' + item + ':00'}}
							</option>
						</select>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-pack"></i>收单方式</p>
						<select name="receiveType" id="receiveType" v-model="receiveType" @change="changeReceiveType">
							<option value="0">直连</option>
							<option value="1">Email</option>
							<option value="2">传真</option>
							<option value="3">手机</option>
						</select>
					</div>
					<div class="per-info" v-show="receiveType != '0'">
						<p class="per-info-title"><i class="iconfont icon-mail"></i>联系方式</p>
						<input type="text" name="receiveInfo"
						       :v-validate="receiveType != 0 ? {required:true, regex:receiveType == '1' ? '/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/' : receiveType == '2' ? '/^\d{1,}$/' : '/^[0-9]{11}$/'} : ''"
						       :placeholder="receiveType == '1' ? '请填写邮箱信息（必填）' : receiveType == '2' ? '请填写传真信息（必填）' : '请填写手机号码（必填）'"
						       v-model="receiveInfo" @blur="checkReceiveWay">
						<i v-show="markVisible || markObj.receiveInfo" class="mintui"
						   :class="errors.has('receiveInfo') || checkErrors.receiveInfo ?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-rili"></i>适用星期</p>
						<ul class="sd-week clearfix">
							<li v-for="(item, index) in [0,1,2,3,4,5,6]" :key="'sdWeek' + index"
							    :class="sdWeekArr[item] ? 'selected' : ''" @click="selectSdWeek(item)">{{item + 1}}
							</li>
						</ul>
						<i v-show="markVisible" class="mintui"
						   :class="sdWeekSelectedLength <= 0 ?'mintui-field-error':'mintui-field-success'"
						   style="border: none;"></i>
					</div>
				</div>
			</div>
			<div class="per-module">
				<p class="per-module-title">用户信息</p>
				<div class="per-module-list">
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-jibenxinxi"></i>用户名</p>
						<input type="text" name="userName" v-validate="{required:true, regex:/^[a-zA-Z0-9]{4,16}$/}"
						       placeholder="由4至16位数字或英文字母组成（必填）" v-model="userName">
						<i v-show="markVisible" class="mintui"
						   :class="errors.has('userName')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-password"></i>密码</p>
						<input type="password" name="password" v-validate="{required:true, regex:/^[a-zA-Z0-9]{4,16}$/}"
						       placeholder="由4至16位字符组成（必填）" v-model="password" @input="clearRepeatPassword">
						<i v-show="markVisible" class="mintui"
						   :class="errors.has('password')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-yitiquyongjin"></i>确认密码</p>
						<input type="password" name="repeatPassword"
						       v-validate="{required:true, regex:/^[a-zA-Z0-9]{4,16}$/}" placeholder="请再次输入密码（必填）"
						       v-model="repeatPassword" @blur="checkPassword">
						<i v-show="markVisible || markObj.repeatPassword" class="mintui"
						   :class="errors.has('repeatPassword') || checkErrors.repeatPassword ?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-wode"></i>姓名</p>
						<input type="text" name="fullName"
						       v-validate="{required:true, regex:/^[\u4e00-\u9fa5_a-zA-Z]{1,}$/}" placeholder="真实姓名（必填）"
						       v-model="fullName">
						<i v-show="markVisible" class="mintui"
						   :class="errors.has('fullName')?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-shouji"></i>手机</p>
						<input type="text" name="mobilePhone" v-validate="{required:true, regex:/^[0-9]{11}$/}"
						       placeholder="必填" v-model="mobilePhone" @blur="checkRepeat('mobilePhone')">
						<i v-show="markVisible || markObj.mobilePhone" class="mintui"
						   :class="errors.has('mobilePhone') || checkErrors.mobilePhone ?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-mail"></i>邮箱</p>
						<input type="text" name="email"
						       v-validate="{required:true, regex:/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/}"
						       placeholder="必填" v-model="email" @blur="checkRepeat('email')">
						<i v-show="markVisible || markObj.email" class="mintui"
						   :class="errors.has('email') || checkErrors.email ?'mintui-field-error':'mintui-field-success'"></i>
					</div>
					<div class="per-info">
						<p class="per-info-title"><i class="iconfont icon-gouxuan"></i>推荐人</p>
						<input name="recommendMessage" type="text" placeholder="非必填" v-model="recommendMessage">
						<i v-show="markVisible" class="mintui mintui-field-success"></i>
					</div>
				</div>
			</div>
			<button class="next-step" @click="register">注册</button>
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  import {MessageBox, Toast} from 'mint-ui';
  import {gotoPage} from '@/assets/util';
  import Velocity from 'velocity-animate';
  
  
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  
  Vue.use(VeeValidate, {validity: true});
  
  export default {
    name: 'register',
    
    data() {
      return {
        receiveType: 0,
        sdWeekArr: [false, false, false, false, false, false, false],
        markVisible: false,
        timeArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        countryList: [],
        country: '',
        provinceList: [],
        province: '',
        cityList: [],
        city: '',
        allName: '',
        userName: '',
        companyAddress: '',
        fullName: '',
        email: '',
        mobilePhone: '',
        companyPhone: '',
        companyFax: '',
        recommendMessage: '',
        startTime: 0,
        endTime: 0,
        receiveInfo: '',
        password: '',
        topPopupVisible: false,
        topPopupMsg: '',
        markObj: {},
        checkErrors: {},
        t: +new Date(),
        repeatPassword: '',
      }
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {
      //获得已选的收单日的数目，已判断用户是否已选收单适用星期，因为收单适用星期至少选一个
      sdWeekSelectedLength() {
        let len = 0;
        for (let i = 0; i < this.sdWeekArr.length; i++) {
          let item = this.sdWeekArr[i];
          if (item) {
            len += 1;
          }
        }
        
        return len;
      },
    },
    
    watch: {
      //所选国家发生改变时，相应的省份列表需要更新，同时之前选的内容需要重置
      country() {
        this.province = '';
        this.city = '';
        let timeStamp = +new Date();
        this.t = timeStamp;      //记录一个时间戳，标识每一个发出去的请求，可以帮助我们确定每次返回的结果到底是属于哪次发出去的请求）
        this.$api.register.syncProvince({countryId: this.country}).then(res => {
          if (res.returnCode === 1) {
            if (timeStamp === this.t) {
              //将局部的时间戳(即每次与最后发送请求时获取的时间戳作对比，如果一致则表示此事返回的结果是我们最后一次更换国家时发出的请求（之所以要作这些处理是因为有可能发生更换国家过快时，先发出的请求反而后返回结果，导致展示的省份列表与当前选择的国家不符合）
              this.provinceList = res.data;
            }
          }
        });
      },
      //所选省份发生改变时，相应的城市列表需要更新，同时重置之前选过的城市
      province() {
        this.city = '';
        let timeStamp = +new Date();
        this.t = timeStamp;
        this.$api.register.syncCity({stateId: this.province}).then(res => {
          if (res.returnCode === 1) {
            if(timeStamp === this.t){
              this.cityList = res.data;
            }
          }
        });
      },
    },
    
    created() {
      let _this = this;
      this.$api.register.syncCountry().then(res => {
        if (res.returnCode === 1) {
          _this.country = 70007;
          _this.countryList = res.data;
        }
      });
    },
    
    methods: {
      //更换收单方式时，原来已填的收单联系方式置空
      changeReceiveType() {
        this.receiveInfo = '';
      },
      //企业名称、企业电话、企业传真、手机、邮箱重复校验
      checkRepeat(key) {
        let params = {
          key: key,
          val: this[key]
        };
        if (params.val) {
          this.$api.register.syncCheck(params).then(res => {
            if (res.returnCode === 1) {
              if (res.data.isSucc) {
                if (!this.errors.has(key)) {
                  this.$set(this.markObj, key, true);
                  this.$set(this.checkErrors, key, false);
                }
              } else {
                Toast(res.data.msg);
                this.$set(this.markObj, key, true);
                this.$set(this.checkErrors, key, true);
              }
            }
          });
        }
      },
      //收单方式重复校验
      checkReceiveWay() {
        let params = {
          key: this.receiveType === 1 ? 'email' : this.receiveType === 2 ? 'fax' : 'moblie',
          val: this.receiveInfo
        };
        if (params.val) {
          this.$api.register.syncCheck(params).then(res => {
            if (res.returnCode === 1) {
              if (res.data.isSucc) {
                if (!this.errors.has('receiveInfo')) {
                  this.$set(this.markObj, 'receiveInfo', true);
                  this.$set(this.checkErrors, 'receiveInfo', false);
                }
              } else {
                Toast(res.data.msg);
                this.$set(this.markObj, 'receiveInfo', true);
                this.$set(this.checkErrors, 'receiveInfo', true);
              }
            }
          });
        }
      },
      //用户输入密码时，重置确认密码中的内容
      clearRepeatPassword() {
        this.repeatPassword = '';
      },
      //检查确认密码与密码是否一致
      checkPassword() {
        if (this.password === this.repeatPassword) {
          this.$set(this.checkErrors, 'repeatPassword', false);
        } else {
          this.$set(this.checkErrors, 'repeatPassword', true);
        }
        this.$set(this.markObj, 'repeatPassword', true);
      },
      //注册
      register() {
        this.$validator.validateAll().then((result) => {
          this.markVisible = true;
          if (result) {
            //发送注册请求
            let weekList = this.sdWeekArr;
            let weekStr = '';
            for (let i = 0; i < weekList.length; i++) {
              let item = weekList[i];
              if (item) {
                weekStr += (i + 1) + ',';
              }
            }
            weekStr = weekStr.replace(/,$/, '');
            let params = {
              registercountry: this.country,
              registerProvince: this.province,
              registerCity: this.city,
              registerCompanyName: this.allName,
              registerAccount: this.userName,
              registerAddress: this.companyAddress,
              registerName: this.fullName,
              registerEmail: this.email,
              registerMobile: this.mobilePhone,
              registerTel: this.companyPhone,
              registerFax: this.companyFax,
              registerReference: this.recommendMessage,
              confirmStart: this.startTime,
              confirmEnd: this.endTime,
              confirmWeek: weekStr,
              confirmType: this.receiveType,
              confirmWay: this.receiveInfo,
              registerPassWord: this.password
            };
            this.$api.register.syncRegister(params).then(res => {
              if (res.returnCode === 1) {
                Toast('注册成功，等待审核');
                setTimeout(function () {
                  gotoPage(this.$router, 'login')
                }, 3000);
              } else {
                Toast(res.returnMsg);
              }
            });
          } else {
            MessageBox('提示', '请检查所有必填项是否已填且格式是否正确');
            Velocity(document.querySelector('.per-module'), 'scroll', {container: document.querySelector('.page-content')})
          }
        })
      },
      //点击收单适用星期时更换样式及更新最后传入后台的weekStr参数
      selectSdWeek(index) {
        this.$set(this.sdWeekArr, index, !this.sdWeekArr[index]);
      }
    }
  }
</script>

<style scoped lang="scss">
	.register-content {
		padding: 0.2rem 0 0.4rem 0;
	}
	
	.per-module {
		margin: 0 0.1rem 0.2rem 0.1rem;
		
		@at-root .per-module-title {
			height: 0.3rem;
			line-height: 0.3rem;
			padding: 0 0.1rem;
			color: #818a0b;
		}
		
		@at-root .per-module-list {
			padding: 0 0.2rem 0.2rem;
			
			@at-root .per-info {
				height: 0.5rem;
				line-height: 0.5rem;
				display: flex;
				
				.per-info-title {
					margin-right: 0.1rem;
					display: inline-block;
					width: 0.7rem;
					text-align: left;
					font-size: 0.12rem;
					vertical-align: bottom;
					color: #cccccc;
					
					> .iconfont {
						display: inline-block;
						font-size: 0.18rem;
						width: 0.2rem;
						vertical-align: bottom;
						color: #818a0b;
					}
				}
				
				input, select {
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
				
				.area-box {
					flex: 1;
					
					> select {
						width: 33.3%;
					}
				}
				
				.sd-week {
					flex: 1;
					li {
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
						
						&.selected {
							background-color: #ff7625;
							color: #ffffff;
							border: none;
						}
					}
				}
			}
		}
	}
	
	.next-step {
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
	
	.mintui-field-success {
		color: #0bc16f;
		border-bottom: 0.5px solid #eeeeee;
	}
	
	.mintui-field-error {
		color: #f44336;
		border-bottom: 0.5px solid #eeeeee;
	}
</style>