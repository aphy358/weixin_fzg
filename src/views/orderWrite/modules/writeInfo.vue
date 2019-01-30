<!-- 组件说明 -->
<template>
	<div class="write-info-box">
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title">房间数</span>
				<label class="per-info-txt">
					<select name="roomNum" id="roomNum" v-model="roomNum" style="width: 2rem;">
						<option v-for="(item, index) in roomNumList" :key="'_roomnum' + index" :value="item">{{item}}
						</option>
					</select>
				</label>
			</div>
			<div class="per-line">
				<span class="per-info-title">手机号</span>
				<input v-validate="'required|fzgMobilePhone'" name="手机号" type="tel" class="per-info-input"
				       placeholder="用于接收通知" v-model="tel"/>
				<i v-show="telIconVisible" class="validate-identifier mintui"
				   :class="errors.has('手机号')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
			<div class="per-line">
				<span class="per-info-title">Email</span>
				<input v-validate="'required|email'" type="text" name="邮箱" class="per-info-input" placeholder="用于接收通知"
				       v-model="email">
				<i v-show="emailIconVisible" class="validate-identifier mintui"
				   :class="errors.has('邮箱')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
			<div class="per-line">
				<span class="per-info-title">结算方式</span>
				<label class="per-info-txt">
					<select name="payment" id="payment" style="width: 2rem;" v-model="paymentType">
						<option v-for="(item, index) in paymentList" :key="'_payment' + index" :value="item.value">{{item.label}}</option>
					</select>
				</label>
			</div>
			<div class="per-line" v-if="balanceVisible">
				<span class="per-info-title">使用预收款</span>
				<input class="per-info-input" type="number" v-model="useBalance" :placeholder="'剩余：￥' + (content.balance || 0)" @blur="checkBalance">
				<i v-show="balanceIconVisible" class="validate-identifier mintui"
				   :class="useBalanceTips ?'mintui-field-success':'mintui-field-error'"></i>
			</div>
		</div>
		<div class="per-module name-module" v-if="nameArr.length > 0 && nameRegArr.length > 0" :max="maxPersonNum" :style="'height:' + nameModuleHeight + 'rem;'">
			<div class="per-line">
				<span class="per-info-title purple"><i class="iconfont icon-yonghu"></i>入住人</span>
			</div>
			<div class="per-line" v-for="item in nameRank" v-show="nameVisibleArr[item]" :key="'_inname' + item">
				<input v-validate="nameRegArr[item]" name="姓" type="text" class="username-input last-name"
				       placeholder="姓 Last name" v-model="nameArr[item].l"/>/
				<input v-validate="nameRegArr[item]" name="名" type="text" class="username-input first-name"
				       placeholder="名 First name" v-model="nameArr[item].f"/>/
				<span class="username-input nationality" :class="nameArr[item].n ? '' : 'grey'"
				      @click.prevent.stop="selectNationality(item)">{{nameArr[item].n || '国籍'}}</span>
				<i v-if="item === 0 || item%maxPersonNum === 0" class="iconfont icon-plus2 username-icon purple"
				   @click="nextVisible(item)"></i>
				<i v-if="item !== 0 && item%maxPersonNum !== 0" class="iconfont icon-minus2 username-icon deep-orange"
				   @click="hideName(item)"></i>
			</div>
		</div>
		
		
		<div class="per-module name-module">
			<h6 class="per-module-title purple"><i class="iconfont icon-star-full"></i>个人偏好</h6>
			<div class="per-line">
				<span class="per-info-title">个性化需求</span>
				<span class="per-info-txt" @click="openSpecial"
				      style="overflow: hidden;width: 2.4rem;box-sizing: border-box;height: 100%;">{{specialStr || '添加个性化需求'}}</span>
				<mt-popup class="popup-bottom" v-model="specialVisible" position="bottom">
					<OperationBtn @clear="clearSpecial" @confirm="confirmSpecial"/>
					<mt-checklist v-model="specialReq" :options="specialReqList"></mt-checklist>
				</mt-popup>
			</div>
			<div class="per-line" v-if="bedTypeList.length >= 2">
				<span class="per-info-title">床型偏好</span>
				<label class="per-info-txt">
					<select name="bedType" id="bedType" style="width: 2rem;" v-model="bedType">
						<option v-for="(item, index) in bedTypeList" :key="'_bedType' + index" :value="item.bedTypeId">{{item.bedTypeName}}
						</option>
					</select>
				</label>
			</div>
			<div class="per-line purple"
			     style="font-size: 0.12rem;height: auto;line-height: 0.24rem;padding: 0.1rem 0.2rem;">
				您的{{bedTypeList.length >= 2 ? '床型偏好及' : ''}}个性化需求，我们会及时通知酒店并尽量协助安排，但要视酒店情况，不能确保满足。
			</div>
		</div>
		
		<extraService/>
		
		<div class="per-module name-module" v-if="marketingInfo">
			<div class="per-line">
				<span class="per-info-title purple"><i class="iconfont icon-gift"></i>小礼包</span>
			</div>
			<div class="per-line" style="margin: 0 0.3rem;">
				<span>礼包信息：{{marketingInfo}}</span>
			</div>
			<div class="per-line" style="margin: 0 0.3rem;">
				<span>手机号：</span>
				<input name="手机号" type="tel" v-model="marketingTel"
				       v-validate="marketingInfo ? 'required|fzgMobilePhone' : ''" placeholder="必填"
				       style="width: 2.3rem">
				<i v-show="marketingIconVisible" class="validate-identifier mintui"
				   :class="errors.has('手机号')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
		</div>
		
		<div class="rules">
			<h6 class="rule-title">取消条款</h6>
			<p class="rule-txt">{{hotelPrice.cancellationDesc}}</p>
			<h6 class="rule-title">入住离店时间</h6>
			<p class="rule-txt">酒店入住时间最早为{{hotelPrice.arriveStartTime || "14:00"}}，入住最晚时间为{{hotelPrice.arriveEndTime || (staticInfo.country == 70007 ? "12:00" : "24:00")}}。</p>
			<h6 class="rule-title" v-if="staticInfo.country == 70139">温馨提示</h6>
			<p class="rule-txt" v-if="staticInfo.country == 70139">应马来西亚政府要求，所有星级的住宿场所和酒店将征收旅游税，外国游客需缴付MYR 10/房/晚，在客人办理离店时支付酒店前台！</p>
			<h6 class="rule-title" v-if="hotelPrice.checkInInstructions">入住提示</h6>
			<p class="rule-txt" v-if="hotelPrice.checkInInstructions">{{hotelPrice.checkInInstructions}}</p>
			<h6 class="rule-title" v-if="content.specialHintsSuppids && content.specialHintsSuppids.indexOf(content.supplierId) !== -1">预订提示</h6>
			<p class="rule-txt" v-if="content.specialHintsSuppids && content.specialHintsSuppids.indexOf(content.supplierId) !== -1">此房价为2人入住价格，若多人入住，则需在酒店前台支付相应费用</p>
			<h6 class="rule-title" v-if="hotelPrice.specialCheckInInstructions">特殊入住提示</h6>
			<p class="rule-txt" v-if="hotelPrice.specialCheckInInstructions">{{hotelPrice.specialCheckInInstructions}}</p>
		</div>
		
		<div class="total-pay clearfix" :class="payVisible && !confirmVisible ? 'show-animate' : 'hide-animated'">
			<span class="fl orange">订单总额：￥</span>
			<span class="fl orange total-money">{{+(+payTotalMoney*100 + +totalBreakfastPrice*100 + +totalBedPrice*100 + +totalNetworkPrice*100 + taxesAndFeesRMB*100)/100}}</span>
			<button class="fr next-step" @click="onSubmit" type="submit">下一步</button>
			<span class="fr gray" style="margin-right: 0.2rem;font-size: 0.12rem" @click="showFeeDetails">明细</span>
		</div>
		<mt-popup v-model="feeDetailsVisible" position="bottom">
			<feeDetails @hideFeeDetails="hideFeeDetails"/>
		</mt-popup>
		
		<mt-popup v-model="confirmVisible" popup-transition="popup-fade">
			<confirmInfo @close="closeConfirmMask"/>
		</mt-popup>
		
		<mt-popup class="nationality-popup" v-model="nationalityVisible" position="right" catchtouchmove="true">
			<nationality @hideNationality="hideNationality" @selectNationality="getNationality"/>
		</mt-popup>
	
	</div>
</template>

<script>
  import OperationBtn from '@/components/OperationBtn.vue';
  import confirmInfo from '../modules/confirmInfo.vue';
  import nationality from '../modules/nationality.vue';
  import extraService from '../modules/extraService.vue';
  import feeDetails from '../modules/feeDetails.vue';
  import {MessageBox, Toast} from 'mint-ui';
  
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';


  const config = {
    locale: 'zh_CN',
    events: 'blur',
  };
  Vue.use(VeeValidate, config);
  
  export default {
    name: '',
    
    data() {
      return {
        specialVisible: false,
        nameVisibleArr: [],
        nameRegArr: [],
        payVisible: true,
        telIconVisible: false,
        marketingIconVisible: false,
        emailIconVisible: false,
        email: '',
        tel: '',
        specialReq: [],
        nameArr: [],
        nameRank: [],
        country: 70007,
        confirmVisible: false,
        nationalityVisible: false,
        nameModuleHeight: 1,
        nationalityIndex: 0, //由于所有国籍输入框共用一个国籍选择弹出框，而函数内部传参在此处不可行，所以使用一个变量指示每次选择国籍的index，以便赋值到对应地方
        feeDetailsVisible: false,
        marketingTel: '',
        specialStr: '',
        paymentType: 0,
        useBalance: '',
        balanceIconVisible: false,
        useBalanceTips: false,
        balanceVisible: false,
      }
    },
    
    props: {},
    
    components: {
      OperationBtn,
      confirmInfo,
      nationality,
      extraService,
      feeDetails
    },
    
    computed: {
      bedTypeList() {
        return this.$store.state.orderWrite.bedTypeList;
      },
      marketingInfo() {
        return this.$store.state.orderWrite.content.marketingObj ? state.orderWrite.content.marketingObj.marketingInfo : '';
      },
      bedType() {
        return this.$store.state.orderWrite.bedTypeList[0].bedTypeId;
      },
      payTotalMoney() {
        return this.$store.state.orderWrite.payTotalMoney;
      },
      maxPersonNum() {
        return this.$store.state.orderWrite.maxPersonNum
      },
      hotelPrice() {
        return this.$store.state.orderWrite.hotelPrice
      },
      staticInfo() {
        return this.$store.state.orderWrite.staticInfo
      },
      content() {
        return this.$store.state.orderWrite.content
      },
      taxesAndFeesRMB() {
        return this.$store.state.orderWrite.taxesAndFeesRMB
      },
      totalBreakfastPrice() {
        return this.$store.state.orderWrite.totalBreakfastPrice
      },
      totalBedPrice() {
        return this.$store.state.orderWrite.totalBedPrice
      },
      totalNetworkPrice() {
        return this.$store.state.orderWrite.totalNetworkPrice
      },
      roomNum: {
        // getter
        get: function () {
          return this.$store.state.orderWrite.roomNum
        },
        // setter
        set: function (newValue) {
          this.$store.commit('orderWrite/setCommonState', {k: 'roomNum', v: newValue});
        }
      },
      specialReqList() {
        let arr = [];
        let specialConditions = this.$store.state.orderWrite.specialConditions;
        for (let i = 0; i < specialConditions.length; i++) {
          let o = specialConditions[i];
          arr.push(o.optionname);
        }
        return arr;
      },
      roomNumList() {
        let stock = this.$store.state.orderWrite.stock;
        let arr = [];
        for (let i = 0; i < stock; i++) {
          arr.push(i + 1);
        }
        return arr;
      },
      paymentList() {
        let paymentTerm = this.$store.state.orderWrite.distributor.paymentTerm;
        this.paymentType = paymentTerm;
        if (paymentTerm === 0) {
          this.balanceVisible = true;
          return [{
            label: '单结',
            value: 0
          }];
        } else {
          return [
            {
              label: '单结',
              value: 0
            },
            {
              label: ["客人前台现付", '单结', '周结', '半月结', '月结', '不固定', '三日结', '十日结', '额度结'][paymentTerm + 1],
              value: paymentTerm
            }
          ]
        }
      }
    },
    
    activated() {
      //设置入住人相关
      this.setUserName();
    },
    
    created() {
      //新增验证规则
      this.$validator.extend('inner', {
        //中文或拼音
        getMessage: field => field + '只能输入中文或拼音',
        validate: value => /^([\u4e00-\u9fa5a-zA-Z]+)$/.test(value)
      });
      
      this.$validator.extend('outer', {
        //英文
        getMessage: field => field + '只能输入英文或拼音',
        validate: value => /^[a-zA-Z]*$/.test(value)
      });
      
      this.$validator.extend('fzgMobilePhone', {
        //手机号
        getMessage: field => '手机号格式错误',
        validate: value => /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
      });
      
      //错误提示
      const dictionary = {
        en: {
          messages: {
            required: field => '请输入' + field,
            tel: field => field + '格式错误',
            email: field => field + '格式错误',
          }
        }
      };
      this.$validator.localize(dictionary);
    },
    
    mounted() {
      document.querySelector('.order-write-box-page .page-content').addEventListener('scroll', this.handleScroll);
  
      // if(/Android [4-6]/.test(window.navigator.appVersion)) {
      //   window.addEventListener("resize", function() {
      //     if(document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      //       document.activeElement.scrollIntoViewIfNeeded();
      //     }
      //   })
      // }
    },
    
    watch: {
      roomNum() {
        this.$store.dispatch('orderWrite/getProductInfo', {
          k: 'vueCase',
          v: {
            vueCase: this
          }
        });
        this.setUserName();
      }
    },
    
    methods: {
      handleScroll() {
        this.payVisible = document.querySelector('.order-write-box-page .page-content').scrollTop >= 20;
      },
      openSpecial() {
        this.specialVisible = true;
      },
      clearSpecial() {
        this.specialReq = [];
      },
      confirmSpecial() {
        let str = '';
        for (let i = 0; i < this.specialReq.length; i++) {
          let item = this.specialReq[i];
          str += item + '，';
        }
        this.specialStr = str.replace(/，$/, '');
        this.specialVisible = false;
      },
      nextVisible(index) {
        let maxPersonNum = this.maxPersonNum;
        let roomNum = this.roomNum;
        for (let i = index + 1; i <= (index + maxPersonNum); i++) {
          if (i > (index + maxPersonNum - 1)) {
            MessageBox('提示', '无法继续增加入住人信息');
            return;
          }
          
          if (i % maxPersonNum === 1 && i !== 0 && i % maxPersonNum !== 0 && !this.nameVisibleArr[i] && this.nameVisibleArr[i + 1]) {
            //以最大入住人为3为例，如果用户删掉了第二个入住人的数据，再次点增加时则将第三个入住人的数据挪到第二个入住人中，从而保持新增的入住人为空
            this.$set(this.nameArr, i, {l: this.nameArr[i + 1].l, f: this.nameArr[i + 1].f, n: this.nameArr[i + 1].n});
            this.$set(this.nameArr, i + 1, {l: '', f: '', n: ''});
          }
          
          if (i % maxPersonNum !== 0 && !this.nameVisibleArr[i]) {
            this.$set(this.nameVisibleArr, i, true);
            this.nameModuleHeight += 0.5;
            break;
          }
          
        }
      },
      hideName(index) {
        this.$set(this.nameVisibleArr, index, false);
        this.$set(this.nameArr, index, {l: '', f: '', n: ''});
        this.nameModuleHeight -= 0.5;
      },
      onSubmit() {
        this.$validator.validateAll().then((result) => {
          this.telIconVisible = true;
          this.emailIconVisible = true;
          this.marketingIconVisible = true;
          
          //由于附加入住人的信息是否必填是由用户是否填了其中一个决定的，而如果要对nameArr中的元素逐个watch显然是不可能的（一方面因为nameArr是动态生成的，不可能在写watch代码的时候就知道nameArr的内容；另一方面应该监控的也是nameArr[0].l这种深层值，显然并没有操作性；还有，如果直接监控整个nameArr，则容易牺牲很大的性能）所以此处是否必填由如下for循环中的代码进行提示，而格式则由vee-validate进行提示
          let flag = true;
          for (let i = 0; i < this.nameArr.length; i++) {
            if (i === 0 || i % this.maxPersonNum === 0) {
              //主入住人
              if (!(this.nameArr[i].l && this.nameArr[i].f && this.nameArr[i].n)) {
                MessageBox('提示', '主入住人的姓、名和国籍均为必填');
                flag = false;
                break;
              }
            } else {
              //附加入住人
              if (this.nameVisibleArr[i]) {
                if (this.nameArr[i].l || this.nameArr[i].f || this.nameArr[i].n) {
                  if (!(this.nameArr[i].l && this.nameArr[i].f && this.nameArr[i].n)) {
                    MessageBox('提示', '附加入住人填了姓、名或国籍其中一个，则该入住人的所有信息都为必填');
                    flag = false;
                    break;
                  }
                }
              }
            }
          }
          
          if (!flag){
            return;
          }else{
            flag = this.checkBalance();
          }
          
          if (flag){
            if (result) {
              //弹出确认框
              let name = '';
              let nameParams = '';
              for (let i = 0; i < this.nameArr.length; i++) {
                let item = this.nameArr[i];
                if (item.l && item.f && item.n){
                  name += item.l + item.f + '[' + item.n + ']，';
                  nameParams += (i + 1) + '#' + (i%this.maxPersonNum === 0 ? 'main' : 'other') + '#' + item.l + '#' + item.f + '#' + item.n;
                }
              }
              name = name.replace(/，$/, '');
              let params = {
                hotelName: this.$store.state.orderWrite.staticInfo.infoName,
                roomType: this.$store.state.orderWrite.hotelPrice.roomName,
                date: this.$store.state.orderWrite.checkin + '/' + this.$store.state.orderWrite.checkout,
                roomNum: this.roomNum,
                name: name,
                nameParams: nameParams,
                tel: this.tel,
                email: this.email,
                paymentTerm: this.paymentType,
                specialReq: this.specialStr,
                cancelInfo: this.hotelPrice.cancellationDesc,
                totalPay: +(this.payTotalMoney*100 + this.totalBreakfastPrice*100 + this.totalBedPrice*100 + this.totalNetworkPrice*100 + this.taxesAndFeesRMB*100)/100,
                bedType: this.bedType || '',
                marketingTel: this.marketingTel,
                useBalance: this.useBalance
              };
              
              if (this.bedType){
                for (let i = 0; i < this.bedTypeList.length; i++) {
                  let o = this.bedTypeList[i];
                  if (o.bedTypeId === this.bedType){
                    params.bedTypeName = o.bedTypeName;
                  }
                }
              }
    
              this.$store.dispatch('orderWrite/confirmOrderInfo', {
                k: 'orderInfo',
                v: params
              });
    
              this.confirmVisible = true;
            } else {
              if (this.marketingInfo && !this.marketingTel) {
                MessageBox('提示', '小礼包中的手机号为必填');
                return;
              }
              
              MessageBox('提示', this.errors.first('手机号') || this.errors.first('邮箱') || this.errors.first('姓') || this.errors.first('名'));
            }
          }
          
        });
      },
      closeConfirmMask() {
        this.confirmVisible = false;
      },
      selectNationality(index) {
        this.nationalityVisible = true;
        this.nationalityIndex = index;
        
        this.payVisible = false;
      },
      hideNationality() {
        this.nationalityVisible = false;
      },
      getNationality($event) {
        let index = this.nationalityIndex;
        this.$set(this.nameArr, index, {l: this.nameArr[index].l, f: this.nameArr[index].f, n: $event});
      },
      showFeeDetails() {
        this.feeDetailsVisible = true;
      },
      hideFeeDetails() {
        this.feeDetailsVisible = false;
      },
      setUserName() {
        //入住人显示与否、验证规则
        let maxPersonNum = this.$store.state.orderWrite.maxPersonNum;
        let roomNum = this.roomNum;
        let nameArr = [];
        let nameRank = [];
        let nameVisibleArr = [];
        let nameRegArr = [];
        for (let i = 0; i < maxPersonNum * roomNum; i++) {
          nameArr[i] = [];
          nameArr[i] = [{
            l: '',
            f: '',
            n: ''
          }];
          nameRank[i] = i;
          if (i === 0 || i % maxPersonNum === 0) {
            nameVisibleArr[i] = true;
            if (this.country === 70007) {
              nameRegArr[i] = 'required|inner';
            } else {
              nameRegArr[i] = {required: true, regex: /^[a-zA-Z]*$/};
              nameRegArr[i] = 'required|outer';
            }
          } else {
            nameVisibleArr[i] = false;
            if (this.country === 70007) {
              nameRegArr[i] = 'inner';
            } else {
              nameRegArr[i] = 'outer';
            }
          }
        }
  
        this.nameArr = nameArr;
        this.nameRank = nameRank;
        this.nameVisibleArr = nameVisibleArr;
        this.nameRegArr = nameRegArr;
        this.nameModuleHeight = 0.5 + (roomNum * 0.5);
      },
      checkBalance(){
        let flag = true;
        let useBalance = this.useBalance;
        if (useBalance){
          flag = false;
          this.useBalanceTips = false;
          if (useBalance < 0){
            Toast('使用的预收款金额不能为负数');
          }else if (useBalance > this.content.balance){
            Toast('使用金额超出预收款额度');
          }else if (useBalance > (+this.payTotalMoney + +this.totalBreakfastPrice + +this.totalBedPrice + +this.totalNetworkPrice + this.taxesAndFeesRMB)){
            Toast('支付金额不能多于订单金额');
          }else if (!/^\d+(\.\d{0,2})?$/.test(useBalance)){
            Toast('支付金额最多只能输入小数点后两位');
          }else{
            //通过验证
            this.useBalanceTips = true;
            flag = true;
          }
  
          this.balanceIconVisible = true;
        }
        return flag;
      },
    }
  }
</script>

<style scoped lang="scss">
	.write-info-box {
		@at-root .per-module {
			background-color: #fff;
			margin-bottom: 0.1rem;
			transition: all .5s;
			
			&.name-module {
				overflow: hidden;
			}
			
			@at-root .per-line {
				height: 0.5rem;
				line-height: 0.5rem;
				border-bottom: 1px solid #ececec;
				margin: 0 0.1rem;
				
				&:last-child {
					border: none;
				}
				
				@at-root .per-info-title {
					display: inline-block;
					width: 0.8rem;
					padding-left: 0.2rem;
					color: #777a7c;
					float: left;
				}
				
				.per-info-txt {
					display: inline-block;
					flex: 1;
					padding-left: 0.2rem;
				}
				
				.per-info-input {
					width: 2rem;
					padding-left: 0.2rem;
				}
				
				button {
					border: none;
					background: none;
				}
				
				.cancel {
					font-size: 0.16rem;
					color: #cccccc;
					position: absolute;
					left: 0.2rem;
					top: 0.1rem;
				}
				
				.confirm {
					text-align: right;
					font-size: 0.16rem;
					color: #099FDE;
					position: absolute;
					right: 0.2rem;
					top: 0.1rem;
				}
				
				.username-input {
					padding-left: 0.2rem;
					width: 1rem;
					
					&.nationality {
						width: 0.4rem;
						height: 0.14rem;
						padding-left: 0;
						display: inline-block;
						
						&.grey {
							color: #d8d8dc;
						}
					}
				}
				
				.username-icon {
					padding: 0.1rem 0.2rem;
					font-size: 0.16rem;
				}
				
				.mint-popup.popup-bottom {
					background-color: #fff;
				}
			}
			
			@at-root .per-module-title {
				height: 0.5rem;
				line-height: 0.5rem;
				padding: 0 0.3rem;
				font-size: 0.14rem;
				font-weight: normal;
				background-image: linear-gradient(to bottom, rgb(250, 246, 240), rgb(255, 255, 255));
			}
			
			.operation-btn {
				line-height: 0.4rem;
				/*margin: 0 0.1rem;*/
			}
		}
		
		@at-root .rules {
			padding: 0 0.2rem 1.4rem;
			.rule-title {
				color: #050505;
				font-weight: bold;
				font-size: 0.12rem;
				line-height: 0.3rem;
			}
			
			.rule-txt {
				color: #777a7c;
				line-height: 0.3rem;
			}
		}
		
		.mint-popup {
			background: none;
			
			&.nationality-popup {
				background-color: #fff;
				height: 100%;
			}
		}
		
		input {
			border: none;
		}
		
		select {
			border: none;
		}
		
	}
	
	.total-pay {
		display: block;
		width: 100%;
		height: 0.5rem;
		line-height: 0.5rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10000;
		background-color: #fff;
		padding: 0 0.2rem;
		box-sizing: border-box;
		transition: all .5s;
	}
	
	.hide-animated {
		bottom: -0.5rem;
	}
	
	.show-animate {
		bottom: 0;
	}
	
	.total-money {
		font-size: 0.16rem;
		font-weight: bold;
	}
	
	.next-step {
		height: 0.32rem;
		line-height: 0.32rem;
		border: none;
		border-radius: 4px;
		background-color: #ff7625;
		color: #ffffff;
		margin: 0.09rem 0;
		padding: 0 0.1rem;
	}
	
	.mintui-field-success {
		color: #0bc16f;
	}
	
	.mintui-field-error {
		color: #f44336;
	}
	
	.green {
		color: #0bc16f;
	}
	
	.purple {
		color: #666fb1;
	}
	
	.deep-orange {
		color: #ff4400;
	}

</style>