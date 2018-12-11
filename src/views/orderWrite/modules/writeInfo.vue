<!-- 组件说明 -->
<template>
	<div class="write-info-box">
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title">房间数</span>
				<span class="per-info-txt" @click="openRoomNum">1</span>
				<mt-popup v-model="roomNumVisible" position="bottom">
					<button class="confirm" @click="confirmRoomNum">确定</button>
					<mt-picker :slots="roomNumSlots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div>
			<div class="per-line">
				<span class="per-info-title">个性化需求</span>
				<span class="per-info-txt" @click="openSpecial">添加个性化需求</span>
				<mt-popup v-model="specialVisible" position="bottom">
					<OperationBtn @clear="clearSpecial" @confirm="confirmSpecial"/>
					<mt-checklist v-model="specialReq" :options="specialReqList"></mt-checklist>
				</mt-popup>
			</div>
			<div class="per-line">
				<span class="per-info-title">手机号</span>
				<input v-validate="{required:true, regex:/^[1][3,4,5,7,8][0-9]{9}$/}" name="tel" type="tel" class="per-info-input" placeholder="用于接收通知" v-model="tel"/>
				<i v-show="telIconVisible" class="validate-identifier mintui" :class="errors.has('tel')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
			<div class="per-line">
				<span class="per-info-title">Email</span>
				<input v-validate="'required|email'" type="text" name="email" class="per-info-input" placeholder="用于接收通知" v-model="email">
				<i v-show="emailIconVisible" class="validate-identifier mintui" :class="errors.has('email')?'mintui-field-error':'mintui-field-success'"></i>
			</div>
			<div class="per-line">
				<span class="per-info-title">结算方式</span>
				<span class="per-info-txt" @click="openPayment">单结
				</span>
				<mt-popup
						v-model="paymentVisible"
						position="bottom">
					<button class="confirm" @click="confirmPayment">确定</button>
					<mt-picker :slots="paymentSlots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div>
		</div>
		<div class="per-module" :max="maxPersonNum">
			<div class="per-line">
				<span class="per-info-title green"><i class="iconfont icon-yonghu"></i>入住人</span>
			</div>
			<div class="per-line" v-for="item in nameRank" v-show="nameVisibleArr[item]" :key="item">
				<input v-validate="nameRegArr[item]" name="lastName" type="text" class="username-input last-name" placeholder="姓 Last name" v-model="nameArr[item].l"/>/
				<input v-validate="nameRegArr[item]" name="firstName" type="text" class="username-input first-name" placeholder="名 First name" v-model="nameArr[item].f"/>/
				<span class="username-input nationality" v-model="nameArr[item].n" @click.prevent.stop="selectNationality">国籍</span>
				<i v-if="item === 0 || item%maxPersonNum === 0" class="iconfont icon-plus2 username-icon" @click="nextVisible(item)"></i>
				<i v-if="item !== 0 || item%maxPersonNum !== 0" class="iconfont icon-minus2 username-icon" @click="hideName(item)"></i>
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
		</div>
		
		<mt-popup v-model="confirmVisible" popup-transition="popup-fade">
			<confirmInfo @close="closeConfirmMask"/>
		</mt-popup>
		<!--<div class="confirmMask" v-show="confirmVisible"/>-->
		
		<mt-popup class="nationality-popup" v-model="nationalityVisible" position="right" catchtouchmove="true">
			<nationality  @hideNationality="hideNationality"/>
		</mt-popup>
		
	</div>
</template>

<script>
  import OperationBtn from '@/components/OperationBtn.vue';
  import confirmInfo from '../modules/confirmInfo.vue';
  import nationality from '../modules/nationality.vue';
  import { MessageBox } from 'mint-ui';
  
  export default {
    name: '',
    
    data() {
      return {
        roomNum: false,
        roomNumVisible: false,
        specialVisible: false,
        paymentVisible: false,
        nameVisibleArr: [],
        nameRegArr: [],
        payVisible: false,
        telIconVisible: false,
        emailIconVisible: false,
        email: '',
        tel: '',
        roomNumSlots: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5, 6],
            className: 'slot1',
          }
        ],
        specialReq: [],
        specialReqList: ['立即到店', '原房续住', '安静房间', '吸烟楼层', '连通房间', '相同楼层', '尽量有窗', '尽量无烟楼层', '尽量相邻房间', '尽量高层楼房', '残疾设施房间', '尽量大床房', '尽量双床房'],
        paymentSlots: [
          {
            flex: 1,
            values: ['单结'],
            className: 'slot1',
          }
        ],
        nameArr: [
          {
            l: '',
            f: ''
          },
          {
            l: '',
            f: ''
          },
          {
            l: '',
            f: ''
          },
        ],
        nameRank: [],
        country: 70007,
        confirmVisible: false,
        nationalityVisible: false
      }
    },
    
    props: {},
    
    components: {
      OperationBtn,
      confirmInfo,
      nationality
    },
    
    computed: {
      maxPersonNum(){
        return this.$store.state.maxPersonNum;
      },
    },
    
    created(){
      //入住人显示与否、验证规则
      let maxPersonNum = this.$store.state.maxPersonNum;
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
      
      //错误提示
      const dictionary = {
        en: {
          messages:{
            required: () => '该项为必填项',
            tel: ()=> '手机号格式错误',
            email: ()=> '邮箱格式错误'
          }
        },
        ar: {
          messages: {
            required: () => '该项为必填项',
            tel: ()=> '手机号格式错误',
            email: ()=> '邮箱格式错误'
          }
        }
      };
      this.$validator.localize(dictionary);
    },
  
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    
    methods: {
      handleScroll () {
        if(window.scrollY >= 20){
          this.payVisible = true;
        }else{
          this.payVisible = false;
        }
      },
      openRoomNum() {
        this.roomNumVisible = true;
      },
      openSpecial(){
        this.specialVisible = true;
      },
      onValuesChange(){
      
      },
      confirmRoomNum(){
      
      },
      clearSpecial() {
        this.specialReq = [];
      },
      confirmSpecial() {
        this.specialVisible = false;
      },
      openPayment(){
        this.paymentVisible = true;
      },
      confirmPayment(){
      
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
            break;
          }
  
        }
      },
      hideName(index){
        this.$set(this.nameVisibleArr, index, false);
        this.$set(this.nameArr, index, {l: '', f: '', n: ''});
      },
      onSubmit(){
        this.$validator.validateAll().then((result) => {
          this.telIconVisible = true;
          this.emailIconVisible = true;
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
              totalPay: 'RMB417.90元',
            };
            
            this.confirmVisible = true;
          }else{
            if (!this.tel){
              MessageBox('提示', '请输入手机号');
            }else if (!this.email){
              MessageBox('提示', '请输入邮箱');
            }else{
              //判断入住人
              for (let i = 0; i < 3; i++) {
                if (i === 0 || i%3 === 0){
                  //主入住人
                  if (!(this.nameArr[i].l && this.nameArr[i].f && this.nameArr[i].n)){
                    MessageBox('提示', '主入住人的姓、名和国籍均为必填');
                    break;
                  }
                }else{
                  //附加入住人
                  if (this.nameVisibleArr[i]){
                    if (this.nameArr[i].l || this.nameArr[i].f || this.nameArr[i].n){
                      if (!(this.nameArr[i].l && this.nameArr[i].f && this.nameArr[i].n)){
                        MessageBox('提示', '附加入住人填了姓、名或国籍其中一个，则另一个也必填');
                        break;
                      }
                    }
                  }
                }
              }
    
              MessageBox('提示', this.errors.first('tel') || this.errors.first('email') || this.errors.first('lastName') || this.errors.first('firstName'));
            }
          }
  
          
        });
      },
      closeConfirmMask(){
        this.confirmVisible = false;
      },
      selectNationality(){
        this.nationalityVisible = true;
      },
      hideNationality(){
        this.nationalityVisible = false;
      }
    }
  }
</script>

<style scoped lang="scss">
	.write-info-box{
		@at-root .per-module{
			background-color: #fff;
			margin-bottom: 0.1rem;
			
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
				}
				
				.per-info-txt{
					display: inline-block;
					flex: 1;
					padding: 0 0.2rem;
				}
				
				.per-info-input{
					width: 2rem;
					padding-left: 0.2rem;
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
					/*box-sizing: border-box;*/
					
					&.nationality{
						width: 0.4rem;
						height: 0.14rem;
						padding-left: 0;
						display: inline-block;
						color: #d8d8dc;
					}
				}
				
				.username-icon{
					padding: 0 0.2rem;
					font-size: 0.24rem;
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
				/*height: 0.3rem;*/
				line-height: 0.3rem;
			}
			
			.rule-txt{
				color: #777a7c;
				/*height: 0.3rem;*/
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
		
		/*
		@at-root .confirmMask{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1999;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0 , 0, .4);
		}
		*/
		
		input{
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
		/*background-image: linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,.8), rgba(255,255,255,0) 70%);*/
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
</style>
