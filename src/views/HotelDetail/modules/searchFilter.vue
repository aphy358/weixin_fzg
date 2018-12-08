<template>
  <div class="search-filter-outer">
    <div class="s-f-inner" @click="gotoCheckinCheckout">
      <div class="s-f-item">
        <span class="s-f-label">入住</span>
        <span class="s-f-date">{{ formatDate(getCheckin) }}</span>
        <span class="s-f-week">{{ week1 }}</span>
      </div>
      <div class="s-f-item" style="max-width: 0.6rem;display: flex; justify-content: center; align-items: center">
        <div class="s-f-nights">
          共{{ nights }}晚
        </div>
      </div>
      <div class="s-f-item" style="text-align: right;">
        <span class="s-f-label">离店</span>
        <span class="s-f-date">{{ formatDate(getCheckout) }}</span>
        <span class="s-f-week">{{ week2 }}</span>
        <i class="iconfont icon-right-thin" style="font-size: 0.12rem;"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { gotoPage, addDays, formatDateTwo } from "@/assets/util"

export default {
  name: 'searchFilter',
  data(){
    return {
      nights: '1',
      week1: '今天',
      week2: '明天',
      weekArr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    }
  },
  props: {},
  components: {},
  watch: {
    getCheckin(){
      this.resetCheckinCheckout()
    },
    getCheckout(){
      this.resetCheckinCheckout()
    }
  },
  created(){},
  computed: {
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
  },
  mounted(){},
  methods:{
    gotoCheckinCheckout(){
      gotoPage(this.$router, 'checkinCheckout')
    },
    // 格式化日期，返回格式为 '01-01'
    formatDate(date){
      return addDays(date).substring(5)
    },
    resetCheckinCheckout(){
      let checkin = new Date( formatDateTwo(this.getCheckin) )
      let checkout = new Date( formatDateTwo(this.getCheckout) )
      let today = new Date( formatDateTwo(addDays(new Date)) )

      // 计算出晚数
      this.nights = ( (+checkout) - (+checkin) ) / (24*60*60*1000)

      if(+checkin == +today){
        this.week1 = '今天'
      }else if(+checkin - +today == 24*60*60*1000){
        this.week1 = '明天'
      }else{
        this.week1 = this.weekArr[checkin.getDay()]
      }

      if(+checkout - +today == 24*60*60*1000){
        this.week2 = '明天'
      }else{
        this.week2 = this.weekArr[checkout.getDay()]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hotelDetail-page{
  @at-root .search-filter-outer{
    padding: 0 0.1rem;

    @at-root .s-f-inner{
      display: flex;
      position: relative;
      height: 0.44rem;
      line-height: 0.44rem;

      @at-root .s-f-item{
        flex: 1;

        @at-root .s-f-label{
          font-size: 0.12rem;
          color: #A9AAB0;
        }

        @at-root .s-f-date{
          font-size: 0.16rem;
          color: #576690;
          font-weight: bold;
          margin: 0 0.1rem;
        }

        @at-root .s-f-week{
          font-size: 0.12rem;
          color: #576690;
        }

        @at-root .s-f-nights{
          position: relative;
          font-size: 0.1rem;
          color: #A9AAB0;
          width: 0.5rem;
          right: 0.07rem;
          text-align: center;
          height: 0.2rem;
          line-height: 0.2rem;

          &:after{
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 200%;
            height: 200%;
            border: 0.01rem #eee solid;
            border-radius: 0.03rem;
            box-sizing: border-box;
            transform: scale(0.49);
            transform-origin: left top;
          }
        }
      }
      
    }
  }
}
</style>