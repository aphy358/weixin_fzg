<template>
  <div class="page">
    <div class="page hotelList-page" v-show="!showKeywordBoard">

      <!-- 关键字搜索 -->
      <KeywordInput @showKeywordBoard="showKeywordBoard = true" />

      <!-- 搜索条件过滤 -->
      <SearchFilter />

      <div class="page-content" style="background: #efeff4;">

        <!-- 酒店列表组件 -->
        <HotelListInfinite :showKeywordBoard="showKeywordBoard" />

        <!-- 星级价格 popup -->
        <StarPricePopup page="hotelList" />

        <!-- 行政区、商圈 popup -->
        <AreaBizPopup />

      </div>

      <ToTop  />

    </div>

    <KeywordBoard v-show="showKeywordBoard" @hideKeywordBoard="showKeywordBoard = false" :showBoard="showKeywordBoard" />

  </div>
</template>

<script>
import KeywordBoard from './modules/keywordBoard'

import KeywordInput from './modules/keywordInput'
import SearchFilter from './modules/searchFilter'
import StarPricePopup from '@/components/StarPricePopup.vue'
import AreaBizPopup from './modules/areaBizPopup'
import HotelListInfinite from './modules/hotelListInfinite'
import ToTop from '@/components/ToTop.vue'

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
  deactivated(){
    this.showKeywordBoard = false
  },
  components: {
    KeywordBoard,
    KeywordInput,
    SearchFilter,    
    StarPricePopup,
    AreaBizPopup,
    HotelListInfinite,
    ToTop
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