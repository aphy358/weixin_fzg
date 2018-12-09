<!-- 组件说明 -->
<template>
	<div class="page order-write-box">
		
		<!-- 头部 -->
		<mt-header title="订单填写">
		</mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<hotelInfo/>
		
		<writeInfo/>
	</div>

</template>

<script>
  import hotelInfo from './modules/hotelInfo.vue';
//  import GAP from '@/components/GAP.vue';
  import writeInfo from './modules/writeInfo.vue';
  import GoBack from '@/components/GoBack.vue';
	
  export default {
    name: '',
    
    data() {
      return {
        scrollTop: 0,
        validate: false
      }
    },
    
    props: {},
    
    components: {
//      GAP,
      hotelInfo,
      writeInfo,
      GoBack
    },
    
    computed: {},
    
    methods: {
      onSubmit () {
        this.validate = true;
      }
    }
  }
</script>

<style scoped lang="scss">
	.order-write-box{
		background-color: #efeff4;
	}
	
	
</style>

<style lang="scss">
	.fl{
		float: left;
	}
	
	.fr{
		float: right;
	}
	
	.orange{
		color: #ff7625;
	}
	
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