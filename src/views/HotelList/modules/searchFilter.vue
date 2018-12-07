<template>
  <div class="search-filter-wrap">
    <div id="hlist-filter">
			<div class="filter-btn" @click="gotoCitySelect">
				<span>{{ getCityText }}</span>
				<i class="iconfont icon-down-thin"></i>
			</div>
			<div class="filter-btn" @click="setStarPopupVisible">
				<span>星级价格</span>
				<i class="iconfont icon-down-thin"></i>
			</div>
			<div class="filter-btn" @click="setAreaBizPopupVisible">
				<span>位置区域</span>
				<i class="iconfont icon-down-thin"></i>
			</div>
		</div>

    <!-- 分割符 -->
    <GAP />
  </div>
</template>

<script>
import GAP from '@/components/GAP.vue'
import { gotoPage } from '@/assets/util'

export default {
  name: 'searchFilter',
  data(){
    return {
    }
  },
  props: {
  },
  components: {
    GAP,
  },
  created(){
  },
  computed: {
    getCityText(){
      return this.$store.state.cityText
    }
  },
  mounted(){
  },
  methods:{
    // 设置星级价格弹出层显示状态
    setStarPopupVisible(){
      this.$store.commit(`hotelList/setCommonState`, {k: 'starPopupVisible', v: true})
    },
    // 设置行政区、商圈弹出层显示状态
    setAreaBizPopupVisible(){
      this.$store.commit(`hotelList/setCommonState`, {k: 'areaBizPopupVisible', v: true})
    },
    // 跳转到城市选择页面
    gotoCitySelect(){
      gotoPage(this.$router, 'citySelect')
    },
  }
}
</script>

<style scoped lang="scss">
.search-filter-wrap{
  position: fixed;
  margin-top: 0.56rem;
  width: 100%;
  z-index: 1000;

  #hlist-filter {
    position: relative;
    background-color: white;
    width: 100%;
    height: 0.35rem;
    box-sizing: border-box;
    font-size: 0;
    display: flex;

    .filter-btn {
      position: relative;
      font-size: 0.15rem;
      text-align: center;
      line-height: 0.35rem;
      height: 0.35rem;
      color: #444;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:after{
        position: absolute;
        content: '';
        transform: scaleX(.5);
        background-color: rgba(200, 199, 204, 0.65);
        transform-origin: 100% 50%;
        width: 0.01rem;
        height: 0.27rem;
        top: 0.04rem;
        right: 0;
      }

      &:last-child::after{
        content: none;
      }

      span{
        display: inline-block;
        max-width: 1rem;
        color: #666666;
      }
    }

    .iconfont {
      position: relative;
      top: -0.01rem;
      font-size: 0.1rem;
      color: #aaa;
    }

  }

}
</style>