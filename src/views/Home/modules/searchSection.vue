<template>
  <!--条件搜索框-->
  <div class="home-search-filter-wrap">
    <!--城市-->
    <div class="h-s-f-row">
      <div class="h-s-f-icon">
        <i class="iconfont icon-baofang"></i>
      </div>
      <div class="h-s-f-row-content" style="width: calc(100% - 1.1rem);" @click="gotoCitySelect">{{ getCityText }}</div>
      <div class="icon-right-wrap" style="right: 0.5rem;">
        <i class="iconfont icon-right-thin"></i>
      </div>
      <div id="nearby">
        <i class="iconfont icon-location"></i>
        <span style="position: relative;top: -0.02rem;">附近</span>
      </div>
    </div>
    <!--入住、离店日期-->
    <div class="h-s-f-row" style="height: 0.65rem;line-height: 0.65rem;">
      <div class="h-s-f-icon">
        <i class="iconfont icon-rili"></i>
      </div>
      <div class="h-s-f-row-content" style="width: calc(100% - 0.6rem);" @click="gotoCheckinCheckout">
        <div style="display: flex;">
          <div class="s-f-date-wrap">
            <span id="checkin_index">{{ formatMonthDate(getCheckin) }}</span>
            <span class="date-top-text">入住</span>
            <div class="gap-line-i"></div>
          </div>
          <div class="s-f-date-wrap">
            <span id="checkout_index">{{ formatMonthDate(getCheckout) }}</span>
            <span class="date-top-text">离店</span>
          </div>
          <div class="s-f-date-wrap" style="flex: inherit;font-size: 0.1rem;color: #999;padding-top: 0;line-height: 0.65rem;">
            <span id="dategap_index">{{ nights }}晚</span>
          </div>
        </div>
      </div>
      <div class="icon-right-wrap">
        <i class="iconfont icon-right-thin"></i>
      </div>
    </div>
    <!--酒店名称/位置-->
    <div class="h-s-f-row">
      <div class="h-s-f-icon">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="h-s-f-row-content" :class="{'pholder': getKeyword == ''}">
        <input type="text" placeholder="酒店名称/位置不限" v-model.trim="getKeyword" style="border: none;line-height: 0.2rem;font-size: 0.14rem;padding: 0;margin: 0;display: inline-block;height: 0.48rem;width: 100%;border-radius: 0;" />
        <div class="icon-right-wrap">
          <i class="iconfont icon-right-thin"></i>
        </div>
      </div>
      <div class="icon-delete-wrap" :class="{'pholder': getKeyword == ''}" @click="resetKeyword">
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>
    <!--价格星级-->
    <div class="h-s-f-row">
      <div class="h-s-f-icon">
        <i class="iconfont icon-star-empty" style="font-weight: bold;"></i>
      </div>
      <div class="h-s-f-row-content" :class="{'pholder': starPriceText == ''}" @click="setStarPopupVisible">
        <span>{{ starPriceText || '价格星级不限' }}</span>
        <div class="icon-right-wrap">
          <i class="iconfont icon-right-thin"></i>
        </div>
      </div>
      <div class="icon-delete-wrap" :class="{'pholder': starPriceText == ''}" @click="clearStarPrice">
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>

    <div id="search-index" @click="gotoHotelList">
      <i class="iconfont icon-search0" style="font-size: 0.14rem;"></i>
      <span>搜索</span>
    </div>

    <!-- 星级价格 popup -->
    <StarPricePopup @setStarPrice="setStarPriceText" page="home" />

  </div>
</template>

<script>
// 搜索区域组件
import StarPricePopup from '@/components/StarPricePopup.vue'
import { addDays, formatDateTwo, gotoPage } from '@/assets/util'

export default {
  name: 'searchSection',
  data(){
    return {
      starPriceText: '',
      nights: '1',
    }
  },
  components: {
    StarPricePopup,
  },
  watch: {
  },
  created(){  
  },
  computed: {
    // 获取关键字
    getKeyword: {
      get: function () {
        return this.$store.state.keyword
      },
      set: function (newValue) {
        this.$store.commit(`setCommonState`, {k: 'keyword', v: newValue})
      }
    },
    getCityType(){
      return this.$store.state.cityType
    },
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
    getCityText(){
      return this.$store.state.cityText
    }
  },
  mounted(){
  },
  activated(){    
    this.initStarPriceText()
    this.resetNights()
  },
  methods:{
    // 重新设置晚数
    resetNights(){
      let day1 = new Date( formatDateTwo(addDays(this.getCheckin)) )
      let day2 = new Date( formatDateTwo(addDays(this.getCheckout)) )

      // 计算出晚数
      this.nights = ( (+day2) - (+day1) ) / (24*60*60*1000)
    },
    // 初始化星级价格的显示
    initStarPriceText(){
      let checkedStar 
        = this.$store.state.checkedStar
          .replace(/10,15,20,25/, '经济型')
          .replace(/30,35/, '舒适型')
          .replace(/40,45/, '高档型')
          .replace(/50,55/, '豪华型')

      let priceRange = this.$store.state.priceRange
      if(priceRange != ''){
        if(/^0-/.test(priceRange)){
          priceRange = '<' + priceRange.replace(/^0-/, '')
        }else if(/-999999$/.test(priceRange)){
          priceRange = '>' + priceRange.replace(/-999999$/, '')
        }
      }

      let showText = 
        [checkedStar, priceRange]
          .join('，')
          .replace(/^，|，$/, '')

      this.starPriceText = showText
    },
    // 清空星级价格，同时要把 store 里的相关数据重置
    clearStarPrice(){
      this.starPriceText = ''
      this.$store.commit(`setCommonState`, {k: 'priceRange', v: ''})
      this.$store.commit(`setCommonState`, {k: 'checkedStar', v: ''})
    },
    setStarPriceText(showText){
      this.starPriceText = showText
    },
    // 清空关键字
    resetKeyword(){
      this.$store.commit(`setCommonState`, {k: 'keyword', v: ''})
    },
    // 设置星级价格弹出层状态
    setStarPopupVisible(){
      this.$store.commit(`home/setCommonState`, {k: 'starPopupVisible', v: true})
    },
    formatMonthDate(date){
      date = addDays(date, 0)
      var tmpArr = date.split(/[-/]/)
      return tmpArr[1] + '月' + tmpArr[2] + '日'
    },
    // 跳转到酒店列表页
    gotoHotelList(){
      gotoPage(this.$router, 'hotelList')
      sessionStorage.setItem('queryHotelList', 'query')
    },
    // 跳转到城市选择页面
    gotoCitySelect(){
      gotoPage(this.$router, 'citySelect')
    },
    // 跳转到入离日期选择页面
    gotoCheckinCheckout(){
      gotoPage(this.$router, 'checkinCheckout')
    }
  }
}
</script>

<style lang="scss">
.home-search-filter-wrap{
  margin: 0 0.2rem;

  @at-root .h-s-f-row {
    height: 0.5rem;
    line-height: 0.5rem;
    position: relative;
    overflow: hidden;

    &:after{
      position: absolute;
      content: '';
      transform-origin: 0 0;
      width: 100%;
      border-bottom: 0.01rem solid #EFEEEC;
      transform: scaleY(0.5);
      left: 0;
      bottom: 0;
    }

    @at-root .h-s-f-icon {
      margin-right: 0.05rem;
      width: 0.2rem;
      height: 0.5rem;
      text-align: center;
      float: left;

      .iconfont {
        color: #c1c1c1;
      }
    }

    @at-root .h-s-f-row-content {
      display: inline-block;
      padding: 0 0.05rem;
      font-size: 0.16rem;
      width: calc(100% - 0.6rem);
      color: #333333;
      position: relative;

      &.pholder{
        font-size: 0.14rem;
        color: #D8D8DC;
        width: calc(100% - 0.35rem);
      }

      @at-root .s-f-date-wrap{
        display: inline-block;
        position: relative;
        padding-top: 0.15rem;
        height: 0.5rem;
        line-height: 0.5rem;
        flex: 1;

        @at-root .date-top-text{
          color: #999;
          font-size: 0.1rem;
          position: absolute;
          top: 0.15rem;
          left: 0;
          line-height: 0.15rem;
        }

        @at-root .gap-line-i{
          position: absolute;
          width: 0.15rem;
          height: 0.01rem;
          right: 0.2rem;
          top: 0.32rem;

          &:after{
            content: '';
            display: block;
            position: absolute;
            transform-origin: 0 0;
            border-bottom: 0.01rem solid #EFEEEC;
            width: 100%;
            transform: scaleY(0.5);
            left: 0;
            bottom: 0;
          }
        }
      }
    }

    @at-root .icon-delete-wrap{
      position: absolute;
      right: 0;
      top: 0;
      width: 0.3rem;
      text-align: center;

      &.pholder{
        display: none;
      }

      .iconfont{
        color: #D8D8DC;
        font-size: 0.12rem;
      }
    }

    @at-root .icon-right-wrap {
      position: absolute;
      right: 0;
      top: 0;
      height: 0.5rem;

      .iconfont{
        color: #ccc;
        font-size: 0.12rem;
      }
    }

    #nearby {
      font-size: 0.1rem;
      color: #ff7625;
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 0.02rem;
      height: 0.5rem;
    }
  }

  #search-index {
    height: 0.4rem;
    line-height: 0.4rem;
    color: white;
    background: #ff7625;
    text-align: center;
    font-size: 0.16rem;
    margin: 0.1rem 0.2rem;
    border-radius: 0.05rem;
  }
}
</style>