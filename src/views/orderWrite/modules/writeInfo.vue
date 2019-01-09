<!-- 组件说明 -->
<template>
	<div class="write-info-box">
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title">房间数</span>
				<label class="per-info-txt">
					<select name="roomNum" id="roomNum" style="width: 2rem;">
						<option v-for="(item, index) in roomNumList" :key="'_roomnum' + index" :value="item">{{item}}</option>
					</select>
				</label>
			</div>
			<div class="per-line">
				<span class="per-info-title">个性化需求</span>
				<span class="per-info-txt" @click="openSpecial" style="overflow: hidden;width: 2.4rem;box-sizing: border-box;height: 100%;">{{specialStr || '添加个性化需求'}}</span>
				<mt-popup class="popup-bottom" v-model="specialVisible" position="bottom">
					<OperationBtn @clear="clearSpecial" @confirm="confirmSpecial"/>
					<mt-checklist v-model="specialReq" :options="specialReqList"></mt-checklist>
				</mt-popup>
			</div>
			<div class="per-line">
				<span class="per-info-title">手机号</span>
				<input v-validate="'required|fzgMobilePhone'" name="手机号" type="tel" class="per-info-input" placeholder="用于接收通知" v-model="tel"/>
				<i v-show="telIconVisible" class="validate-identifier mintui" :class="errors.has('手机号')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
			<div class="per-line">
				<span class="per-info-title">Email</span>
				<input v-validate="'required|email'" type="text" name="邮箱" class="per-info-input" placeholder="用于接收通知" v-model="email">
				<i v-show="emailIconVisible" class="validate-identifier mintui" :class="errors.has('邮箱')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
			<div class="per-line">
				<span class="per-info-title">结算方式</span>
				<label class="per-info-txt">
					<select name="payment" id="payment" style="width: 2rem;">
						<option v-for="(item, index) in paymentList" :key="'_payment' + index" :value="item">{{item}}</option>
					</select>
				</label>
			</div>
		</div>
		<div class="per-module name-module" :max="maxPersonNum" :style="'height:' + nameModuleHeight + 'rem;'">
			<div class="per-line">
				<span class="per-info-title purple"><i class="iconfont icon-yonghu"></i>入住人</span>
			</div>
			<div class="per-line" v-for="item in nameRank" v-show="nameVisibleArr[item]" :key="'_inname' + item">
				<input v-validate="nameRegArr[item]" name="lastName" type="text" class="username-input last-name" placeholder="姓 Last name" v-model="nameArr[item].l"/>/
				<input v-validate="nameRegArr[item]" name="firstName" type="text" class="username-input first-name" placeholder="名 First name" v-model="nameArr[item].f"/>/
				<span class="username-input nationality" :class="nameArr[item].n ? '' : 'grey'" @click.prevent.stop="selectNationality(item)">{{nameArr[item].n || '国籍'}}</span>
				<i v-if="item === 0 || item%maxPersonNum === 0" class="iconfont icon-plus2 username-icon purple" @click="nextVisible(item)"></i>
				<i v-if="item !== 0 || item%maxPersonNum !== 0" class="iconfont icon-minus2 username-icon deep-orange" @click="hideName(item)"></i>
			</div>
		</div>
		
		<extraService/>
		
		<div class="per-module name-module" v-if="marketingVisible">
			<div class="per-line">
				<span class="per-info-title purple"><i class="iconfont icon-gift"></i>小礼包</span>
			</div>
			<div class="per-line" style="margin: 0 0.3rem;">
				<span>礼包信息：</span>
			</div>
			<div class="per-line" style="margin: 0 0.3rem;">
				<span>手机号：</span>
				<input name="手机号" type="tel" v-model="marketingTel" v-validate="marketingVisible ? 'required|fzgMobilePhone' : ''" placeholder="必填" style="width: 2.3rem">
				<i v-show="marketingIconVisible" class="validate-identifier mintui" :class="errors.has('手机号')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
		</div>
		
		<div class="rules">
			<h6 class="rule-title">取消条款</h6>
			<p class="rule-txt">此房即订即保，一旦预订，不可修改或取消。</p>
			<h6 class="rule-title">入住须知</h6>
			<p class="rule-txt">酒店入住时间最早为14:00，入住最晚时间为24:00。</p>
			<h6 class="rule-title">温馨提示</h6>
			<p class="rule-txt">应马来西亚政府要求，所有星级的住宿场所和酒店将征收旅游税，外国游客需缴付MYR 10/房/晚，在客人办理离店时支付酒店前台！</p>
			<h6 class="rule-title">预订提示</h6>
			<p class="rule-txt">此房价为2人入住价格，若多人入住，则需在酒店前台支付相应费用</p>
			<h6 class="rule-title">特殊入住提示</h6>
			<p class="rule-txt"></p>
		</div>
		
		<div class="total-pay clearfix" :class="payVisible ? 'show-animate' : 'hide-animated'">
			<span class="fl orange">订单总额：￥</span>
			<span class="fl orange total-money">843.15</span>
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
  import { MessageBox } from 'mint-ui';
  
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate, { validity: true });
  
  export default {
    name: '',
    
    data() {
      return {
        roomNum: false,
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
        specialReqList: ['立即到店', '原房续住', '安静房间', '吸烟楼层', '连通房间', '相同楼层', '尽量有窗', '尽量无烟楼层', '尽量相邻房间', '尽量高层楼房', '残疾设施房间', '尽量大床房', '尽量双床房'],
        paymentList: ['单结'],
        nameArr: [
          {l: '', f: '', n: ''},
          {l: '', f: '', n: ''},
          {l: '', f: '', n: ''},
        ],
        nameRank: [],
        country: 70007,
        confirmVisible: false,
        nationalityVisible: false,
        nameModuleHeight: 1,
        nationalityIndex: 0, //由于所有国籍输入框共用一个国籍选择弹出框，而函数内部传参在此处不可行，所以使用一个变量指示每次选择国籍的index，以便赋值到对应地方
        feeDetailsVisible: false,
        marketingVisible: true,
        marketingTel: '',
        specialStr: '',
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
      maxPersonNum(){
        return this.$store.state.orderWrite.maxPersonNum;
      },
      roomNumList(){
        let stock = this.$store.state.orderWrite.stock;
        let arr = [];
        for (let i = 0; i < stock; i++) {
          arr.push(i + 1);
          
        }
        return arr;
      }
    },
    
    activated(){
      //入住人显示与否、验证规则
      let maxPersonNum = this.$store.state.orderWrite.maxPersonNum;
      let roomNum = this.$store.state.roomNum;
      for (let i = 0; i < maxPersonNum * roomNum; i++) {
        this.$set(this.nameRank, i, i);
        if (i === 0 || i%maxPersonNum === 0){
          this.$set(this.nameVisibleArr, i, true);
          if(this.country === 70007){
            this.$set(this.nameRegArr, i, 'required|inner');
          }else{
            this.$set(this.nameRegArr, i, { required: true, regex: /^[a-zA-Z]*$/ });
            this.$set(this.nameRegArr, i, 'required|outer');
          }
        }else{
          this.$set(this.nameVisibleArr, i, false);
          if(this.country === 70007){
            this.$set(this.nameRegArr, i, 'inner');
          }else{
            this.$set(this.nameRegArr, i, 'outer');
          }
          
        }
      }
      
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
          messages:{
            required: field => '请输入' + field,
            tel: field => field + '格式错误',
            email: field => field + '格式错误',
          }
        }
      };
      this.$validator.localize(dictionary);
    },
  
    mounted () {
      document.querySelector('.order-write-box-page .page-content').addEventListener('scroll', this.handleScroll)
    },
    
    methods: {
      handleScroll () {
        this.payVisible = document.querySelector('.order-write-box-page .page-content').scrollTop >= 20;
      },
      openSpecial(){
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
      nextVisible(index){
        let maxPersonNum = this.maxPersonNum;
        for (let i = 1; i <= this.nameVisibleArr.length; i++){
          if (i > ((index + 1) * maxPersonNum - 1)){
            MessageBox('提示', '无法继续增加入住人信息');
            return;
          }
  
          if (i%maxPersonNum === 1 && i !== 0 && i%maxPersonNum !== 0 && !this.nameVisibleArr[i] && this.nameVisibleArr[i + 1]){
            //以最大入住人为3为例，如果用户删掉了第二个入住人的数据，再次点增加时则将第三个入住人的数据挪到第二个入住人中，从而保持新增的入住人为空
            this.$set(this.nameArr, i, {l: this.nameArr[i + 1].l, f: this.nameArr[i + 1].f, n: this.nameArr[i + 1].n});
            this.$set(this.nameArr, i + 1, {l: '', f: '', n: ''});
          }
  
          if (i%maxPersonNum !== 0 && !this.nameVisibleArr[i]){
            this.$set(this.nameVisibleArr, i, true);
            this.nameModuleHeight += 0.5;
            break;
          }
  
        }
      },
      hideName(index){
        this.$set(this.nameVisibleArr, index, false);
        this.$set(this.nameArr, index, {l: '', f: '', n: ''});
        this.nameModuleHeight -= 0.5;
      },
      onSubmit(){
        this.$validator.validateAll().then((result) => {
          this.telIconVisible = true;
          this.emailIconVisible = true;
          this.marketingIconVisible = true;
          if (result) {
            //弹出确认框
            let params = {
              hotelName: '深圳海燕大酒店',
              roomType: '豪华双床房[双床]',
              date: '2018-12-09/2018-12-10',
              roomNum: 1,
              name: '测试',
              confirmWay: '手机号：13537820062',
              payWay: '单结',
              specialReq: '',
              cancelInfo: '此房即订即保，一旦预订，不可修改或取消',
              totalPay: '417.90',
            };
  
            this.$store.dispatch('orderWrite/confirmOrderInfo', {
              k : 'orderInfo',
              v : params
            });
            
            this.confirmVisible = true;
          }else{
            let flag = true;
            for (let i = 0; i < 3; i++) {
              if (i === 0 || i%3 === 0){
                //主入住人
                if (!(this.nameArr[i].l && this.nameArr[i].f && this.nameArr[i].n)){
                  MessageBox('提示', '主入住人的姓、名和国籍均为必填');
                  flag = false;
                  break;
                }
              }else{
                //附加入住人
                if (this.nameVisibleArr[i]){
                  if (this.nameArr[i].l || this.nameArr[i].f || this.nameArr[i].n){
                    if (!(this.nameArr[i].l && this.nameArr[i].f && this.nameArr[i].n)){
                      MessageBox('提示', '附加入住人填了姓、名或国籍其中一个，则该入住人的所有信息都为必填');
                      flag = false;
                      break;
                    }
                  }
                }
              }
            }
  
            if (this.marketingVisible && !this.marketingTel){
              MessageBox('提示', '小礼包中的手机号为必填');
              return;
            }
            if (flag){
              MessageBox('提示', this.errors.first('手机号') || this.errors.first('邮箱') || this.errors.first('lastName') || this.errors.first('firstName'));
            }
          }
        });
      },
      closeConfirmMask(){
        this.confirmVisible = false;
      },
      selectNationality(index){
        this.nationalityVisible = true;
        this.nationalityIndex = index;
        
        this.payVisible = false;
      },
      hideNationality(){
        this.nationalityVisible = false;
      },
      getNationality($event){
        let index = this.nationalityIndex;
        this.$set(this.nameArr, index, {l: this.nameArr[index].l, f: this.nameArr[index].f, n: $event});
      },
      showFeeDetails(){
        this.feeDetailsVisible = true;
      },
      hideFeeDetails(){
        this.feeDetailsVisible = false;
      }
    }
  }
</script>

<style scoped lang="scss">
	.write-info-box{
		@at-root .per-module{
			background-color: #fff;
			margin-bottom: 0.1rem;
			transition: all .5s;
			
			&.name-module{
				overflow: hidden;
			}
			
			@at-root .per-line{
				height: 0.5rem;
				line-height: 0.5rem;
				border-bottom: 1px solid #ececec;
				margin: 0 0.1rem;
				
				&:last-child{
					border: none;
				}
				
				@at-root .per-info-title{
					display: inline-block;
					width: 0.8rem;
					padding-left: 0.2rem;
					color: #777a7c;
					float: left;
				}
				
				.per-info-txt{
					display: inline-block;
					flex: 1;
					padding-left: 0.2rem;
				}
				
				.per-info-input{
					width: 2rem;
					padding-left: 0.2rem;
					height: 100%;
					line-height: 100%;
				}
				
				button{
					border: none;
					background: none;
				}
				
				.cancel{
					font-size: 0.16rem;
					color: #cccccc;
					position: absolute;
					left: 0.2rem;
					top: 0.1rem;
				}
				
				.confirm{
					text-align: right;
					font-size: 0.16rem;
					color: #099FDE;
					position: absolute;
					right: 0.2rem;
					top: 0.1rem;
				}
				
				.username-input{
					padding-left: 0.2rem;
					width: 1rem;
					
					&.nationality{
						width: 0.4rem;
						height: 0.14rem;
						padding-left: 0;
						display: inline-block;
						
						&.grey{
							color: #d8d8dc;
						}
					}
				}
				
				.username-icon{
					padding: 0.1rem 0.2rem;
					font-size: 0.16rem;
				}
				
				.mint-popup.popup-bottom{
					background-color: #fff;
				}
			}
			
			.operation-btn{
				line-height: 0.4rem;
			}
		}
		
		@at-root .rules{
			padding: 0 0.2rem 1.4rem;
			.rule-title{
				color: #050505;
				font-weight: bold;
				font-size: 0.12rem;
				line-height: 0.3rem;
			}
			
			.rule-txt{
				color: #777a7c;
				line-height: 0.3rem;
			}
		}
		
		.mint-popup{
			background: none;
			
			&.nationality-popup{
				background-color: #fff;
				height: 100%;
			}
		}
		
		input{
			border: none;
		}
		
		select{
			border: none;
		}
		
	}
	
	
	.total-pay{
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
	
	.hide-animated{
		bottom: -0.5rem;
	}
	
	.show-animate{
		bottom: 0;
	}
	
	.total-money{
		font-size: 0.16rem;
		font-weight: bold;
	}
	
	.next-step{
		height: 0.32rem;
		line-height: 0.32rem;
		border: none;
		border-radius: 4px;
		background-color: #ff7625;
		color: #ffffff;
		margin: 0.09rem 0;
		padding: 0 0.1rem;
	}
	
	.mintui-field-success{
		color: #0bc16f;
	}
	
	.mintui-field-error{
		color: #f44336;
	}
	
	.green{
		color: #0bc16f;
	}
	
	.purple{
		color: #666fb1;
	}
	
	.deep-orange{
		color: #ff4400;
	}
	
</style>