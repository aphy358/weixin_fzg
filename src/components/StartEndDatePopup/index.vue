<template>
  <mt-popup
    v-model="popupVisible"
    position="right">
     <div class="calendar-head-wrap nav-top">
       <!-- 头部 -->
      <mt-header title="起止日期选择"></mt-header>
       <!-- 返回上一页 -->
      <GoBack _style="top: 0.02rem" :onClick="clickGoBack" />
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
                 <span v-if="checkDayStr(day) == 1" class="checkin-text">起始</span>
                <span v-if="checkDayStr(day) == 2" class="checkout-text">终止</span>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
     <END />
   </mt-popup>
</template>
 <script>
import GoBack from '@/components/GoBack.vue'
import END from '@/components/END.vue'
import { getMonthsData } from './getMonthsData.js'
import { addDays, formatDateTwo } from '@/assets/util'
 export default {
  name: 'startEndDatePopup',
  data(){
    return {
      showMonths: [
      ],
      // 起始日期
      checkin: null,
      // 终止日期
      checkout: null,
      popupVisible: false,
    }
  },
  props: ['minDate', 'maxDate', 'startDate', 'endDate', 'popVisible'],
  components: {
    GoBack,
    END
  },
  watch: {
    popVisible(){
      this.popupVisible = this.popVisible
    }
  },
  created(){
    this.checkin = this.startDate
    this.checkout = this.endDate
    this.showMonths = getMonthsData()
  },
  computed: {
  },
  mounted(){},
  activated(){
  },
  methods:{
    // 点击某一天
    clickOneDay(disable, m, _day){
      if(disable) return false;
       let dayStr = m.year + '-' + m.month + '-' + _day.day
       if(this.checkout || (!this.checkin && !this.checkout)){
        // 当起止日期都有、或者起止日期都没有的时候，则将当前被点击的日期设置为起始日期，同时清空终止日期
        this.checkin = dayStr
        this.checkout = ''
      }else{
        // 当目前只有起始日期的时候，如果被点击的日期比起始日期小，则将被点击日期设置为起始日期；
        // 如果被点击日期大于起始日期，则将被点击日期设置为终止日期，然后向母页面发送一个日期选好了的信号；
        let checkin = +new Date( formatDateTwo(this.checkin) )
        let dayClicked = +new Date( formatDateTwo(dayStr) )
        
        if(dayClicked <= checkin){
          this.checkin = dayStr
        }else{
          this.checkout = dayStr
          this.$emit('confirm', {startDate: this.checkin, endDate: this.checkout})
        }
      }
    },
    // 如果 props 传入了 'minDate', 'maxDate'，则按照 props 来限定最小日期和最大日期
    ifDisable(day){
      let dayStr = day.dayStr
       if(dayStr){
        let d1 = +new Date( formatDateTwo(dayStr) )
         if(this.minDate || this.maxDate){ // 如果 props 传入了 'minDate', 'maxDate'
          let minDate = +new Date( formatDateTwo(this.minDate) )
          if(d1 < minDate)  return  true
        }
         if(this.maxDate){
          let maxDate = +new Date( formatDateTwo(this.maxDate) )
          if(d1 > maxDate)  return  true
        }
         return false
      }
       return true
    },
    // 检查 dayStr，如果其日期值等于 this.checkin 则返回1，如等于 this.checkout 则返回2，否则返回0
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
    },
    clickGoBack(){
      this.$emit('goback')
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
 </style> 