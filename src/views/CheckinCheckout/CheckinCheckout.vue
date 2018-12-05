<template>
  <div class="page checkinCheckout-page">

    <div class="calendar-head-wrap">

      <!-- 头部 -->
      <mt-header title="入离日期选择"></mt-header>

      <!-- 返回上一页 -->
      <GoBack _style="top: 0.02rem" />

      <div class="calendar-week-title">
        <table>
          <tbody>
            <tr>
              <td>日</td>
              <td>一</td>
              <td>二</td>
              <td>三</td>
              <td>四</td>
              <td>五</td>
              <td>六</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div class="calendar-body-wrap">

      <div v-for="(m, i) in showMonths" :key="i" class="calendar-body">
        <table>
          <thead>
            <tr>
              <th colspan="7"><h5 id="first-month">{{ m.year }}年{{ m.month }}月</h5></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, j) in m.days.length / 7" :key="j">
              <td v-for="(day, k) in m.days.slice(j * 7, (j + 1) * 7)" :key="k" 
                :class="{
                  'disable': ifDisable(day), 
                  'festival': day.festival, 
                  'text-white': checkDayStr(day), 
                  'weekend': k % 7 == 0 || k % 7 == 6
                }"
                @click="clickOneDay(ifDisable(day), m, day)"
                :data-dayStr="day.dayStr">

                <p :class="{'small-text': day.festival || day.today}">{{ day.festival || day.today || day.day }}</p>

                <span v-if="checkDayStr(day)" 
                  :class="{
                    'checkin': checkDayStr(day) == 1, 
                    'checkout': checkDayStr(day) == 2, 
                    'bg-circle': checkDayStr(day), 
                    'today': day.today
                  }"
                ></span>

                <span v-if="checkDayStr(day) == 1" class="checkin-text">入住</span>
                <span v-if="checkDayStr(day) == 2" class="checkout-text">离店</span>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- <div v-if="!checkout" class="please-check-out">请选择离店日期</div> -->

    <END />

  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from '@/components/END.vue'
import { _showMonths } from './showMonths.js'
import { addDays, formatDateOne } from '@/assets/util'

export default {
  name: 'CheckinCheckout',
  data(){
    return {
      showMonths: [
      ],
      checkin: null,
      checkout: null,
    }
  },
  props: {},
  components: {
    GoBack,
    END
  },
  watch: {},
  created(){
    if(_showMonths){
      for (let i = 0; i < _showMonths.length; i++) {
        const m = _showMonths[i]
        const days = m.days;
        
        for (let j = 0; j < days.length; j++) {
          const dayObj = days[j];
          const day = dayObj.day;

          if(day){
            dayObj.dayStr = m.year + '/' + m.month + '/' + day
          }
        }
      }
      this.showMonths = _showMonths
    }

    this.checkin = this.getCheckin
    this.checkout = this.getCheckout
  },
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
    // 点击某一天
    clickOneDay(disable, m, _day){
      if(disable) return false;

      let dayStr = m.year + '-' + m.month + '-' + _day.day

      if(this.checkout){
        // 当入离日期都有的时候，则将当前被点击的日期设置为入住日期，同时清空离店日期
        this.checkin = dayStr
        this.checkout = ''
      }else{
        // 当目前只有入住日期的时候，如果被点击的日期比入住日期小，则将被点击日期设置为入住日期；
        // 如果被点击日期大于入住日期，且日期间隔小于16天，则将被点击日期设置为离店日期，然后跳转到上一个页面；
        // 如果被点击日期大于入住日期，且日期间隔大于等于16天，则弹出提示框告知用户将选择的日期间隔缩小至16天以内；
        let checkin = +new Date( formatDateOne(this.checkin) + ' 00:00:00' )
        let dayClicked = +new Date( formatDateOne(dayStr) + ' 00:00:00' )

        if(dayClicked <= checkin){
          this.checkin = dayStr
        }else{
          if(dayClicked - checkin <= 15 * 24 * 60 * 60 * 1000){
            this.checkout = dayStr

            // 将入离日期设置到 store
            this.$store.commit(`setCommonState`, {k: 'checkin', v: this.checkin})
            this.$store.commit(`setCommonState`, {k: 'checkout', v: this.checkout})
            
            // 延迟返回上一个页面
            let _this = this
            setTimeout(function(){
              window.historyObj.arr.pop()
              _this.$router.go(-1)
            }, 100)
          }else{
            return false
          }
        }
      }
    },
    // 检查这一天是否不可点，有两种情况不可点：1、日期小于今天（境外是小于明天） 2、当离店日期还没选的时，比入住日期大15天以上的日期
    ifDisable(day){
      let dayStr = day.dayStr
      let today =  addDays(new Date)

      if(dayStr){
        let d1 = +new Date( formatDateOne(dayStr) + ' 00:00:00' )
        let d2 = +new Date( formatDateOne(today) + ' 00:00:00' )

        if(d1 < d2) return true

        if(!this.checkout){
          let d3 = +new Date( formatDateOne(this.checkin) + ' 00:00:00' )
          if(d1 - d3 > 15 * 24 * 60 * 60 * 1000){
            return true
          }

          return false
        }

        return false
      }

      return true
    },
    // 检查 dayStr，如果其日期值等于 getCheckin 则返回1，如等于 getCheckout 则返回2，否则返回0
    checkDayStr(day){
      let dayStr = day.dayStr

      if(dayStr){
        let d1 = +new Date( formatDateOne(dayStr) + ' 00:00:00' )
        let d2 = +new Date( formatDateOne(this.checkin || '') + ' 00:00:00' )
        let d3 = +new Date( formatDateOne(this.checkout || '') + ' 00:00:00' )

        if(d1 == d2)  return 1
        if(d1 == d3)  return 2
        if(day.today) return 3
        return 0
      }

      return 0;
    }
  }
}
</script>

<style lang="scss">
.calendar-head-wrap{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @at-root .calendar-week-title{
    line-height: 0.25rem;
    font-size: 0.12rem;
    background-color: #ff7625;
  
    table{
      width: 100%;
      text-align: center;
  
      td{
        color: white;
        padding: 0;
        border: none;
      }
    }
  }
}

.calendar-body-wrap{
  margin-top: 0.65rem;

  .calendar-body{

    table{
      width: 100%;

      thead{
        tr{
          th{
            padding: 0;
            border: none;

            h5{
              margin: 0;
              font-size: 0.16rem;
              line-height: 0.56rem;
              text-align: center;
              font-weight: bold;
            }
          }
        }
      }

      tbody{
        tr{
          height: 0.56rem;

          td{
            position: relative;
            width: 14.2857%;
            text-align: center;
            border: none;
            padding-top: 0.05rem;
            vertical-align: top;

            &.weekend,
            &.festival{
              color: #ff7625;
            }

            &.text-white{
              color: white;
            }

            &.disable{
              color: #999;
            }

            p{
              position: relative;
              font-size: 0.14rem;
              height: 0.28rem;
              line-height: 0.28rem;
              z-index: 9;

              &.small-text{
                font-size: 0.12rem;
              }
            }

            .bg-circle{
              position: absolute;
              top: 0.05rem;
              left: 50%;
              margin-left: -0.14rem;
              width: 0.28rem;
              height: 0.28rem;              
              border-radius: 50%;

              &.today{
                background: #ccc;
              }

              &.checkin{
                background: rgb(67, 178, 224);
              }

              &.checkout{
                background: #fb6c85;
              }
            }

            .checkin-text{
              position: absolute;
              bottom: 0.03rem;
              left: 50%;
              margin-left: -0.15rem;
              width: 0.3rem;
              text-align: center;
              font-size: 0.12rem;
              color: rgb(67, 178, 224);
            }

            .checkout-text{
              position: absolute;
              bottom: 0.03rem;
              left: 50%;
              margin-left: -0.15rem;
              width: 0.3rem;
              text-align: center;
              font-size: 0.12rem;
              color: #fb6c85;
            }
          }
        }
      }
    }
  }
}

// .please-check-out{
//   position: fixed;
//   bottom: 0.2rem;
//   font-size: 0.14rem;
//   text-align: center;
//   background: rgba(4, 4, 4, 0.5);
//   color: white;
//   padding: 0.1rem 0;
//   width: 1.2rem;
//   left: 50%;
//   margin-left: -0.6rem;
//   border-radius: 0.03rem;
// }
</style>