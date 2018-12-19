<!-- 组件说明 -->
<template>
	<div class="order-pay">
		<mt-header title="订单支付"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content">
			<h6>订单支付</h6>
		</div>
	</div>
</template>

<script>
  
  import GoBack from '@/components/GoBack.vue';
  
  export default {
    name: 'orderPay',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {
      GoBack
    },
    
    computed: {},
    
    methods: {}
  }
</script>

<style scoped lang="scss">
</style>