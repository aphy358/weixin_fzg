<template>
  <div class="page hotelList-page">
    <div v-show="!showKeywordBoard">
      <!-- 关键字搜索 -->
      <KeywordInput @showKeywordBoard="showKeywordBoard = true" />

      <!-- 搜索条件过滤 -->
      <SearchFilter />     

      <!-- 酒店列表组件 -->
      <HotelListInfinite :showKeywordBoard="showKeywordBoard" />

      <!-- 入离日期选择弹出框 -->
      <CheckinCheckout />

      <!-- 星级价格 popup -->
      <StarPrice @setStarPrice="setStarPrice" page="hotelList" />

      <!-- 行政区、商圈 popup -->
      <AreaBizSelect />


      <!-- 入离日期弹框 -->
      <DatePicker :open="getOpenPicker1" :dateBind="date1" :startDate="startDate1" :endDate="endDate1" @confirm="setNewDate($event, 1)" />
      <DatePicker :open="getOpenPicker2" :dateBind="date2" :startDate="startDate2" :endDate="endDate2" @confirm="setNewDate($event, 2)" />
    </div>

    <KeywordBoard v-show="showKeywordBoard" @hideKeywordBoard="showKeywordBoard = false" :showBoard="showKeywordBoard" />

  </div>
</template>

<script>
import KeywordBoard from './modules/keywordBoard'

import KeywordInput from './modules/keywordInput'
import SearchFilter from './modules/searchFilter'
import StarPrice from '@/components/StarPrice.vue'
import AreaBizSelect from './modules/areaBizSelect'
import CheckinCheckout from './modules/checkinCheckout'
import HotelListInfinite from './modules/hotelListInfinite'

import DatePicker from '@/components/DatePicker.vue'
import { addDays, formatDateOne } from '@/assets/util'

export default {
  name: 'hotelList',
  data(){
    return {
      showKeywordBoard: false,

      date1: '',
      date2: '',

      nights: '1',

      startDate1: '',
      startDate2: '',

      endDate1: new Date('3999/01/01'),
      endDate2: new Date('3999/01/01'),
    }
  },
  props: {
  },
  activated(){
    this.showKeywordBoard = false
  },
  components: {
    KeywordBoard,
    KeywordInput,
    SearchFilter,    
    StarPrice,
    AreaBizSelect,
    CheckinCheckout,
    HotelListInfinite,
    DatePicker
  },
  created(){
    this.initCheckinCheckout()
  },
  computed: {
    getOpenPicker1(){
      return this.$store.state.hotelList.openPicker1
    },
    getOpenPicker2(){
      return this.$store.state.hotelList.openPicker2
    },
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
  },
  mounted(){
  },
  methods:{
    // 初始化入离日期的显示
    initCheckinCheckout(){
      this.date1 = new Date( formatDateOne(this.getCheckin) )
      this.date2 = new Date( formatDateOne(this.getCheckout) )

      this.startDate1 = new Date( formatDateOne(this.getCheckin) )
      this.startDate2 = new Date( formatDateOne(this.getCheckout) )

      this.endDate1 = new Date( addDays(new Date, 180, '/') )
      this.endDate2 = new Date( addDays(new Date, 180, '/') )
    },
    setStarPrice(){

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
    },
  }
}
</script>

<style lang="scss">
</style>