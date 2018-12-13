<template>
  <div class="page checkinCheckout-page">

    <div class="calendar-head-wrap nav-top">

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

    
    <div class="page-content">

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
                    'festival': day.festText, 
                    'text-white': checkDayStr(day), 
                    'weekend': k % 7 == 0 || k % 7 == 6
                  }"
                  @click="clickOneDay(ifDisable(day), m, day)">

                  <p :class="{'small-text': day.festText || day.today, 'circle': checkDayStr(day)}">{{ day.festText || day.today || day.day }}</p>

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

      <END />
      
    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from '@/components/END.vue'
import { getMonthsData } from './getMonthsData.js'
import { addDays, formatDateTwo } from '@/assets/util'

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
    this.initData()
    this.showMonths = getMonthsData()
  },
  computed: {
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
    getCityType(){
      return this.$store.state.cityType
    }
  },
  mounted(){},
  activated(){
    this.initData()
  },
  methods:{
    // 初始化数据
    initData(){
      this.checkin = this.getCheckin
      this.checkout = this.getCheckout
    },
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
        // 如果被点击日期大于入住日期，则将被点击日期设置为离店日期，然后跳转到上一个页面；
        let checkin = +new Date( formatDateTwo(this.checkin) )
        let dayClicked = +new Date( formatDateTwo(dayStr) )

        if(dayClicked <= checkin){
          this.checkin = dayStr
        }else{
          this.checkout = dayStr

          // 将入离日期设置到 store
          this.$store.commit(`setCommonState`, {k: 'checkin', v: this.checkin})
          this.$store.commit(`setCommonState`, {k: 'checkout', v: this.checkout})
          
          // 延迟返回上一个页面
          let _this = this
          setTimeout(function(){
            window.historyObj.arr.pop()
            _this.$router.go(-1)
          }, 200)
        }
      }
    },
    // 检查这一天是否不可点，有两三种情况不可点：1、日期小于今天（境外是小于明天） 2、当离店日期还没选的时，比入住日期大15天以上的日期  3、日期比今天大180天以上
    ifDisable(day){
      let dayStr = day.dayStr
      let minDate =  
        this.getCityType == 1
          ? addDays(new Date, 1)
          : addDays(new Date)

      if(dayStr){
        let d1 = +new Date( formatDateTwo(dayStr) )
        let d2 = +new Date( formatDateTwo(minDate) )

        if(d1 < d2 || d1 - d2 > 180 * 24 * 60 * 60 * 1000) return true

        if(!this.checkout){
          let d3 = +new Date( formatDateTwo(this.checkin) )
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
        let d1 = +new Date( formatDateTwo(dayStr) )
        let d2 = +new Date( formatDateTwo(this.checkin || '') )
        let d3 = +new Date( formatDateTwo(this.checkout || '') )

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
.nav-top{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.calendar-head-wrap{

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
              overflow: hidden;
              z-index: 9;

              &.small-text{
                font-size: 0.12rem;
              }

              &.circle{
                width: 0.28rem;
                margin: auto;
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
              line-height: 0.18rem;
              height: 0.18rem;
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
              line-height: 0.18rem;
              height: 0.18rem;
            }
          }
        }
      }
    }
  }
}

</style>