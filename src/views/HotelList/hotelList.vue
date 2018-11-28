<template>
  <div class="page hotelList-page">
    <!-- 关键字搜索 -->
    <KeywordInput />

    <!-- 搜索条件过滤 -->
    <SearchFilter />

    <!-- 星级价格 popup -->
    <StarPrice @setStarPrice="setStarPrice" page="hotelList" />

    <!-- 行政区、商圈 popup -->
    <AreaBizSelect />

  </div>
</template>

<script>
import KeywordInput from './modules/keywordInput'
import SearchFilter from './modules/searchFilter'
import StarPrice from '@/components/StarPrice.vue'
import AreaBizSelect from './modules/areaBizSelect'

export default {
  name: 'hotelList',
  data(){
    return {
    }
  },
  props: {
  },
  components: {
    KeywordInput,
    SearchFilter,
    StarPrice,
    AreaBizSelect
  },
  created(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    setStarPrice(){

    }
  }
}
</script>

<style lang="scss">
</style>