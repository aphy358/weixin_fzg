<!-- 组件说明 -->
<template>
	<div class="extra-service" v-if="breakfastVisible || bedVisible || netVisible">
		<h6 class="extra-service-title purple"><i class="iconfont icon-pack"></i>杂费</h6>
		<div class="per-service-box" v-if="breakfastVisible">
			<div class="per-service add-breakfast" @click="changeBreakfast">
				<p class="per-service-title">加早信息</p>
				<p class="per-service-ins">
					<span v-for="(item, index) in breakfastTypeList">
						{{item.name}}<span class="orange">￥{{item.price}}/份</span>
					</span>
					<i class="iconfont per-service-icon icon-right-thin"></i>
				</p>
			</div>
			<div class="per-service-open clearfix" :style="'height:' + breakfastHeight + 'rem;'">
				<div class="condition-box">
					<label>
						<select class="per-service-date" v-model="dateValue1" @change="changeDate(0)">
							<option v-for="(item, index) in dateList" :key="'_1date' + index" :value="item">{{item}}</option>
						</select>
					</label>
					<label>
						<select v-model="breakfastType">
							<option v-for="(item, index) in breakfastTypeList" :key="'_1type' + index" :value="item.type" :price="item.price">{{item.name}}</option>
						</select>
					</label>
					<input class="add-num" type="number" v-model="breakfastNum" placeholder="份数">
					<button class="add-service-icon" @click="addExtrafee(0)">添加</button>
				</div>
				
				<ul class="add-service-list">
					<li v-for="(item, index) in addBreakfastList" :key="'_1add' + index">
						<span class="green">{{item.date}}</span><span class="orange">{{item.name}}</span><span>{{item.num}}份</span><span class="deep-orange">￥{{item.price * item.num}}</span><i class="iconfont icon-delete2" @click="delExtrafee(0, index)"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="per-service-box" v-if="bedVisible">
			<div class="per-service" @click="changeBed">
				<p class="per-service-title">加床信息</p>
				<p class="per-service-ins">
					<span v-for="(item, index) in bedTypeList">
						{{item.name}}<span class="orange">￥{{item.price}}/张</span>
					</span>
				</p>
				<p class="purple">该房型每间房最多加床{{bedTypeList[0].max}}张<i class="iconfont per-service-icon icon-right-thin" style="color: #666;"></i></p>
			</div>
			<div class="per-service-open clearfix" :style="'height:' + bedHeight + 'rem;'">
				<div class="condition-box">
					<label>
						<select class="per-service-date" v-model="dateValue2" @change="changeDate(1)">
							<option v-for="(item, index) in dateList" :key="'_2date' + index" :value="item">{{item}}</option>
						</select>
					</label>
					<label>
						<select v-model="bedType">
							<option v-for="(item, index) in bedTypeList" :key="'_2type' + index" :value="item.type" :price="item.price">{{item.name}}</option>
						</select>
					</label>
					<input class="add-num" type="number" v-model="bedNum" placeholder="份数">
					<button class="add-service-icon" @click="addExtrafee(1)">添加</button>
				</div>
				
				<ul class="add-service-list">
					<li v-for="(item, index) in addBedList" :key="'_2add' + index">
						<span class="green">{{item.date}}</span><span class="orange">{{item.name}}</span><span>{{item.num}}份</span><span class="deep-orange">￥{{item.price * item.num}}</span><i class="iconfont icon-delete2" @click="delExtrafee(1, index)"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="per-service-box" v-if="netVisible">
			<div class="per-service" @click="changeNetwork">
				<p class="per-service-title">加宽带信息</p>
				<p class="per-service-ins" style="padding-bottom: 0.1rem;"><span class="orange">￥{{networkPriceList[0].price}}/间/日</span><i class="iconfont per-service-icon icon-right-thin"></i></p>
			</div>
			<div class="per-service-open clearfix" :style="'height:' + networkHeight + 'rem;'">
				<div class="condition-box">
					<label>
						<select class="per-service-date" v-model="dateValue3" @change="changeDate(2)">
							<option v-for="(item, index) in dateList" :key="'_3date' + index" :value="item">{{item}}</option>
						</select>
					</label>
					<input class="add-num" type="number" v-model="networkNum" placeholder="份数">
					<button class="add-service-icon" @click="addExtrafee(2)">添加</button>
				</div>
				
				<ul class="add-service-list">
					<li v-for="(item, index) in addNetworkList" :key="'_3add' + index">
						<span class="green">{{item.date}}</span><span class="orange">{{item.name}}</span><span>{{item.num}}份</span><span class="deep-orange">￥{{item.price * item.num}}</span><i class="iconfont icon-delete2" @click="delExtrafee(2, index)"></i>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
	import StartEndDatePopup from '@/components/StartEndDatePopup';
	import { addDays, queryString } from '@/assets/util';
	import { Toast } from 'mint-ui';
	
  export default {
    name: 'extraService',
    
    data() {
      return {
        breakfastHeight: 0,
        bedHeight: 0,
        networkHeight: 0,
        dateIndex: 0,//所有杂费都共用一个日期选择弹出层，使用一个外层变量来指示当前操作的是哪个杂费项的日期
        startDate: this.$store.state.checkin,
        endDate: this.$store.state.checkout,
        dateValue1: this.$store.state.checkin,
        dateValue2: this.$store.state.checkin,
        dateValue3: this.$store.state.checkin,
        breakfastType: '',
        bedType: '',
        extrafeeParams: {
          startDate: this.$store.state.checkin,
          endDate: this.$store.state.checkout,
          infoId: queryString('staticInfoId'),
          suppId: queryString('supplierId'),
          roomtypeId: queryString('roomId'),
          roomNum: this.$store.state.roomNum
        },
        breakfastPriceObj: {},
        bedPriceObj: {},
        networkPriceObj: {},
        breakfastNum: 1,
        bedNum: 1,
        networkNum: 1,
        breakfastTypeList: [],
        bedTypeList: [],
        networkPriceList: [],
        addBreakfastList: [],
        addBedList: [],
        addNetworkList: [],
        surchargeBref: [],
        surchargeBed: [],
        surchargeInternet: [],
        addBedNumObj: {},
        addNetNumObj: {},
        breakfastVisible: false,
        bedVisible: false,
        netVisible: false,
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
      roomNum(){
        return this.$store.state.orderWrite.roomNum;
      }
    },
    
    created(){
      let params = this.extrafeeParams;
      let _this = this;
      
      //加早
      params.typeId = 1;
      let obj1 = {};
      this.$api.orderWrite.syncSurchargeRoom(params).then(res => {
        if(res.returnCode === 1 && res.data.length > 0){
          _this.breakfastVisible = true;
      
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
            obj1[key] = arr;
          }
          _this.breakfastType = obj1[_this.dateValue1][0].type;
          Object.assign(_this.breakfastPriceObj, obj1);
          Object.assign(_this.breakfastTypeList, obj1[_this.dateValue1]);
        }
      });
      
      //加床
      params.typeId = 2;
      let obj2 = {};
      this.$api.orderWrite.syncSurchargeRoom(params).then(res => {
        if(res.returnCode === 1 && res.data.length > 0){
          _this.bedVisible = true;
      
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
                price: inner.price,
                max: inner.max
              })
            }
            obj2[key] = arr;
          }
          
          _this.bedType = obj2[_this.dateValue2][0].type;
          Object.assign(_this.bedPriceObj, obj2);
          Object.assign(_this.bedTypeList, obj2[_this.dateValue2]);
        }
      });
      
      //加宽带
      params.typeId = 3;
      let obj3 = {};
      this.$api.orderWrite.syncSurchargeRoom(params).then(res => {
        if(res.returnCode === 1 && res.data.length > 0){
          _this.netVisible = true;
      
          for (let i = 0; i < res.data.length; i++) {
            let outer = res.data[i];
            let arr = [];
            let key = '';
            for (let j = 0; j < outer.length; j++) {
              let inner = outer[j];
              key = inner.date.split(' ')[0];
              arr.push({
                name: '宽带',
                type: inner.type,
                price: inner.price
              })
            }
            obj3[key] = arr;
          }
      
          Object.assign(this.networkPriceObj, obj3);
          Object.assign(this.networkPriceList, obj3[_this.dateValue3]);
        }
      });
    },
    
    methods: {
      changeBreakfast(){
        this.breakfastHeight = this.breakfastHeight === 0 ? 0.8 + (0.4*this.addBreakfastList.length) : 0;
      },
      changeBed(){
        this.bedHeight = this.bedHeight === 0 ? 0.8 + (0.4*this.addBedList.length) : 0;
      },
      changeNetwork(){
        this.networkHeight = this.networkHeight === 0 ? 0.8 + (0.4*this.addNetworkList.length) : 0;
      },
      addExtrafee(type){
        //必填校验及格式校验
        switch (type){
          case 0:
            //加早
            this.checkAddList(this.breakfastNum, '加早', 0);
	        break;
          case 1:
            //加床
            this.checkAddList(this.bedNum, '加早', 1);
            break;
          case 2:
            //加床
            this.checkAddList(this.networkNum, '加宽带', 2);
            break;
            
          default:
            break;
        }
      },
      checkAddList(num, msg, type){
        if (num){
          if (/^[0-9]+$/.test(num)){
            //通过校验
            let list,selectType,addList,num,date,addType,price,name,height,storeIndex;
            if (type === 0){
              list = this.breakfastTypeList; //类型列表，比如“儿童早、成人早”等
              selectType = this.breakfastType; //要添加的杂费的类型，比如儿童早
              addList = 'addBreakfastList'; //存放单种杂费下的所有已添加杂费，比如加早项下的所有已添加杂费
              num = +this.breakfastNum; //添加的份数
              date = this.dateValue1; //添加的日期
              storeIndex = 'surchargeBref'; //需要改变的store中的值
            }else if (type === 1){
              list = this.bedTypeList; //类型列表，比如“儿童床、成人床”等
              selectType = this.bedType; //要添加的杂费的类型，比如儿童床
              addList = 'addBedList'; //存放单种杂费下的所有已添加杂费，比如加床项下的所有已添加杂费
              num = +this.bedNum; //添加的份数
              date = this.dateValue2; //添加的日期
              storeIndex = 'surchargeBed'; //需要改变的store中的值
              
              //判断是否已达最大加床数
              let max = 0;
              for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (item.type === selectType){
                  max = item.max
                }
              }
              let maxAddNum = max * this.roomNum;
              let oldNum = this.addBedNumObj[date] ? this.addBedNumObj[date] : 0;
              if (oldNum + num > maxAddNum){
                Toast(date + '最大加床数为' + maxAddNum + '张');
                return;
              }else{
                //存储每日已加的份数
                this.$set(this.addBedNumObj, date, num + (oldNum || 0));
              }
              
            }else if (type === 2){
              list = this.networkPriceList;
              addList = 'addNetworkList'; //存放单种杂费下的所有已添加杂费，比如加宽带项下的所有已添加杂费
              selectType = '-1';
              num = +this.networkNum; //添加的份数
              date = this.dateValue3; //添加的日期
              storeIndex = 'surchargeInternet'; //需要改变的store中的值
  
              //判断是否已达最大加宽带数
              let maxAddNum = this.roomNum;//冯寒确定使用房间数作为最大加宽带数
              let oldNum = this.addNetNumObj[date] ? this.addNetNumObj[date] : 0;
              if (oldNum + num > maxAddNum){
                Toast(date + '最大加宽带数为' + maxAddNum + '份');
                return;
              }else{
                //存储每日已加的份数
                this.$set(this.addNetNumObj, date, num + (oldNum || 0));
              }
            }
            
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              if (item.type === selectType){
                price = item.price;
                name = item.name;
                addType = item.type;
              }
            }
  
            if (!name){
              Toast(date + '没有可添加的' + msg + '类型');
              return;
            }
            
            this.$set(this[addList], this[addList].length, {
              date: date,
              num: num,
              name: name,
              price: price
            });
  
            this.$set(this[storeIndex], this[storeIndex].length, {
              date: date,
              count: String(num),
              type: addType,
              name: name
            });
  
            this.$store.commit('orderWrite/setCommonState', {
              k : addList,
              v : this[addList]
            });
  
            this.$store.commit('orderWrite/setCommonState', {
              k : storeIndex,
              v : this[storeIndex]
            });
          }else{
            Toast(msg + '份数必须为正整数');
          }
        }else{
          Toast('请输入' + msg + '份数(正整数)');
        }
      },
      delExtrafee(type, index){
        let addList,storeIndex;
        if (type === 0){
          //加早
          addList = 'addBreakfastList';
          storeIndex = 'surchargeBref';
          this.addBreakfastList.length === 1 ? this.addBreakfastList = [] : this.addBreakfastList.splice(index, 1);
          this.surchargeBref.length === 1 ? this.surchargeBref = [] : this.surchargeBref.splice(index, 1);
        }else if (type === 1){
          //加床
          addList = 'addBedList';
          storeIndex = 'surchargeBed';
          let num = this.addBedList[index].num;
          let date = this.addBedList[index].date;
          this.addBedList.length === 1 ? this.addBedList = [] : this.addBedList.splice(index, 1);
          this.surchargeBed.length === 1 ? this.surchargeBed = [] : this.surchargeBed.splice(index, 1);
          
          //更改对应日期内的总加床数
          this.$set(this.addBedNumObj, date, this.addBedNumObj[date] - num);
        }else if (type === 2){
          //加宽带
          addList = 'addNetworkList';
          storeIndex = 'surchargeInternet';
          let num = this.addNetworkList[index].num;
          let date = this.addNetworkList[index].date;
          this.addNetworkList.length === 1 ? this.addNetworkList = [] : this.addNetworkList.splice(index, 1);
          this.surchargeInternet.length === 1 ? this.surchargeInternet = [] : this.surchargeInternet.splice(index, 1);
  
          //更改对应日期内的总加宽带数
          this.$set(this.addNetNumObj, date, this.addNetNumObj[date] - num);
        }
  
        this.$store.commit('orderWrite/setCommonState', {
          k : addList,
          v : this[addList]
        });
  
        this.$store.commit('orderWrite/setCommonState', {
          k : storeIndex,
          v : this[storeIndex]
        });
        
        return false;
      },
      changeDate(type){
        switch (type){
          case 0:
            //加早
            this.breakfastTypeList.length = 0;
            let arr1 = this.breakfastPriceObj[this.dateValue1];
            this.breakfastType = arr1 ? arr1[0].type : '';
            Object.assign(this.breakfastTypeList, arr1);
	        break;
          case 1:
            //加床
            this.bedTypeList.length = 0;
            let arr2 = this.bedPriceObj[this.dateValue2];
            this.bedType = arr2 ? arr2[0].type : '';
            Object.assign(this.bedTypeList, arr2);
            break;
          case 2:
            //加宽带
            this.networkPriceList.length = 0;
            Object.assign(this.networkPriceList, this.networkPriceObj[this.dateValue3]);
            break;
          default:
            break;
        }
      }
    },
    
    watch: {
      roomNum(){
        this.addBedNumObj = [];
        this.addNetNumObj = [];
        
        let arr = ['addBreakfastList','addBedList','addNetworkList','surchargeBref','surchargeBed','surchargeInternet'];
        
        for (let i = 0; i < arr.length; i++) {
          let str = arr[i];
          this[str] = [];
          this.$store.commit('orderWrite/setCommonState', {
            k : str,
            v : []
          });
        }
      },
      addBreakfastList(){
        this.breakfastHeight = this.breakfastHeight >= 0.8 ? 0.8 + (0.4*this.addBreakfastList.length) : 0;
      },
      addBedList(){
        this.bedHeight = this.bedHeight >= 0.8 ? 0.8 + (0.4*this.addBedList.length) : 0;
      },
      addNetworkList(){
        this.networkHeight = this.networkHeight >= 0.8 ? 0.8 + (0.4*this.addNetworkList.length) : 0;
      }
    }
  }
</script>

<style scoped lang="scss">
	.extra-service{
		background-color: #fff;
		margin-bottom: 0.1rem;
		
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
			padding: 0 0 0 0.3rem;
			line-height: 0.3rem;
			font-size: 0.12rem;
			overflow: hidden;
			transition: all .5s;
			
			@at-root .condition-box{
				height: 0.6rem;
				
				>input,select,>span{
					width: 0.6rem;
					height: 0.3rem;
					line-height: 0.3rem;
					margin: 0.2rem 0.1rem 0 0;
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
			
			
			@at-root .add-service-list{
				>li{
					display: block;
					width: 3rem;
					height: 0.3rem;
					line-height: 0.3rem;
					padding-left: 0.05rem;
					background: #ffffff;
					border: 0.5px solid #eeeeee;
					margin-bottom: 0.1rem;
					
					>span{
						display: inline-block;
						margin-right: 0.2rem;
					}
					
					>.iconfont{
						float: right;
						margin-right: 0.1rem;
					}
				}
			}
		}
		
		.green{
			color: #0bc16f;
		}
		
		.purple{
			color: #666fb1;
		}
	}
</style>