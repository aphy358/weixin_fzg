<!-- 组件说明 -->
<template>
	<div class="write-info-box">
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title">房间数</span>
				<span class="per-info-txt" @click="openPicker">1</span>
				<mt-popup
						v-model="popupVisible"
						position="bottom">
					<button class="cancel">取消</button>
					<button class="confirm">确定</button>
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {
        roomNum: false,
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5, 6],
            className: 'slot1',
          }
        ]
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      openPicker() {
        this.popupVisible = true;
      },
      onValuesChange(){
      
      }
    }
  }
</script>

<style scoped lang="scss">
	.per-module{
		background-color: #fff;
		margin-bottom: 0.01rem;
	}
	
	.per-line{
		height: 0.76rem;
		line-height: 0.76rem;
	}
	
	.per-info-title{
		display: inline-block;
		width: 0.8rem;
	}
	
	.per-line button{
		border: none;
		background: none;
	}
	
	.cancel{
		font-size: 0.14rem;
		color: #cccccc;
		position: absolute;
		left: 0.2rem;
		top: 0.1rem;
	}
	
	.confirm{
		text-align: right;
		font-size: 0.14rem;
		color: #5eccec;
		position: absolute;
		right: 0.2rem;
		top: 0.1rem;
	}
</style>