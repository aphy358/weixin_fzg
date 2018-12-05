<!-- 组件说明 -->
<template>
	<div class="write-info-box">
		<div class="per-module">
			<div class="per-line">
				<span class="per-info-title">房间数</span>
				<span class="per-info-txt" @click="openRoomNum">1</span>
				<mt-popup
						v-model="roomNumVisible"
						position="bottom">
					<div class="operation-btn">
						<button class="area-empty" @click="clearAreaBiz">清空</button>
						<button class="area-submit" @click="confirmAreaBiz">确定</button>
					</div>
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div>
			<div class="per-line">
				<span class="per-info-title">个性化需求</span>
				<span class="per-info-txt" @click="openSpecial"></span>
				<mt-popup
						v-model="specialVisible"
						position="bottom">
					<OperationBtn @clear="clear" @confirm="confirm"/>
					<mt-checklist
							v-model="specialReq"
							:options="specialReqList">
					</mt-checklist>
				</mt-popup>
			</div>
		</div>
	</div>
</template>

<script>
  import OperationBtn from '@/components/OperationBtn.vue';
  export default {
    name: '',
    
    data() {
      return {
        roomNum: false,
        roomNumVisible: false,
        specialVisible: true,
        slots: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5, 6],
            className: 'slot1',
          }
        ],
        specialReq: [],
        specialReqList: ['立即到店', '原房续住', '安静房间', '吸烟楼层', '连通房间', '相同楼层', '尽量有窗', '尽量无烟楼层', '尽量相邻房间', '尽量高层楼房', '残疾设施房间', '尽量大床房', '尽量双床房'],
      }
    },
    
    props: {},
    
    components: {
      OperationBtn
    },
    
    computed: {},
    
    methods: {
      openRoomNum() {
        this.roomNumVisible = true;
      },
      openSpecial(){
        this.specialVisible = true;
      },
      onValuesChange(){
      
      },
      clearAreaBiz(){
      
      },
      confirmAreaBiz(){
      
      },
      clear() {
        alert('clear');
      },
      confirm() {
        alert('confirm');
      }
    }
  }
</script>

<style scoped lang="scss">
	.write-info-box{
		@at-root .per-module{
			background-color: #fff;
			margin-bottom: 0.01rem;
			
			@at-root .per-line{
				height: 0.76rem;
				line-height: 0.76rem;
				display: flex;
				
				.per-info-title{
					display: inline-block;
					width: 0.8rem;
					padding-left: 0.2rem;
					color: #777a7c;
				}
				
				.per-info-txt{
					display: inline-block;
					flex: 1;
					padding-left: 0.2rem;
				}
				
				button{
					border: none;
					background: none;
				}
				
				.cancel{
					font-size: 0.16rem;
					color: #cccccc;
					position: absolute;
					left: 0.2rem;
					top: 0.1rem;
				}
				
				.confirm{
					text-align: right;
					font-size: 0.16rem;
					color: #099FDE;
					position: absolute;
					right: 0.2rem;
					top: 0.1rem;
				}
			}
			
			.operation-btn{
				line-height: 0.4rem;
			}
		}
		
	}
	
	
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
				background: #099FDE;
			}
		}
	}
	
	
	/*
	.special-require{
		margin: 0.4rem 0;
	}
	
	.special-require label{
		width: 50%;
		padding-left: 0.24rem;
		box-sizing: border-box;
		height: 0.34rem;
		line-height: 0.34rem;
		float: left;
	}
	
	.special-require label>input{
		float: none;
		vertical-align: text-bottom;
	}
	
	
	//清除浮动
	.clearfix:after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		zoom: 1
	}
	*/
</style>

<style lang="scss">
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