<template>
  <div class="hotelList-page">
    <!-- 关键字搜索 -->
    <KeywordInput />

    <!-- 搜索条件过滤 -->
    <SearchFilter />

    <!-- 星级价格 popup -->
    <StarPrice @setStarPrice="setStarPrice" page="hotelList" />
  </div>
</template>

<script>
import KeywordInput from './modules/keywordInput'
import SearchFilter from './modules/searchFilter'
import StarPrice from '@/components/StarPrice.vue'

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
    StarPrice
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