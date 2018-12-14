<template>
  <div class="search-filter-outer">
    <div class="s-f-inner">
      <div class="s-f-item" style="min-width: 0.96rem;" @click="gotoCheckinCheckout">
        <div class="s-f-label">入住</div>
        <div class="s-f-dw-wrap">
          <span class="s-f-date">{{ formatDate(getCheckin) }}</span>
          <span class="s-f-week">{{ week1 }}</span>
        </div>
      </div>
      <div class="s-f-item" style="display: flex; justify-content: center; align-items: center" @click="gotoCheckinCheckout">
        <div class="s-f-nights">
          {{ nights }}晚
        </div>
      </div>
      <div class="s-f-item" style="min-width: 0.96rem;" @click="gotoCheckinCheckout">
        <div class="s-f-label">离店</div>
        <div class="s-f-dw-wrap">
          <span class="s-f-date">{{ formatDate(getCheckout) }}</span>
          <span class="s-f-week">{{ week2 }}</span>
        </div>
      </div>
      <div class="s-f-adult-wrap" @click="showAdultChildPopup">
        <div class="s-f-adult-label">每间入住</div>
        <div class="s-f-adult-text">{{ getAdultNum }}成人{{ getChildrenNum }}儿童</div>
      </div>
      <i class="iconfont icon-right-thin" style="font-size: 0.12rem;line-height: 0.5rem;color: #999;"></i>
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
    getAdultNum(){
      return this.$store.state.adultNum
    },
    getChildrenNum(){
      return this.$store.state.childrenNum
    },
    getChildrenStr(){
      return this.$store.state.childrenStr
    },
  },
  mounted(){},
  methods:{
    gotoCheckinCheckout(){
      gotoPage(this.$router, 'checkinCheckout')
    },
    // 格式化日期，返回格式为 '01月01日'
    formatDate(date){
      date = addDays(date, 0)
      var tmpArr = date.split(/[-/]/)
      return tmpArr[1] + '月' + tmpArr[2] + '日'
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
    },
    // 显示成人小孩选择 popup
    showAdultChildPopup(){
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'adultChildPopupVisible', v: true})
    }
  }
}
</script>

<style scoped lang="scss">
.hotelDetail-page{
  @at-root .search-filter-outer{
    padding: 0 0.1rem;
    background: white;

    @at-root .s-f-inner{
      display: flex;
      position: relative;
      height: 0.5rem;

      @at-root .s-f-item{
        padding: 0.1rem 0;
        flex: 1;

        @at-root .s-f-label{
          font-size: 0.12rem;
          height: 0.14rem;
          line-height: 0.14rem;
          margin-bottom: 0.02rem;
          padding-left: 0.38rem;
          color: #A9AAB0;
        }

        @at-root .s-f-dw-wrap{
          height: 0.14rem;
          line-height: 0.14rem;

          @at-root .s-f-date{
            color: #576690;
            font-weight: bold;
            margin-right: 0.05rem;
          }
  
          @at-root .s-f-week{
            font-size: 0.12rem;
            color: #576690;
          }
        }

        @at-root .s-f-nights{
          position: relative;
          font-size: 0.1rem;
          color: #A9AAB0;
          width: 0.4rem;
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

        @at-root .s-f-adult-label{
          float: left;
          font-size: 0.1rem;
          color: #A9AAB0;
          width: 0.24rem;
          height: 0.24rem;
          line-height: 0.1rem;
          margin-top: 0.05rem;
        }

        @at-root .s-f-adult-text{
          float: left;
          color: #576690;
          font-size: 0.12rem;
          font-weight: bold;
          width: 0.34rem;
          height: 0.3rem;
          line-height: 0.15rem;
          margin-left: 0.03rem;
        }
      }

      @at-root .s-f-adult-wrap{
        position: relative;
        max-width: 0.68rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;

        &:before{
          position: absolute;
          content: '';
          transform: scaleX(0.5);
          transform-origin: 0 0;
          border-left: 1px solid #e2e2e2;
          height: 0.24rem;
          top: 0.13rem;
          left: -0.1rem;
        }
      }
      
    }
  }
}
</style>