<template>
  <div style="margin: 0.1rem 0;">
    
    <div class="eb-rsm-month-line">
      <div class="eol-pop-row-subdiv">
        <div class="eb-rsm-month-wrap">
          <span class="eb-rsm-month-text1">{{ monthText1 }}</span>
          <span class="eb-rsm-month-text2 color-gray">{{ monthText2 }}</span>
          <i class="iconfont icon-triangle-down" style="position: relative;top: 0.02rem;"></i>
          <input type="date" class="date" v-model="datePick">
        </div>
      </div>
      <button>批量修改</button>
      <span style="position: absolute;right: 0.8rem;top: 0;color: #999;">{{ mtypeText }}</span>
    </div>

    <div class="eb-rsm-day-switch-wrap">
      <div class="eb-rsm-day-switch-inner">
        <ul class="line-one" style="height: 0.16rem;" :style="'width:' + ulWidth + 'rem;'">
          <li v-for="(n, i) in totalWeekStrArr" :key="i">{{ n }}</li>
        </ul>
        <ul class="line-two" :style="'width:' + ulWidth + 'rem;'">
          <li 
            v-for="(n, i) in totalDayStrArr" :key="i" 
            class="eb-rsm-day-li" 
            :class="[n.clazz, {'current': n.dateStr == activeDay}]"
            @click="switchDay(n)">
            
            {{ n.dayStr }}
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import { queryString } from '@/assets/util'

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekArr = ['日', '一', '二', '三', '四', '五', '六']


export default {
  name: 'dateBar',
  data(){
    return {
      // 日期选择框对应的日期值
      datePick: '',

      // 配额类型
      mtypeText: '',

      monthText1: '',
      monthText2: '',

      // 日历星期的数组
      totalWeekStrArr: [],

      // 日历日期值的数组，
      totalDayStrArr: [],

      // 日历条的宽度
      ulWidth: '',

      // 当前被选中的日期
      activeDay: '',
    }
  },
  props: {},
  components: {},
  watch: {
    datePick(){
      this.activeDay = !this.isBeforeToday(this.datePick) ? this.datePick : null
      this.getOneMonthData(this.datePick)
      this.$emit('pickDate', this.activeDay)
    }
  },
  created(){},
  activated(){
    if(!window.goBack){ // 如果是前进到当前页面，则进行相关的初始化操作
      this.getQueryParams()
      this.initCurrentMonth()
    }
  },
  computed: {},
  mounted(){},
  methods:{
    // 判断一个字符串是否小于今天
    isBeforeToday(_dayStr){
      return +new Date( _dayStr.replace(/-/g, '/') + ' 23:59:59' ) < +new Date
    },
    // 获取 url 参数
    getQueryParams(){
      this.mtypeText = queryString('mtype') == '1' ? '房态管理' : '房价管理'
    },
    // 初始化本月的日期 DOM
    initCurrentMonth(){
      let val = (new Date).Format('yyyy-MM-dd')
      this.activeDay = val
      this.getOneMonthData(val)
    },
    // 获取一个月的数据
    getOneMonthData(val){
      if(!val)	return

      var _d = new Date(val.replace(/-/g, '/'))
      var month = _d.getMonth()
      var year = _d.getFullYear()
      var monthStr = year + '-' + (month + 1)

      this.monthText1 = monthStr
      this.monthText2 = `(${monthArr[month]})`

      var firstweek = _d.getDay() 	//计算当月第一天是星期几
      var dayArr = this.getDaysForeachMonth(year);	//今年所有月份日期数的数组
      var dayCount = dayArr[month]
      var width = 50 * dayCount

      this.ulWidth = width / 100

      var totalWeekStr = ''
      var totalDayStr = ''
      var left = ( _d.getDate() - 1 ) * 50

      this.$nextTick(() => {  // 设置偏移
        document.querySelector('.eb-rsm-day-switch-inner').scrollLeft = document.body.clientWidth / 375 * left
      })

      // 先清空这俩数组
      this.totalWeekStrArr = []
      this.totalDayStrArr = []
      for (var i = 0; i < dayCount; i++) {
        var _dayStr = new Date( (monthStr + '-' + (i + 1)).replace(/-/g, '/') ).Format('yyyy-MM-dd')
        var clazz = this.isBeforeToday(_dayStr) ? 'disabled' : ''

        this.totalWeekStrArr.push( weekArr[(firstweek++ % 7)] )
        this.totalDayStrArr.push({dateStr: _dayStr, clazz: clazz, dayStr: (i + 1)})
      }
    },
    // 返回当下年份中二月份的天数
    _leap(year){
      return 28 + ( year % 100 == 0 
        ? (year % 400 == 0 ? 1 : 0)
        : (year % 4 == 0 ? 1 : 0) )
    },
    // 计算当年所有月份的天数，存入一个数组
    getDaysForeachMonth(year){
      return new Array(31, this._leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
    },
    // 点击某一天
    switchDay(n){
      if(n.clazz != 'disabled'){
        this.activeDay = n.dateStr
        this.$emit('pickDate', this.activeDay)
      }
    }
  }
}
</script>

<style lang="scss">

.color-gray,
.disabled{
	color: #999999;
}

.eb-rsm-month-line{
    position: relative;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #EAF5FF;
    padding: 0 0.1rem;
}

.eb-rsm-month-line button{
    position: absolute;
    border: 0.01rem solid #3399FF;
    background: transparent;
    border-radius: 0.05rem;
    height: 0.26rem;
    font-size: 0.12rem;
    color: #3399FF;
    padding: 0 0.05rem;
    right: 0.1rem;
    top: 0.12rem;
}

.eb-rsm-day-switch-wrap{
    background: white;
    padding: 0.1rem;
    overflow: hidden;
}

.eb-rsm-day-switch-wrap .line-one li{
    font-size: 0.12rem;
    color: #999;
}

.eb-rsm-day-switch-wrap .line-two{
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.1rem!important;
}


.eb-rsm-day-switch-inner{
	overflow-x: auto;
	white-space: nowrap;
}

.eb-rsm-day-switch-inner ul{
  position: relative;
  margin: 0;
  overflow: hidden;
}

.eb-rsm-day-switch-inner ul li{
	float: left;
	text-align: center;
    width: 0.3rem;
    margin: 0 0.1rem;
}

.eb-rsm-day-switch-wrap .line-two li.current{
    background: orange;
    color: white;
    border-radius: 50%;
}

.eb-rsm-month-wrap .date{
  position: absolute;
  height: 0.5rem;
  box-sizing: border-box;
  width: 1.2rem;
  left: 0.1rem;
  border: none;
  background: transparent;
  color: transparent;
}

</style>