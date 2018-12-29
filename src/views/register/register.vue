<!-- 组件说明 -->
<template>
	<div class="page register-page">
		<mt-header title="账号注册"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content register-content">
		
		</div>
	</div>
</template>

<script>
  import GoBack from '@/components/GoBack.vue';
  
  export default {
    name: 'register',
    
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