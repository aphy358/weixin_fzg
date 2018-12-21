<!-- 组件说明 -->
<template>
	<div class="my-center">
		<div class="head-portrait">
			<img :src="noHeadPortrait" alt="">
		</div>
	</div>
</template>

<script>
  import noHeadPortrait from '@/assets/img/no-head-portrait.jpg'
  
  export default {
    name: '',
    
    data() {
      return {
        noHeadPortrait: ''
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    created(){
      this.noHeadPortrait = noHeadPortrait;
    },
    
    methods: {}
  }
</script>

<style scoped lang="scss">
</style>