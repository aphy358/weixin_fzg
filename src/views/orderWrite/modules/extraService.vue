<!-- 组件说明 -->
<template>
	<div class="extra-service">
		<h6 class="extra-service-title green"><i class="iconfont icon-pack"></i>杂费</h6>
		<div class="per-service add-breakfast" @click="changeBreakfast">
			<p class="per-service-title">加早信息</p>
			<p class="per-service-ins">儿童早<span class="orange">￥60/份</span>成人早<span class="orange">￥80/份</span><i class="iconfont per-service-icon icon-right-thin"></i></p>
		</div>
		<div class="per-service-open clearfix" :style="'height:' + breakfastHeight">
			<!--<span class="per-service-date" v-html="breakfastValue || '起止日期'" @click="showDate(0)"></span>-->
			<label>
				<select class="per-service-date" v-model="breakfastValue">
					<option v-for="(item, index) in dateList" :key="index" :value="item">{{item}}</option>
				</select>
			</label>
			<label>
				<select v-model="breakfastType">
					<option v-for="(item,index) in breakfastTypeList" :key="index" :value="item.type" :price="item.price">{{item.name}}</option>
				</select>
			</label>
			<input class="add-num" type="number" v-model="breakfastNum" placeholder="份数">
			<button class="add-service-icon" @click="addExtrafee(0)">添加</button>
		</div>
		<div class="per-service" @click="changeBed">
			<p class="per-service-title">加床信息</p>
			<p class="per-service-ins">儿童床<span class="orange">50/张</span>成人床<span class="orange">￥101/张</span></p>
			<p class="green">该房型每间房最多加床2张<i class="iconfont per-service-icon icon-right-thin" style="color: #666;"></i></p>
		</div>
		<div class="per-service-open clearfix" :style="'height:' + bedHeight">
			<!--<span class="per-service-date" v-html="bedValue || '起止日期'" @click="showDate(1)"></span>-->
			<label>
				<select class="per-service-date" v-model="bedValue">
					<option v-for="(item, index) in dateList" :key="index" :value="item">{{item}}</option>
				</select>
			</label>
			<label>
				<select v-model="bedType">
					<option v-for="(item,index) in bedTypeList" :key="index" :value="item.type" :price="item.price">{{item.name}}</option>
				</select>
			</label>
			<input class="add-num" type="number" v-model="bedNum" placeholder="份数">
			<button class="add-service-icon" @click="addExtrafee(1)">添加</button>
		</div>
		<div class="per-service" @click="changeNetwork">
			<p class="per-service-title">加宽带信息</p>
			<p class="per-service-ins" style="padding-bottom: 0.1rem;"><span class="orange">￥{{networkPrice}}/间/日</span><i class="iconfont per-service-icon icon-right-thin"></i></p>
		</div>
		<div class="per-service-open clearfix" :style="'height:' + netWorkHeight">
			<!--<span class="per-service-date" v-html="networkValue || '起止日期'" @click="showDate(2)"></span>-->
			<label>
				<select class="per-service-date" v-model="networkValue">
					<option v-for="(item, index) in dateList" :key="index" :value="item">{{item}}</option>
				</select>
			</label>
			<input class="add-num" type="number" v-model="networkNum" placeholder="份数">
			<button class="add-service-icon" @click="addExtrafee(2)">添加</button>
		</div>
		
		<!--<StartEndDatePopup v-show="dateVisible" :minDate="startDate" :maxDate="endDate" @goback="closeDate" @confirm="confirmDate"/>-->
		
		<!--<mt-datetime-picker v-model="dateVisible" type="date" year-format="{value}" month-format="{value}" date-format="{value}" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>-->
		
		
	</div>
</template>

<script>
	import StartEndDatePopup from '@/components/StartEndDatePopup';
	import { addDays } from '@/assets/util';
	
  export default {
    name: 'extraService',
    
    data() {
      return {
        breakfastHeight: 0,
        bedHeight: 0,
        netWorkHeight: 0,
//        dateVisible: false,
        dateIndex: 0,//所有杂费都共用一个日期选择弹出层，使用一个外层变量来指示当前操作的是哪个杂费项的日期
        startDate: this.$store.state.checkin,
        endDate: this.$store.state.checkout,
        breakfastValue: String(this.$store.state.checkin),
        bedValue: this.$store.state.checkin,
        networkValue: this.$store.state.checkin,
        breakfastType: '',
        bedType: '',
        extrafeeParams: {
//          startDate: this.$store.state.checkin,
          startDate: '2018-12-14',
//          endDate: this.$store.state.checkout,
          endDate: '2018-12-17',
          infoId: 171840,
          suppId: 40160,
          roomtypeId: 29,
          roomNum: this.$store.state.roomNum
        },
        breakfastPriceObj: {},
        bedPriceObj: {},
        networkPriceObj: {},
        breakfastNum: 1,
        bedNum: 1,
        networkNum: 1,
      }
    },
    
    props: {},
    
    components: {
      StartEndDatePopup
    },
    
    computed: {
      dateList(){
        let arr = [addDays(this.startDate)];
        add(this.startDate, this.endDate);
        function add(startDate, endDate) {
          if (addDays(startDate, 1) < addDays(endDate)){
            arr.push(addDays(startDate, 1));
            add(addDays(startDate, 1), endDate);
          }
        }
        
        return arr;
      },
      
      breakfastTypeList(){
        let params = this.extrafeeParams;
        params.typeId = 1;
        let obj = {};
        this.$api.orderWrite.syncSurchargeRoom(params).then(res => {
          if(res.returnCode === 1 && res.data.length > 0){

            for (let i = 0; i < res.data.length; i++) {
              let outer = res.data[i];
              let arr = [];
              let key = '';
              for (let j = 0; j < outer.length; j++) {
                let inner = outer[j];
                key = inner.date.split(' ')[0];
                arr.push({
                  name: inner.name,
                  type: inner.type,
                  price: inner.price
                })
              }
              obj[key] = arr;
            }
            this.breakfastType = obj[this.breakfastValue][0].type;
            Object.assign(this.breakfastPriceObj, obj);
            return obj[this.breakfastValue];
          }
        });
      },
  
      bedTypeList(){
        let params = this.extrafeeParams;
        params.typeId = 2;
        let obj = {};
        this.$api.orderWrite.syncSurchargeRoom(params).then(res => {
          if(res.returnCode === 1 && res.data.length > 0){
      
            for (let i = 0; i < res.data.length; i++) {
              let outer = res.data[i];
              let arr = [];
              let key = '';
              for (let j = 0; j < outer.length; j++) {
                let inner = outer[j];
                key = inner.date.split(' ')[0];
                arr.push({
                  name: inner.name,
                  type: inner.type,
                  price: inner.price
                })
              }
              obj[key] = arr;
            }
  
            this.bedType = obj[this.bedValue][0].name;
            Object.assign(this.bedPriceObj, obj);
            return obj[this.bedValue];
          }
        });
      },
  
      networkPrice(){
        let params = this.extrafeeParams;
        params.typeId = 3;
        let obj = {};
        this.$api.orderWrite.syncSurchargeRoom(params).then(res => {
          if(res.returnCode === 1 && res.data.length > 0){
      
            for (let i = 0; i < res.data.length; i++) {
              let outer = res.data[i];
              let arr = [];
              let key = '';
              for (let j = 0; j < outer.length; j++) {
                let inner = outer[j];
                key = inner.date.split(' ')[0];
                arr.push({
                  name: inner.name,
                  type: inner.type,
                  price: inner.price
                })
              }
              obj[key] = arr;
            }
  
            Object.assign(this.networkPriceObj, obj);
            return obj[this.networkValue][0].price;
          }
        });
      }
    },
    
    created(){},
    
    methods: {
      changeBreakfast(){
        this.breakfastHeight = this.breakfastHeight === 0 ? '0.8rem' : 0;
      },
      changeBed(){
        this.bedHeight = this.bedHeight === 0 ? '0.8rem' : 0;
      },
      changeNetwork(){
        this.netWorkHeight = this.netWorkHeight === 0 ? '0.8rem' : 0;
      },
      showDate(index){
        this.dateVisible = true;
        this.dateIndex = index;
      },
      closeDate(){
        this.dateVisible = false;
      },
      confirmDate($event){
        switch (this.dateIndex){
          case 0:
            //加早
            this.breakfastValue = $event.startDate + '至' + $event.endDate;
            break;
          case 1:
            //加早
            this.bedValue = $event.startDate + '至' + $event.endDate;
            break;
          case 2:
            //加早
            this.networkValue = $event.startDate + '至' + $event.endDate;
            break;
        }
        
        let _this = this;
        setTimeout(function () {
          _this.dateVisible = false;
        }, 300);
      },
      addExtrafee(type){
        //必填校验及格式校验
        switch (type){
          case 0:
            //加早
            this.checkAddList(this.breakfastNum, '加早', function () {
            
            });
	        
	        break;
          case 1:
            //加床
            this.checkAddList(this.bedNum, '加早', function () {
    
            });
            
            break;
          case 2:
            //加床
            this.checkAddList(this.networkNum, '加早', function () {
    
            });
    
            break;
        }
      },
      checkAddList(num, msg, fn){
        if (num){
          if (typeof num === 'number' && isNaN(num) && num > 0){
            //通过校验
            fn && fn();
          }else{
            Toast(msg + '份数必须为正整数');
          }
        }else{
          Toast('请输入' + msg + '份数');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.extra-service{
		background-color: #fff;
		
		.extra-service-title{
			height: 0.5rem;
			line-height: 0.5rem;
			padding: 0 0.3rem;
			font-size: 0.14rem;
			font-weight: normal;
			background-image: linear-gradient(to bottom,rgb(250,246,240),rgb(255,255,255));
		}
		
		@at-root .per-service{
			margin: 0 0.1rem;
			padding: 0 0.2rem 0.2rem;
			/*border-bottom: 0.5px solid #eeeeee;*/
			font-size: 0.12rem;
			
			&.add-breakfast{
				border-top: 0.5px solid #eeeeee;
			}
			
			>p{
				line-height: 0.24rem;
				
				>span{
					margin-right: 0.1rem;
				}
			}
			
			.per-service-title{
				color: #ff4400;
				border-left: 2px solid #ff4400;
				height: 0.12rem;
				line-height: 0.12rem;
				margin: 0.2rem 0 0.04rem 0;
				padding-left: 0.06rem;
			}
			
			.per-service-icon{
				font-size: 0.12rem;
				float: right;
				color: #666666;
			}
		}
		
		@at-root .per-service-open{
			background-color: #f4f4f9;
			/*padding: 0.2rem 0 0.3rem 0.3rem;*/
			/*padding: 0.2rem 0.3rem;*/
			padding: 0 0 0 0.3rem;
			/*border-bottom: 0.5px solid #e9e9eb;*/
			line-height: 0.3rem;
			font-size: 0.12rem;
			overflow: hidden;
			transition: all .5s;
			
			>input,select,>span{
				width: 0.6rem;
				height: 0.3rem;
				line-height: 0.3rem;
				margin: 0.2rem 0.1rem 0.3rem 0;
				/*margin-right: 0.06rem;*/
				padding-left: 0.05rem;
				border: none;
				border-radius: 0;
				float: left;
				background-color: #fff;
				color: #555555;
			}
			
			.per-service-date{
				width: 0.8rem;
			}
			
			.add-num{
				width: 0.4rem;
			}
			
			.add-service-icon{
				float: left;
				vertical-align: middle;
				width: 0.5rem;
				height: 0.3rem;
				line-height: 0.3rem;
				background-color: #ff4400;
				color: #ffffff;
				border-radius: 0;
				border: none;
				margin-top: 0.2rem;
			}
		}
		
		
		
		.green{
			color: #0bc16f;
		}
	}
</style>