<!-- 组件说明 -->
<template>
	<div class="page order-write-box">
		
		<!-- 头部 -->
		<mt-header title="订单填写">
		</mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<hotelInfo/>
		
		<writeInfo/>
		
		<div class="total-pay clearfix" :class="payVisible ? 'show-animate' : 'hide-animated'">
			<span class="fl orange">订单总额：￥</span>
			<span class="fl orange total-money">843.15</span>
			<button class="fr next-step">下一步</button>
		</div>
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
        payVisible: false
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
      }
    }
  }
</script>

<style scoped lang="scss">
	.order-write-box{
		background-color: #efeff4;
	}
	
	.fl{
		float: left;
	}
	
	.fr{
		float: right;
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
	
	.orange{
		color: #ff7625;
	}
</style>