<!-- 组件说明 -->
<template>
	<div class="page order-detail">
		<mt-header title="订单详情"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content">
		
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  
  export default {
    name: 'orderDetail',
    
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