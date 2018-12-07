<!-- 组件说明 -->
<template>
	<div class="write-info-box">
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title">房间数</span>
				<span class="per-info-txt" @click="openRoomNum">1</span>
				<mt-popup
						v-model="roomNumVisible"
						position="bottom">
					<button class="confirm" @click="confirmRoomNum">确定</button>
					<mt-picker :slots="roomNumSlots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div>
			<div class="per-line">
				<span class="per-info-title">个性化需求</span>
				<span class="per-info-txt" @click="openSpecial">添加个性化需求</span>
				<mt-popup
						v-model="specialVisible"
						position="bottom">
					<OperationBtn @clear="clearSpecial" @confirm="confirmSpecial"/>
					<mt-checklist
							v-model="specialReq"
							:options="specialReqList">
					</mt-checklist>
				</mt-popup>
			</div>
			<div class="per-line">
				<span class="per-info-title">手机号</span>
				<input type="tel" class="per-info-input" placeholder="用于接收通知"/>
			</div>
			<div class="per-line">
				<span class="per-info-title">Email</span>
				<input type="email" class="per-info-input" placeholder="用于接收通知"/>
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
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title green"><i class="iconfont icon-yonghu"></i>入住人</span>
			</div>
			<div class="per-line">
				<input type="text" class="username-input last-name" placeholder="姓 Last name"/>/
				<input type="text" class="username-input first-name" placeholder="名 First name"/>
				<i class="iconfont icon-plus2 username-icon" @click="nextVisible"></i>
			</div>
			<div class="per-line" v-if="secondVisible">
				<input type="text" class="username-input last-name" placeholder="姓 Last name"/>/
				<input type="text" class="username-input first-name" placeholder="名 First name"/>
				<i class="iconfont icon-minus2 username-icon" @click="hideSecond"></i>
			</div>
			<div class="per-line" v-if="thirdVisible">
				<input type="text" class="username-input last-name" placeholder="姓 Last name"/>/
				<input type="text" class="username-input first-name" placeholder="名 First name"/>
				<i class="iconfont icon-minus2 username-icon" @click="hideThird"></i>
			</div>
		</div>
		<div class="rules">
			<h6 class="rule-title">取消条款</h6>
			<p class="rule-txt">此房即订即保，一旦预订，不可修改或取消。</p>
			<h6 class="rule-title">入住须知</h6>
			<p class="rule-txt">酒店入住时间最早为14:00，入住最晚时间为24:00。</p>
		</div>
	</div>
</template>

<script>
  import OperationBtn from '@/components/OperationBtn.vue';
  import { MessageBox } from 'mint-ui';
  
  export default {
    name: '',
    
    data() {
      return {
        roomNum: false,
        roomNumVisible: false,
        specialVisible: false,
        paymentVisible: false,
        secondVisible: false,
        thirdVisible: false,
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
        ]
      }
    },
    
    props: {},
    
    components: {
      OperationBtn
    },
    
    computed: {},
    
    methods: {
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
      nextVisible(){
        if (this.secondVisible){
          if (this.thirdVisible){
            MessageBox('提示', '无法继续增加入住人信息');
          }else{
            this.thirdVisible = true;
          }
        }else{
          this.secondVisible = true;
        }
      },
      hideSecond(){
        this.secondVisible = false;
      },
      hideThird(){
        this.thirdVisible = false;
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
					flex: 1;
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
					width: 1.2rem;
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
				height: 0.3rem;
				line-height: 0.3rem;
			}
			
			.rule-txt{
				color: #777a7c;
				height: 0.3rem;
				line-height: 0.3rem;
			}
		}
		
		input{
			border: none;
		}
		
	}
	
	
	.operation-btn {
		
		button {
			border: none;
			width: 50%;
			background: #f0f0f0;
			color: #666666;
			height: 0.4rem;
			font-size: 0.16rem;
			
			&.area-submit {
				color: white;
				background: #099FDE;
			}
		}
	}
	
	.green{
		color: #0bc16f;
	}
</style>

<style lang="scss">
	.mint-checklist{
		margin: 0.4rem 0;
		zoom: 1
	}
	
	.mint-checklist:after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		clear: both;
	}
	
	.mint-checkbox-core{
		width: 0.14rem;
		height: 0.14rem;
		
		&:after{
			top: 0.015rem;
			left: 0.045rem;
			width: 0.03rem;
			height: 0.07rem;
		}
	}
	
	.mint-checkbox-label{
		color: #333333;
		margin-left: 0.03rem;
	}
	.mint-cell-wrapper{
		font-size: 0.15rem;
		background-image: none;
	}
	.mint-cell{
		min-height: 0.35rem;
		display: inline-block;
		width: 50%;
		float: left;
	}
	
	.mint-checkbox-input:checked + .mint-checkbox-core {
		background-color: #ff7625;
		border-color: #ff7625;
	}
	
	.mint-cell:last-child{
		background-image: none;
	}
</style>