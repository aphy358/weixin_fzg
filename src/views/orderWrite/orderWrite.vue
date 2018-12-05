<!-- 组件说明 -->
<template>
	<div class="order-write-box">
		
		<!-- 头部 -->
		<mt-header title="订单填写">
		</mt-header>
		<GoBack />
		
		<GAP/>
		<hotelInfo/>
		<GAP/>
		
		<writeInfo/>
	</div>

</template>

<script>
  import hotelInfo from './modules/hotelInfo.vue';
  import GAP from '@/components/GAP.vue';
  import writeInfo from './modules/writeInfo.vue';
  import GoBack from '@/components/GoBack.vue';
	
	
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {
      GAP,
      hotelInfo,
      writeInfo,
      GoBack
    },
    
    computed: {},
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.order-write-box{
		background-color: #efeff4;
	}
	
	.order-write-box .nav-back{
		top: 0rem;
	}
</style>