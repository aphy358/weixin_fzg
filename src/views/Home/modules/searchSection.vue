<template>
  <!--条件搜索框-->
  <div class="home-search-filter-wrap">
    <!--城市-->
    <div class="h-s-f-row">
      <div class="h-s-f-icon">
        <i class="iconfont icon-baofang"></i>
      </div>
      <div class="h-s-f-row-content" style="width: calc(100% - 1.1rem);">深圳市</div>
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
      <div class="h-s-f-row-content" style="width: calc(100% - 0.6rem);">
        <div style="display: flex;">
          <div class="s-f-date-wrap" @click="openPicker('openPicker1')">
            <span id="checkin_index">{{ formatMonthDate(date1) }}</span>
            <span class="date-top-text">入住</span>
            <div class="gap-line-i"></div>
          </div>
          <div class="s-f-date-wrap" @click="openPicker('openPicker2')">
            <span id="checkout_index">{{ formatMonthDate(date2) }}</span>
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

    <div id="search-index">
      <i class="iconfont icon-search0" style="font-size: 0.14rem;"></i>
      <span>搜索</span>
    </div>

    <!-- 星级价格 popup -->
    <StarPrice @setStarPriceText="setStarPriceText" />

    <DatePicker :open="openPicker1" :dateBind="date1" :startDate="startDate1" :endDate="endDate1" @confirm="setNewDate($event, 1)" />
    <DatePicker :open="openPicker2" :dateBind="date2" :startDate="startDate2" :endDate="endDate2" @confirm="setNewDate($event, 2)" />

  </div>
</template>

<script>
// 搜索区域组件
import StarPrice from './starPrice.vue'
import DatePicker from './datePicker.vue'
import { addDays, formatDateOne } from '@/assets/util'

export default {
  name: 'searchSection',
  data(){
    return {
      starPriceText: '',

      openPicker1: false,
      openPicker2: false,

      date1: '',
      date2: '',

      nights: '1',

      startDate1: '',
      startDate2: '',

      endDate1: new Date('3999/01/01'),
      endDate2: new Date('3999/01/01'),
    }
  },
  components: {
    StarPrice,
    DatePicker
  },
  watch: {
  },
  created(){  
    this.date1 = new Date( formatDateOne(this.getCheckin) )
    this.date2 = new Date( formatDateOne(this.getCheckout) )

    this.startDate1 = new Date( formatDateOne(this.getCheckin) )
    this.startDate2 = new Date( formatDateOne(this.getCheckout) )

    this.endDate1 = new Date( addDays(this.getCheckin, 60, '/') )
    this.endDate2 = new Date( addDays(this.getCheckout, 60, '/') )
  },
  computed: {
    // 获取关键字
    getKeyword: {
      get: function () {
        return this.$store.state.home.keyword
      },
      set: function (newValue) {
        this.$store.commit(`home/setCommonState`, {k: 'keyword', v: newValue})
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
    }
  },
  mounted(){
  },
  methods:{
    // 清空星级价格，同时要把 store 里的相关数据重置
    clearStarPrice(){
      this.starPriceText = ''
      this.$store.commit(`home/setCommonState`, {k: 'priceRange', v: ''})
      this.$store.commit(`home/setCommonState`, {k: 'checkedStar', v: ''})
    },
    setStarPriceText(showText){
      this.starPriceText = showText
    },
    // 清空关键字
    resetKeyword(){
      this.$store.commit(`home/setCommonState`, {k: 'keyword', v: ''})
    },
    // 设置星级价格弹出层状态
    setStarPopupVisible(){
      this.$store.commit(`home/setCommonState`, {k: 'starPopupVisible', v: true})
    },
    openPicker(picker){
      var _this = this
      _this[picker] = true

      setTimeout(function(){
        _this[picker] = false
      }, 10)
    },
    formatMonthDate(date){
      date = addDays(date, 0)
      var tmpArr = date.split(/[-/]/)
      return tmpArr[1] + '月' + tmpArr[2] + '日'
    },
    // 当其中一个日期控件设置了日期后，需要重新计算晚数、保证第一个日期比第二个日期小、以及重新设置第二个日期的 endDate
    setNewDate(e, flag){
      let day1 = new Date( formatDateOne(addDays(this.date1) + ' 00:00:00') )
      let day2 = new Date( formatDateOne(addDays(this.date2) + ' 00:00:00') )

      if(flag == 1){
        this.date1 = e
        day1 = new Date( formatDateOne(addDays(this.date1) + ' 00:00:00') )

        if( (+day1) >= (+day2) ){ // 需要重置第二个日期控件的 startDate 和 endDate
          this.date2 = new Date( addDays(this.date1, 1, '/') )
          day2 = new Date( formatDateOne(addDays(this.date2) + ' 00:00:00') )
          this.endDate2 = new Date( addDays(this.date1, 16, '/') )
        }
      }else{
        this.date2 = e
        day2 = new Date( formatDateOne(addDays(this.date2) + ' 00:00:00') )

        if( (+day1) >= (+day2) ){
          this.date1 = new Date( addDays(this.date2, -1, '/') )
          day1 = new Date( formatDateOne(addDays(this.date1) + ' 00:00:00') )
          this.endDate2 = new Date( addDays(this.date1, 16, '/') )
        }
      }

      // 计算出晚数
      this.nights = ( (+day2) - (+day1) ) / (24*60*60*1000)

      // 把新的 checkin、checkout 设置到 store 里去
      this.$store.commit(`setCommonState`, {k: 'checkin', v: addDays(this.date1)})
      this.$store.commit(`setCommonState`, {k: 'checkout', v: addDays(this.date2)})
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
      border-bottom: 0.01rem solid rgba(200, 199, 204, 0.65);
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
            border-bottom: 0.01rem solid rgba(200, 199, 204, 0.65);
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
        color: rgba(200, 199, 204, 0.8);
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