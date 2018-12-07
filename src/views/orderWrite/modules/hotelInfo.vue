<!-- 组件说明 -->
<template>
	<div class="hotel-info">
		<div class="hotel-name">桂林香格里拉大酒店</div>
		<div class="additional-info">
			<p>
				入住
				<span class="stare-black">12月4日(今天)</span>
				离店
				<span class="stare-black">12月5日(明天)</span>
				<span class="stare-black">共1晚</span>
			</p>
			<p>
				豪华大床房
				<span class="breakfast-type">不含早</span>
			</p>
		</div>
	</div>
</template>

<script>
	
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.hotel-info{
		margin: 0.1rem 0.1rem;
		background-color: #fff;
		padding: 0 0.2rem;
		font-size: 0.14rem;
		position: relative;
	}
	
	.hotel-info:before, .hotel-info:after{
		content: '';
		position: absolute;
		width: 0.12rem;
		height: 0.12rem;
		background-color: #efeff4;
		border-radius: 50%;
	}
	
	.hotel-info:before{
		left: -0.06rem;
		top: 0.44rem;
	}
	
	.hotel-info:after{
		right: -0.06rem;
		top: 0.44rem;
	}
	
	.hotel-name{
		height: 0.5rem;
		line-height: 0.5rem;
		color: #050505;
		border-bottom: 0.01rem dashed #e3e3e3;
		font-size: 14px;
	}
	
	.additional-info p{
		height: 0.4rem;
		line-height: 0.4rem;
		color: #a5a5a6;
	}
	
	.stare-black{
		color: #050505;
		margin: 0 0.05rem;
	}
	
	.breakfast-type{
		margin-left: 0.1rem;
	}
</style>