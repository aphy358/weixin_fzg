<!-- 组件说明 -->
<template>
	<div class="extra-service">
		<h6 class="extra-service-title green"><i class="iconfont icon-pack"></i>杂费</h6>
		<div class="per-service add-breakfast" @click="changeBreakfast">
			<p class="per-service-title">加早信息</p>
			<p class="per-service-ins">儿童早<span class="orange">￥60/份</span>成人早<span class="orange">￥80/份</span><i class="iconfont per-service-icon icon-right-thin"></i></p>
		</div>
		<div class="per-service-open clearfix" :style="'height:' + breakfastHeight">
			<input class="per-service-date" type="text" placeholder="2018-12-11至2018-12-13" @focus="showBreakfastDate">
			<mt-datetime-picker v-model="breakfastDateVisible" :startDate="startDate" :endDate="endDate" ref="breakfastDatePicker" type="date">
			</mt-datetime-picker>
			<input type="text" placeholder="加早类型">
			<input class="add-num" type="text" placeholder="份数">
			<button class="add-service-icon">添加</button>
		</div>
		<div class="per-service" @click="changeBed">
			<p class="per-service-title">加床信息</p>
			<p class="per-service-ins">儿童床<span class="orange">50/张</span>成人床<span class="orange">￥101/张</span></p>
			<p class="green">该房型每间房最多加床2张<i class="iconfont per-service-icon icon-right-thin" style="color: #666;"></i></p>
		</div>
		<div class="per-service-open clearfix" :style="'height:' + bedHeight">
			<input class="per-service-date" type="text" placeholder="2018-12-11至2018-12-13">
			<input type="text" placeholder="加床类型">
			<input class="add-num" type="text" placeholder="份数">
			<button class="add-service-icon">添加</button>
		</div>
		<div class="per-service" @click="changeNetwork">
			<p class="per-service-title">加宽带信息</p>
			<p class="per-service-ins" style="padding-bottom: 0.1rem;"><span class="orange">￥40/间/日</span><i class="iconfont per-service-icon icon-right-thin"></i></p>
		</div>
		<div class="per-service-open clearfix" :style="'height:' + netWorkHeight">
			<input class="per-service-date" type="text" placeholder="2018-12-11至2018-12-13">
			<input class="add-num" type="text" placeholder="份数">
			<button class="add-service-icon">添加</button>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'extraService',
    
    data() {
      return {
//        breakfastVisible: false,
//        bedVisible: false,
//        networkVisible: false,
        breakfastHeight: 0,
        bedHeight: 0,
        netWorkHeight: 0,
        breakfastDateVisible: false,
        startDate: new Date(this.$store.state.checkin),
        endDate: new Date(this.$store.state.checkout),
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      changeBreakfast(){
//        this.breakfastVisible = !this.breakfastVisible;
        this.breakfastHeight = this.breakfastHeight === 0 ? '0.8rem' : 0;
      },
      changeBed(){
//        this.bedVisible = !this.bedVisible;
        this.bedHeight = this.bedHeight === 0 ? '0.8rem' : 0;
      },
      changeNetwork(){
//        this.networkVisible = !this.networkVisible;
        this.netWorkHeight = this.netWorkHeight === 0 ? '0.8rem' : 0;
      },
      showBreakfastDate(){
        this.$refs.breakfastDatePicker.open();
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
			
			>input{
				width: 0.6rem;
				height: 0.3rem;
				line-height: 0.3rem;
				margin: 0.2rem 0.06rem 0.3rem 0;
				/*margin-right: 0.06rem;*/
				padding-left: 0.05rem;
				border: none;
				border-radius: 0;
				float: left;
			}
			
			.per-service-date{
				width: 1.5rem;
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