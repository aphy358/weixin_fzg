<template>
  <div class="page hotelList-page">
    <div v-show="!showKeywordBoard">
      <!-- 关键字搜索 -->
      <KeywordInput @showKeywordBoard="showKeywordBoard = true" />

      <!-- 搜索条件过滤 -->
      <SearchFilter />     

      <!-- 酒店列表组件 -->
      <HotelListInfinite :showKeywordBoard="showKeywordBoard" />

      <!-- 星级价格 popup -->
      <StarPrice page="hotelList" />

      <!-- 行政区、商圈 popup -->
      <AreaBizSelect />

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
import HotelListInfinite from './modules/hotelListInfinite'

import { addDays, formatDateOne, formatDateTwo } from '@/assets/util'

export default {
  name: 'hotelList',
  data(){
    return {
      showKeywordBoard: false,
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
    HotelListInfinite,
  },
  created(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang="scss">
</style>