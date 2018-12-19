<!-- 组件说明 -->
<template>
	<div class="fee-details">
		<h6 class="fee-details-title">费用明细</h6>
		<i class="iconfont icon-delete2 hide-fee-details" @click="hideFeeDetails"></i>
		
		<div class="fee-details-list">
			<div class="per-part-total">
				<span class="fl">房费</span>
				<span class="fr deep-orange">￥700</span>
			</div>
			
			<div class="per-part-total" v-show="surchargeBref.length > 0">
				<span class="fl">加早</span>
				<span class="fr deep-orange">￥{{totalBreakfastPrice}}</span>
			</div>
			
			<div class="per-part-detail" v-for="(item, index) in surchargeBref" :key="index">
				<span class="fl">{{item.date}}</span>
				<span class="fl">{{item.name}}</span>
				<span class="fl">{{item.num}}份</span>
				<span class="fr light-gray">￥{{item.price}}</span>
			</div>
			
			<div class="per-part-total" v-show="surchargeBed.length > 0">
				<span class="fl">加床</span>
				<span class="fr deep-orange">￥{{totalBedPrice}}</span>
			</div>
			
			<div class="per-part-detail" v-for="(item, index) in surchargeBed" :key="index">
				<span class="fl">{{item.date}}</span>
				<span class="fl">{{item.name}}</span>
				<span class="fl">{{item.num}}份</span>
				<span class="fr light-gray">￥{{item.price}}</span>
			</div>
			
			<div class="per-part-total" v-show="surchargeInternet.length > 0">
				<span class="fl">加宽带</span>
				<span class="fr deep-orange">￥{{totalNetworkPrice}}</span>
			</div>
			
			<div class="per-part-detail" v-for="(item, index) in surchargeInternet" :key="index">
				<span class="fl">{{item.date}}</span>
				<span class="fl">{{item.name}}</span>
				<span class="fl">{{item.num}}份</span>
				<span class="fr light-gray">￥{{item.price}}</span>
			</div>
			
			<div class="per-part-total">
				<span class="fl">税和服务费</span>
				<span class="fr deep-orange">￥100</span>
			</div>
			
			<div class="per-part-detail">
				<span>（已包含的销售税：￥34）</span>
			</div>
			
			<p class="red">*上述报价不包含服务费，到酒店后另外支付给酒店（因汇率问题可能存在波动）</p>
		</div>
	</div>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {
        totalBreakfastPrice: 0,
        totalBedPrice: 0,
        totalNetworkPrice: 0,
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      surchargeBref(){
        let list = this.$store.state.orderWrite.surchargeBref;
        this.countPrice(list, 'totalBreakfastPrice');
        return list;
      },
      surchargeBed(){
        let list = this.$store.state.orderWrite.surchargeBed;
        this.countPrice(list, 'totalBedPrice');
        return list;
      },
      surchargeInternet(){
        let list = this.$store.state.orderWrite.surchargeInternet;
        this.countPrice(list, 'totalNetworkPrice');
        return list;
      }
    },
    
    methods: {
      hideFeeDetails(){
        this.$emit('hideFeeDetails');
      },
      countPrice(list, aim){
        let totalPrice = 0;
        if (list.length > 0){
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            totalPrice += +item.price;
          }
        }
        this[aim] = totalPrice;
      }
    }
  }
</script>

<style scoped lang="scss">
	.fee-details{
		background-color: #fff;
		position: relative;
		padding-bottom: 0.6rem;
		font-size: 0.12rem;
		
		@at-root .fee-details-title{
			color: #233039;
			font-size: 0.16rem;
			height: 0.5rem;
			line-height: 0.5rem;
			text-align: center;
			border-bottom: 0.5px solid #eeeeee;
		}
		
		@at-root .hide-fee-details{
			position: absolute;
			right: 0.1rem;
			top: 0.12rem;
		}
		
		@at-root .fee-details-list{
			max-height: 3.5rem;
			overflow: scroll;
			padding: 0 0.2rem;
			
			@at-root .per-part-total{
				height: 0.3rem;
				line-height: 0.3rem;
				/*border-bottom: 0.5px solid #eeeeee;*/
				margin-top: 0.1rem;
				font-size: 0.14rem;
				
				>span{
					font-weight: bold;
					&.fl{
						color: #233039;
					}
				}
			}
			
			@at-root .per-part-detail{
				height: 0.24rem;
				line-height: 0.24rem;
				
				>span{
					color: #747477;
					margin-right: 0.1rem;
					
					&.light-gray{
						margin-right: 0;
					}
				}
			}
		}
	}
	
	.light-gray{
		color: #747477;
	}
</style>