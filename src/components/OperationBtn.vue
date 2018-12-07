<!-- 组件说明 -->
<template>
	<div class="operation-btn">
		<button class="area-empty" @click="clear">清空</button>
		<button class="area-submit" @click="confirm">确定</button>
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
    
    methods: {
      clear(){
        this.$emit('clear')
      },
      confirm(){
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped lang="scss">
	.operation-btn {
		
		button {
			border: none;
			width: 50%;
			background: #f0f0f0;
			color: #666666;
			height: 0.4rem;
			font-size: 0.16rem;
			
			&.area-submit {
				color: white;
				background: #ff7625;
			}
		}
	}
</style>