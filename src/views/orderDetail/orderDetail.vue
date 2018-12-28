<!-- 组件说明 -->
<template>
	<div class="page order-detail">
		<mt-header title="订单详情"></mt-header>
		<GoBack _style="top: 0.02rem" />
		
		<div class="page-content order-detail-list">
			<div class="per-module">
				<p class="per-module-title">订单信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">订单编号</span>
						<span class="item-con blue">AA181210388827</span>
					</li>
					<li>
						<span class="item-txt">下单日期</span>
						<span class="item-con">2018-12-10</span>
					</li>
					<li>
						<span class="item-txt">付款方式</span>
						<span class="item-con">预付</span>
					</li>
					<li>
						<span class="item-txt">结算周期</span>
						<span class="item-con">单结</span>
					</li>
					<li>
						<span class="item-txt">订单金额</span>
						<span class="item-con gold">￥1916.25</span>
					</li>
					<li>
						<span class="item-txt">入住日期</span>
						<span class="item-con">2018-12-10</span>
					</li>
					<li>
						<span class="item-txt">订单状态</span>
						<span class="item-con deep-orange">已取消</span>
					</li>
					<li>
						<span class="item-txt">到店时间</span>
						<span class="item-con">2018-12-10 11:00 - 2018-12-11 12:00</span>
					</li>
					<li>
						<span class="item-txt">取消条款</span>
						<span class="item-con red">此房即订即保，一旦预订，不可修改或取消</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">价格详情</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">房型</span>
						<span class="item-con">高级房（高级房）</span>
					</li>
					<li>
						<span class="item-txt">床型</span>
						<span class="item-con">大床/双床</span>
					</li>
					<li>
						<span class="item-txt">早餐</span>
						<span class="item-con">两份早餐</span>
					</li>
					<li>
						<span class="item-txt">间数</span>
						<span class="item-con">1</span>
					</li>
					<li>
						<span class="item-txt">价格列表</span>
						<span class="item-con gold">2018-12-10：￥1916.25</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">酒店信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">名称</span>
						<span class="item-con blue">深圳东华假日酒店</span>
					</li>
					<li>
						<span class="item-txt">地址</span>
						<span class="item-con">深圳南海大道东华园2307号</span>
					</li>
					<li>
						<span class="item-txt">电话</span>
						<span class="item-con">0755-86193999</span>
					</li>
					<li>
						<span class="item-txt">传真</span>
						<span class="item-con">0755-26649699</span>
					</li>
				</ul>
			</div>
			<div class="per-module">
				<p class="per-module-title">联系信息</p>
				<ul class="per-module-list">
					<li>
						<span class="item-txt">姓名</span>
						<span class="item-con">dh</span>
					</li>
					<li>
						<span class="item-txt">电话</span>
						<span class="item-con">13427649347</span>
					</li>
					<li>
						<span class="item-txt">Email</span>
						<span class="item-con">fgghnoi@fuhg.ds</span>
					</li>
					<li>
						<span class="item-txt">国籍</span>
						<span class="item-con">中国</span>
					</li>
				</ul>
			</div>
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
	.order-detail{
		padding-bottom: 0.2rem;
		
		
		.order-detail-list{
			padding: 0.2rem;
			
			@at-root .per-module{
				margin-bottom: 0.2rem;
				
				.per-module-title{
					height: 0.16rem;
					line-height: 0.16rem;
					font-size: 0.16rem;
					margin-bottom: 0.16rem;
					border-left: 4px solid #818a0b;
					color: #818a0b;
					padding-left: 0.08rem;
				}
				
				@at-root .per-module-list{
					>li{
						line-height: 0.32rem;
						font-size: 0.12rem;
						display: flex;
						color: #323232;
						
						.item-txt{
							display: inline-block;
							width: 1rem;
							color: #979797;
						}
						
						.item-con{
							display: inline-block;
							flex: 1;
						}
					}
				}
			}
		}
	}
	
	.blue{
		color: #154ca4;
	}
	
	.deep-orange{
		color: #ff4400;
	}
	
	.gold{
		color: #ffa105;
	}
	
	.red{
		color: red;
	}
</style>