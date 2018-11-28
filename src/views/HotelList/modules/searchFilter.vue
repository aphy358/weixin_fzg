<template>
  <div class="search-filter-wrap">
    <div id="hlist-filter">
			<div class="filter-btn" @click="gotoCitySelect">
				<span>深圳</span>
				<i class="iconfont icon-down-thin"></i>
			</div>
			<div class="filter-btn" @click="setStarPopupVisible">
				<span>星级价格</span>
				<i class="iconfont icon-down-thin"></i>
			</div>
			<div class="filter-btn">
				<span>位置区域</span>
				<i class="iconfont icon-down-thin"></i>
			</div>
		</div>
  </div>
</template>

<script>

export default {
  name: 'searchFilter',
  data(){
    return {
    }
  },
  props: {
  },
  components: {
  },
  created(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    // 设置星级价格弹出层状态
    setStarPopupVisible(){
      this.$store.commit(`hotelList/setCommonState`, {k: 'starPopupVisible', v: true})
    },
    // 跳转到城市选择页面
    gotoCitySelect(){
      window.historyObj.arr.push('citySelect')
      this.$router.push('/citySelect')
    },
  }
}
</script>

<style scoped lang="scss">
.search-filter-wrap{
  position: fixed;
  margin-top: 0.56rem;
  width: 100%;

  #hlist-filter {
    position: relative;
    background-color: white;
    width: 100%;
    height: 0.37rem;
    box-sizing: border-box;
    font-size: 0;
    display: flex;

    &:after{
      position: absolute;
      content: '';
      transform: scaleY(.5);
      border-bottom: 0.01rem solid rgba(200, 199, 204, 0.65);
      transform-origin: 50% 100%;
      width: 100%;
      left: 0;
      bottom: 0;
    }

    .filter-btn {
      position: relative;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.37rem;
      height: 0.37rem;
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
        top: 0.05rem;
        right: 0;
      }

      &:last-child::after{
        content: none;
      }

      span{
        display: inline-block;
        max-width: 1rem;
      }
    }

    .iconfont {
      display: inline-block;
      font-size: 0.1rem;
      color: #333;
    }

  }

}
</style>